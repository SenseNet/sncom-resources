---
title: September 2019
---

Another 4 weeks went by, here are the changes we made 👇🏻

## Admin-ui
 - Fine-tuned the default dashboard content 🛠
 - Breadcrumbs refactor - We've replaced our own breadcrumb implementation with the built-in [Material Breadcumbs](https://material-ui.com/components/breadcrumbs/) 🍞
 - Configurable permissions for the custom drawer items

## Packages

### @sensenet/client-utils@
 - fixed the filterAsync() return type (from T[] to Promise<T[]>)

### @sensenet/client-core@

### @sensenet/default-content-types@
- enum values are coming back as enum arrays from the server

### @sensenet/controls-react@
- content load in reference grid can give back results array or one content
- reference grid is fixed when no allowed child types are present

### @sensenet/document-viewer-react@
- fix opening file from search dropdown
- document viewer can be closed by hitting 'esc' 💆‍
- fix document paging

 
You can find the release [here](https://github.com/SenseNet/sn-client/releases/tag/2019-09-18)
