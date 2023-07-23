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

console.log("Background script has been loaded");

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "CTRL_V_PRESSED") {
    const csrfToken = request.csrfToken;
    const url = `https://www.overleaf.com/${request.url.substring(
      1
    )}?folder_id=64bd9968f3fa586811992be8`;

    let formData = new FormData();
    formData.append("targetFolderId", request.images[0].targetFolderId);
    formData.append("name", request.images[0].name);
    formData.append("type", request.images[0].type);

    const blob = dataURItoBlob(request.images[0].qqfile);
    formData.append("qqfile", blob, request.images[0].name);

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken, // include in URL or headers > for simplicity, headers is more readable
      },
      credentials: "include", // include cookies in the request
      body: formData,
    })
      .then((response) => {
        console.log("Am i reached?");
        return response.json();
      })
      .then((data) => {
        console.log("Am i reached 2?");
        console.log("Response: ", data);
        sendResponse({ message: "URL sent to server" });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  // to enable asynchronous use of 'sendResponse', return true
  return true;
});
