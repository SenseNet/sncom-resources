---
title: September 2019
---

Another 4 weeks went by, here are the changes we made 👇🏻

## Admin-ui@1.1.0
 - Polished the default dashboard content 💅
 - We've replaced our own breadcrumb implementation with the built-in [Material Breadcumbs](https://material-ui.com/components/breadcrumbs/) 🍞
 - Custom permissions for the drawer items 🔒
 - Custom actions will be filtered - you can execute only OData actions from the command palette 🎭
 - The first iteration of the Trash feature has been added 🚮
 - Moved the notification messages from the bottom-right corner to bottom-center 📬

## Packages

### @sensenet/react-hooks@1.0.0 ⚓
 - The first release of our custom hook collection that allows us to use our hooks across the packages

### @sensenet/client-utils@1.6.5
 - fixed the ``filterAsync()`` return type (from ``T[]`` to ``Promise<T[]>``)
 - added ``tuple`` factory method

### @sensenet/client-core@2.2.1
 - ``getExplicitAllowedChildTypes()`` will return the result of the ``EffectiveAllowedChildTypes`` custom action

### @sensenet/default-content-types@
- enum values are coming back as enum arrays from the server

### @sensenet/controls-react@
- content load in reference grid can give back results array or one content
- reference grid is fixed when no allowed child types are present

### @sensenet/document-viewer-react@
- 

 
You can find the release [here](https://github.com/SenseNet/sn-client/releases/tag/2019-09-18)
