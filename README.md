<svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition-all duration-300 ease-in-out delay-150">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stop-color="#F78DA7"></stop>
            <stop offset="95%" stop-color="#8ED1FC"></stop>
        </linearGradient>
    </defs>
    <path d="M0,400 C0,400 0,320 0,320 C180,320 260,260 440,260 C620,260 700,320 880,320 C1060,320 1140,260 1320,260 C1500,260 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 200)"></path>
</svg>

![wave (3)](https://github.com/simonsejse/OverleafCopyAndPaste/assets/20711558/0ea79561-a1ea-428c-9d03-5f62eeaa6caf)

# 🌸 OverleafCopyAndPaste

[![JavaScript ES6](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)]()
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/simonsejse/OverleafCopyAndPaste/pulls)
[![GitHub stars](https://img.shields.io/github/stars/simonsejse/OverleafCopyAndPaste)](https://github.com/simonsejse/OverleafCopyAndPaste/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/simonsejse/OverleafCopyAndPaste)](https://github.com/simonsejse/OverleafCopyAndPaste/commits/main)

A Google Chrome extension with the sole purpose of adding copy-and-paste functionality to [Overleaf](https://www.overleaf.com/) on your Chrome browser. It provides a critical feature that enables users to easily upload images from their clipboard with a simple ctrl+c and ctrl+v operation, eliminating the tedious task of saving and manually uploading images. With OverleafCopyAndPaste, you can focus more on your content and less on the process, enhancing productivity and efficiency when using Overleaf.

## ⚙️ Functionality

One of the most frustrating aspects of creating documents or reports on Overleaf is the lack of a simple clipboard upload feature.
Resulting in that when you need to upload a picture and you use a cutting tool for capturing the image, you can't upload it directly using the CTRL+V shortcut.
Instead, you manually have to save the picture and drag 'n drop the picture onto Overleaf to upload the picture.
This short but very needed functionality will allow you to paste images from your clipboard easily with just a click of a button.

**📸 Demonstration** Here is a gif of me taking a screenshot and using `ctrl+c` and `ctrl+v` to paste it into my assets folder

<img src="/images/how_to_use.gif" style="width:700px;" alt="functionality gif"/>

**🌀 Very flexible**
At present, this extension operates by accessing your clipboard data, which offers highly flexible functionality. For example, you're able to select specific areas within images, simply press ctrl+c to copy, then paste into Overleaf with ctrl+v, resulting in only your selected area being transferred. A demonstration GIF will be provided soon.

## 🔧 How to install

The installation only takes around 20-25 seconds, so what are you waiting for? Go to [releases](https://github.com/simonsejse/OverleafCopyAndPaste/releases) and download the newest stable version. If you're looking to further develop head to the **👨‍💻 How can I contribute?** section.

**📸 Installation** Here is a gif provided of me installing the extension from the release files.

<img src="/images/how_to_install.gif" style="width:700px;" alt="functionality gif"/>

## 📁 Folder extensions supported

The folders currently supported in the Chrome Extensions are the following below in the same priority order. That means you just have to have one of the following folders created inside your overleaf project and the extension will find one of these folders by itself.

https://github.com/simonsejse/OverleafCopyAndPaste/blob/437e795c640f83927ad504075c4b67b876e9fb26/src/imageProcessor.js#L17-L30

If you believe that another name should be added, feel free to create a Pull Request. Simply include the new name in the array and provide a mention of it. I will happily accept the request if the name is deemed to be common and useful.

## 🔄 Backlog

Do you have any cool features that could potentially be added to the backlog, do not hesitate to create a pull request and request these changes/features or bugs in the backlog.

### ✨ Features

- [x] Upload images by pasting `CTRL+v`
- [x] Upload multiple images by pasting `CTRL+v`
- [ ] When `CTRL+v` inside the text area it both adds the image from the clip holder to the desired image folder, but also inserts `begin{figure}...\end{figure}` text from LaTeX (https://github.com/simonsejse/OverleafCopyAndPaste/issues/1).
- [ ] Add functionality to paste all kinds of files, currently only image extensions are accepted.
- [ ] Add support for folders (https://github.com/simonsejse/OverleafCopyAndPaste/issues/4)

### 🐞 Bugs

Currently, no known bugs exist...

## 🤲 Contribution

A big thank you to everyone who's helped improve OverleafCopyAndPaste! If you decide to contribute to the project, you will be mentioned in the section below.

### 👨‍💻 How can I contribute?

Contributing to OverleafCopyAndPaste is straightforward and appreciated! Here's how you can do it:

1. **Fork and Clone the Repository**: Click on the 'Fork' button at the top right corner of this page and clone your forked repository to your local machine.

2. **Install Dependencies**: After cloning the project, navigate into the project's root directory and run `npm install`. This command installs all the dependencies required for the project as specified in the package.json file.

3. **Set up the project**: To run the project, you need to generate a 'content-scripts-output.js' file inside the 'dist/' folder in the root folder. This can be done by running `npm run build` from the root directory. It uses Webpack to generate all the content needed in the content-script file.

4. **Create a new branch**: Switch to your local repository and create a new branch for your feature, bug fix, or documentation enhancement.

5. **Make changes**: Apply your changes and improvements to this new branch.

6. **Commit and push**: After making all your changes, commit them to your branch and then 'push' the changes to your forked repository on GitHub.

7. **Create a Pull Request (PR)**: On your GitHub repository, click 'New Pull Request' and select your branch to merge to the main branch of OverleafCopyAndPaste. Submit your PR with a clear title and detailed comments explaining your changes.

### 🤝 Contributors

<a href="https://github.com/simonsejse/OverleafCopyAndPaste/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=simonsejse/OverleafCopyAndPaste" width="13%" height="13%" />
</a>

## 📄 License

Copyright 2023 Simonsejse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
