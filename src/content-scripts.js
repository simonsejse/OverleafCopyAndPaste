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

import { getFolderId, getImagesFromClipboardItems } from "./imageProcessor";

const url = document.location.pathname + "/upload";

let folder_id;

window.onload = async function () {
  folder_id = await getFolderId();
};

document.addEventListener("paste", function (e) {
  if (!folder_id) return;

  (async () => {
    let clipboardData = e.clipboardData || window?.clipboardData;
    let items = clipboardData.items;
    let images = await getImagesFromClipboardItems(items, folder_id);

    if (images.length === 0) {
      alert("No files were successfully processed.");
      return;
    }

    var csrfToken = document.querySelector('meta[name="ol-csrfToken"]').content;

    chrome.runtime.sendMessage({
      message: "PASTE_INVOKED",
      url: url,
      csrfToken: csrfToken,
      folder_id: folder_id,
      images: images,
    });
  })();
});
