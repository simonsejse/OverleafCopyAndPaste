// Copyright 2023 Simonsejse
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

import { blobToBase64, getTypeStrFromFile } from "./utils";

/**
 * Array of folder names, arranged by priority. This array is used in getImageFolderId function
 * to find a div element whose span child's innerText includes one of these folder names.
 *
 * @type {string[]}
 */
const foldersByPriority = [
  "assets",
  "images",
  "pictures",
  "figures",
  "figs",
  "img",
];

/**
 * This async function is used to get the folder ID using the getImageFolderId function.
 * @returns {Promise} A promise that represents the completion of an asynchronous operation to fetch a folder ID.
 * The promise result is the folder ID if found, or null if not found.
 */
export async function getFolderId() {
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
}

/**
 * This function is used to get the ID of the image folder.
 * @returns {Promise} A promise that represents the completion of an asynchronous operation to fetch an image folder ID.
 */
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

/**
 * Processes clipboard items, converting any found images into a specific DTO.
 * @param {DataTransferItemList} items - The list of clipboard items to process.
 * @param {string} folder_id - The ID of the folder where the images will be stored.
 * @returns {Promise<Array>} A promise that resolves to an array of image DTOs.
 */
export async function getImagesFromClipboardItems(items, folder_id) {
  const imagePromises = Array.from(items)
    .filter((item) => item.kind === "file")
    .map((item) => item.getAsFile())
    .map(async (blob) => {
      const data = await blobToBase64(blob);
      const image = createImageDTO(folder_id, blob, data);
      return image;
    });
  return await Promise.all(imagePromises).catch((err) => {
    console.error("Error occured contact @simonsejse on GitHub: ", err);
    return [];
  });
}

/**
 * Creates an image Data Transfer Object (DTO) using provided parameters.
 *
 * @param {string} folder_id - The ID of the folder where the image will be stored.
 * @param {File} file - The file object containing information about the image.
 * @param {string} qqfile - The base64 representation of the image.
 *
 * @returns {Object} The image DTO with properties: targetFolderId, name, type and qqfile.
 */
export function createImageDTO(folder_id, file, qqfile) {
  return {
    targetFolderId: folder_id,
    name: file.name,
    type: getTypeStrFromFile(file),
    qqfile: qqfile,
  };
}
