---
title: September 2020
---

## Bug hunting season!💦🐜🐛

Hacktoberfest 2020 and the SNaaS beta period are upon us and this year we connect these two things making October fun, challenging and useful for both of us. We always put a lot of effort on avoiding bugs and testing a lot, but it's still good to stop for a while and review each and every feature, to make sure we're ready to start SNaaS beta in October. So we intended September to test and fix as many bugs as we can besides to finish some of the missing core features like setting permissions. Let's see what we did so far.

### admin-ui@1.11.0

- Our biggest feature in this release is the permission editor for the admin-ui. Enikő has written a detailed [post](https://medium.com/sensenet/permission-editor-on-the-admin-ui-ce21d3112648) about it.

- User and Group types' browse view is fixed by hiding the unnecessary role related fields. [#785](https://github.com/sensenet/sn-client/issues/785)

- Possibility of inserting  images and links are added to the rich text editor [#842](https://github.com/SenseNet/sn-client/pull/842)

- Setup page has been cleaned up by hiding system settings [#802](https://github.com/SenseNet/sn-client/issues/802)

- Grid column header are fixed to display the fields' DisplayNames instead of their Names [#846](https://github.com/SenseNet/sn-client/pull/846)

- Batch actions (copy, delete, move) are fixed [#814](https://github.com/SenseNet/sn-client/issues/814)

- DefaultValue and default selection is now handled properly in Choice field related controls [#815](https://github.com/SenseNet/sn-client/issues/815)

- Reference fields got a basic display as grid columns, so now they can be used in custom menu's grid as well [#808](https://github.com/SenseNet/sn-client/issues/808)

- Multiple upload requests are now prevented on CTDs [#885](https://github.com/SenseNet/sn-client/pull/885)

- Upload chunksize is set to 1MB preventing upload issues [#910](https://github.com/SenseNet/sn-client/pull/910)

- Grid issues in Safari browser are fixed [#897](https://github.com/SenseNet/sn-client/pull/897)

- Folder name issues in explorer are fixed.  [#781](https://github.com/SenseNet/sn-client/issues/781)

- Fixed: Error throwing on typing % in search field [#710](https://github.com/SenseNet/sn-client/issues/710)

- Deletion of items from the Allowed Child Types input has been fixed. [#823](https://github.com/SenseNet/sn-client/issues/823)

### @sensenet/authentication-oidc-react@2.0.0 ❗❗🔥
- AuthenticationProvider's component parameters changed from ReactNode to functions which returns a ReactNode. This way we can push down values from the context to these components. Read more: [link](https://reactjs.org/docs/render-props.html)

### @sensenet/client-core@3.4.0

- Added interfaces and getAcl method for permissing handling. getAcl documentation: [link](https://docs.sensenet.com/api-docs/permissions#getfullaccesscontrollistofacontent)

- SchemaStore has a new public method: subscribeToSchemas. It requeries a callback function as the only parameter and runs it when the schema's value changes.

### @sensenet/client-utils@1.10.0

- New isInSubTree method to check if path given as the first parameter is inside the subtree defined by the second parameter.

### @sensenet/document-viewer-react@2.4.0

- Document viewer display proper error messages when preview generation is failed [#899](https://github.com/SenseNet/sn-client/pull/899)
- On the document preview screen the active page number was always 1. We fixed it to be in sync with the visible page [#873](https://github.com/SenseNet/sn-client/issues/873)

### @sensenet/repository-events@1.6.0

- Batch delete event has added.

You can find the release [here](https://github.com/SenseNet/sn-client/releases/tag/2020-09)
