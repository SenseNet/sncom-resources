---
title: September 2019
---

Another 4 weeks went by, here are the changes we made 👇🏻

## Admin-ui@1.1.0
 - We've replaced our own breadcrumb implementation with the built-in [Material Breadcumbs](https://material-ui.com/components/breadcrumbs/) 🍞
 - Custom permissions for the drawer items 🔒
 - Custom actions will be filtered - you can execute only OData actions from the command palette 🎭
 - The first iteration of the Trash feature has been added 🚮
 - Moved the notification messages from the bottom-right corner to bottom-center 📬
 - Polished the default dashboard content 💅

## Packages

### @sensenet/react-hooks@1.0.0
 - The first release of our custom hook collection that allows us to use our hooks across the packages ⚓

### @sensenet/client-utils@1.6.5
 - added a generic ``tuple`` factory method
 - fixed the ``filterAsync()`` return type (from ``T[]`` to ``Promise<T[]>``)

### @sensenet/client-core@2.2.1
 - ``getExplicitAllowedChildTypes()`` will return the result of the ``EffectiveAllowedChildTypes`` custom action

### @sensenet/default-content-types@2.0.1
- Added ``isODataAction`` field for the ``ActionModel``

### @sensenet/document-viewer-react@1.2.1
- Added a custom view for the *postponed* image generation state - you can trigger an image generation task for postponed documents from the Document Viewer

 
You can find the release [here](https://github.com/SenseNet/sn-client/releases/tag/2019-09-18)
