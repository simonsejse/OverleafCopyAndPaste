// Copyright 2023 simonsejse
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const foldersByPriority = ["assets", "images", "pictures", "figures"];

function getImageFolderId() {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          let divs = document.querySelectorAll("div[context-menu]");

          for (let i = 0; i < foldersByPriority.length; i++) {
            for (let div of divs) {
              let span = div.querySelector("span");
              if (span && span.innerText.includes(foldersByPriority[i])) {
                let folderId = div
                  .getAttribute("data-target")
                  .replace("context-menu-", "");
                observer.disconnect(); // disconnect observer when we've found the element
                resolve(folderId);
                return;
              }
            }
          }
        }
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      reject(new Error("Folder not found"));
    }, 20000);
  });
}

const getFolderId = async () => {
  try {
    const folderId = await getImageFolderId();
    if (folderId !== null) {
      return folderId;
    }
  } catch (err) {
    console.error(
      "Could not find a folder in your Overleaf Project beginning with the following names," +
        foldersByPriority +
        "."
    );
    return null;
  }
};

function isPasteEvent(e) {
  return (e.ctrlKey || e.metaKey) && e.key === "v";
}

/**
 * Returns the extension for a blob
 * E.g., image/png would return png
 */
function extensionFromBlob(blob) {
  const type = blob.type;
  const typeSplitted = type.split("/");
  return typeSplitted[typeSplitted.length - 1].trim();
}

/**
 * Read items from Clipboard
 * @returns ClipboardItems
 */
async function getClipboardItems() {
  const clipboardItems = await navigator.clipboard.read();
  return clipboardItems;
}

/**
 * @deprecated
 * @param {*} clipboardItems items in the clipboard
 * @returns The images formatted in the specfici way overleafs accepts payload
 */
async function getImagesOld(clipboardItems) {
  let images = [];
  for (let item of clipboardItems) {
    for (let type of item.types) {
      if (type.startsWith("image/")) {
        let blob = await item.getType(type);
        const base64Data = await blobToBase64(blob);

        let image = {
          targetFolderId: folder_id,
          name: `rename_me.${extensionFromBlob(blob)}`,
          type: blob.type,
          qqfile: base64Data,
        };

        images.push(image);
      }
    }
  }
  return images;
}

/**
 *
 * @param {*} clipboardItems items in the clipboard
 * @returns The images formatted in the specfici way overleafs accepts payload
 */
async function getImages(clipboardItems) {
  let imagesPromises = clipboardItems.flatMap((item) => {
    return item.types
      .filter((type) => type.startsWith("image/"))
      .map(async (type) => {
        const blob = await item.getType(type);
        const base64Data = await blobToBase64(blob);
        return {
          targetFolderId: folder_id,
          name: `rename_me.${extensionFromBlob(blob)}`,
          type: blob.type,
          qqfile: base64Data,
        };
      });
  });

  let images = await Promise.all(imagesPromises);

  return images;
}

/**
 * Converts a blob to base64 Data URL
 * @param {*} blob The blob object
 * @returns
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); //Base64
  });
}

let folder_id;

window.onload = async function () {
  folder_id = await getFolderId();
};

document.addEventListener("keydown", function (e) {
  if (!isPasteEvent(e)) return;

  (async function () {
    const clipboardItems = await getClipboardItems();
    const images = await getImages(clipboardItems);

    if (images) {
      var url = document.location.pathname + "/upload";
      var csrfToken = document.querySelector(
        'meta[name="ol-csrfToken"]'
      ).content;
      chrome.runtime.sendMessage({
        message: "CTRL_V_PRESSED",
        url: url,
        csrfToken: csrfToken,
        folder_id: folder_id,
        images: images,
      });
    }
  })();
});
