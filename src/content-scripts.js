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
import {
  getFolderId,
  getClipboardItems,
  getImagesAsDTO,
} from "./imageProcessor";

function isPasteEvent(e) {
  return (e.ctrlKey || e.metaKey) && e.key === "v";
}

let folder_id;

window.onload = async function () {
  folder_id = await getFolderId();
};

document.addEventListener("keydown", function (e) {
  if (!isPasteEvent(e) || !folder_id) return;

  (async function () {
    const clipboardItems = await getClipboardItems();
    const images = await getImagesAsDTO(clipboardItems, folder_id);

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
