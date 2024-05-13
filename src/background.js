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

console.log("Overleaf Copy and Paste has been loaded successfully!");

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

function buildFormDataFromImage(image) {
  let formData = new FormData();
  formData.append("targetFolderId", image.targetFolderId);
  formData.append("name", image.name);
  formData.append("type", image.type);
  const blob = dataURItoBlob(image.qqfile);
  formData.append("qqfile", blob, image.name);
  return formData;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "PASTE_INVOKED") {
    const csrfToken = request.csrfToken;
    const url = `https://www.overleaf.com/${request.url.substring(
      1
    )}?folder_id=${request.folder_id}`;

    let images = request.images;

    if (images?.length <= 0) return;

    const promises = images.map((image) => {
      let formData = buildFormDataFromImage(image);
      return fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken, // include in URL or headers > for simplicity, headers is more readable
        },
        credentials: "include", // include cookies in the request
        body: formData,
      });
    });

    Promise.all(promises)
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        console.log("Response: ", data);
        sendResponse({ message: "URL sent to server" });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  return true;
});


