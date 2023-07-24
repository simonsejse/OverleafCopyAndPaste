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
