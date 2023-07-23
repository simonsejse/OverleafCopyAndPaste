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

console.log('Background script has been loaded');


function getCookie(name, callback) {
    chrome.cookies.get({
      url: "https://www.overleaf.com",
      name: name
    }, function(cookie) {
      if (cookie) {
        callback(null, cookie.value);
      } else {
        callback('Cannot find cookie.');
      }
    });
  }
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "CTRL_V_PRESSED") {
        const csrfToken = request.csrfToken;
        const url = `https://www.overleaf.com/${request.url.substring(1)} +"&_csrf=" + ${csrfToken}`;

        getCookie("overleaf_session2", function(err, cookieValue) {
            if (err) {
            console.log(err);
            return;
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `overleaf_session2=${cookieValue}`  
                },
                body: JSON.stringify({url: request.url})
            }).then(response => {
                console.log("Response: ", response);
                sendResponse({message: "URL sent to server"});
            });
        });
    }
});
