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

# OverleafCopyAndPaste

A Google Chrome extension with the sole purpose of adding copy-and-paste functionality to [Overleaf](https://www.overleaf.com/) on your Chrome browser.

## Functionality

One of the most frustrating aspects of creating documents or reports on Overleaf is the lack of a simple clipboard upload feature.
Resulting in that when you need to upload a picture and you use a cutting tool for capturing the image, you can't upload it directly using the CTRL+V shortcut.
Instead, you manually have to save the picture and drag 'n drop the picture onto Overleaf to upload the picture.
This short but very needed functionality will allow you to paste images from your clipboard easily with just a click of a button.

### Here is a gif of me taking a screenshot and using `ctrl+c` and `ctrl+v` to paste it into my assets folder.
<img src="/.github/chrome_QU5sGrdDk3.gif" style="width:700px;" alt="functionality gif"/>

## How to install

Gif will be uploaded soon.

## Folder extensions supported

The folders currently supported in the Chrome Extensions are the following below in the same priority order. That means you just have to have one of the following folders created inside your overleaf project and the extension will find one of these folders by itself.

https://github.com/simonsejse/OverleafCopyAndPaste/blob/7a0dd6230088ac8259fdce454bcafe0cd0991a78/content-scripts.js#L15

If you believe that another name should be added, feel free to create a Pull Request. Simply include the new name in the array and provide a mention of it. I will happily accept the request if the name is deemed to be common and useful.

## Backlog

- [ ] Add functionality to paste all kinds of files, currently only image extensions are accepted.
