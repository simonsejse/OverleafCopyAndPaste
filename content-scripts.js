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

function isPasteEvent(e) {
  return (e.ctrlKey || e.metaKey) && e.key === "v";
}

async function getClipboardItems() {
  const clipboardItems = await navigator.clipboard.read();
  return clipboardItems;
}

async function getImages(clipboardItems) {
  let images = [];
  for (let item of clipboardItems) {
    for (let type of item.types) {
      if (type.startsWith("image/")) {
        let blob = await item.getType(type);
        const base64Data = await blobToBase64(blob);

        let image = {
          targetFolderId: "64bd9968f3fa586811992be8",
          name: "somename.png",
          type: blob.type,
          qqfile: base64Data,
        };

        images.push(image);
      }
    }
  }
  return images;
}

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

document.addEventListener("keydown", function (e) {
  if (!isPasteEvent(e)) return;

  if (
    !(
      document.URL.startsWith("https://www.overleaf.com") ||
      document.URL.startsWith("https://overleaf.com") ||
      document.URL.startsWith("http://www.overleaf.com") ||
      document.URL.startsWith("http://overleaf.com")
    )
  ) {
    return; // Do nothing if not on overleaf.com
  }
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
        images: images,
      });
    }
  })();
});
