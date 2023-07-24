/**
 * Converts a blob to base64 Data URL
 * @param {*} blob The blob object
 * @returns
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); //Base64
  });
}

/**
 * Extracts the extension from a blob's MIME type.
 * @param {Blob} blob - The blob to get the extension for.
 * @returns {string} The blob's file extension.
 */
export function extensionFromBlob(blob) {
  const type = blob.type;
  const typeSplitted = type.split("/");
  return typeSplitted[typeSplitted.length - 1].trim();
}
