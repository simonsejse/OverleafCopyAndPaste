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
  return (e.ctrlKey || e.metaKey) && e.key === 'v';
}

document.addEventListener('keydown', function(e) {
  if (!(document.URL.startsWith("https://www.overleaf.com") 
      || document.URL.startsWith("https://overleaf.com") 
      || document.URL.startsWith('http://www.overleaf.com')
      || document.URL.startsWith('http://overleaf.com'))){
        return; // Do nothing if not on overleaf.com
  }
  if (isPasteEvent(e)) {
    var url = document.location.pathname + "/upload?folder_id=assets";
    var csrfToken = document.querySelector('meta[name="ol-csrfToken"]').content;
    chrome.runtime.sendMessage({message: "CTRL_V_PRESSED", url: url, csrfToken: csrfToken});
  }
});
