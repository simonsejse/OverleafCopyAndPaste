import { blobToBase64, extensionFromBlob } from "./utils";

/**
 * Array of folder names, arranged by priority. This array is used in getImageFolderId function
 * to find a div element whose span child's innerText includes one of these folder names.
 *
 * @type {string[]}
 */
const foldersByPriority = ["assets", "images", "pictures", "figures"];

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
 * Reads items from the clipboard.
 * @returns {Promise<ClipboardItem[]>} The clipboard's contents as a Promise.
 */
export async function getClipboardItems() {
  const clipboardItems = await navigator.clipboard.read();
  return clipboardItems;
}

/**
 * Formats images from clipboard items for use with Overleaf.
 * @param {ClipboardItem[]} clipboardItems - Items from the clipboard.
 * @returns {Promise<Object[]>} Promise resolving to an array of image objects formatted for Overleaf.
 */
export async function getImagesAsDTO(clipboardItems, folder_id) {
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
