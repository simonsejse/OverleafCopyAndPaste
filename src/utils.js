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
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); //Base64
  });
}

/**
 * Extracts the file type string from a given file object.
 * @param {File} file The file object from which to extract the type.
 * @returns {string} The file type as a string if it exists, otherwise an empty string.
 */
export function getTypeStrFromFile(file) {
  return file?.type?.split("/")[1]?.trim() ?? "";
}
