---
title: September 2020
---

## Bug hunting season!💦🐜🐛

Hacktoberfest 2020 and the SNaaS beta period are upon us and this year we connect these two things making October fun, challenging and useful for both of us. We always put a lot of effort on avoiding bugs and testing a lot, but it's still good to stop for a while and review each and every feature, to make sure we're ready to start SNaaS beta in October. So we intended September to test and fix as many bugs as we can besides to finish some of the missing core features like setting permissions. Let's see what we did so far.

### Admin-ui@1.11.0

- User and Group types' browse view is fixed by hiding the unnecessary role related fields.
[785](https://github.com/sensenet/sn-client/issues/785)

- Possibility of pasting images and links are added to the RTE
[842](https://github.com/SenseNet/sn-client/pull/842)

- Setup page has been cleaned up by hiding system settings
[802](https://github.com/SenseNet/sn-client/issues/802)

- Grid column header are fixed to display the fields' DisplayNames instead of theis Names
[846](https://github.com/SenseNet/sn-client/pull/846)

- Batch actions (copy, delete, move) are fixed
[814](https://github.com/SenseNet/sn-client/issues/814)

- DefaultValue and default selection is now handled properly in Choice field related controls
[815](https://github.com/SenseNet/sn-client/issues/815)

- Reference fields got a basic display as grid columns, so now they can be used in custom menu grid's as well
[808](https://github.com/SenseNet/sn-client/issues/808)

- Multiple upload requests are now preveted on CTDs
[885](https://github.com/SenseNet/sn-client/pull/885)

- Upload chunksize is set to 1MB preventing upload issues
[910](https://github.com/SenseNet/sn-client/pull/910)

- Grid displaying issue in Safari browser are fixed
[897](https://github.com/SenseNet/sn-client/pull/897)

- Document viewer display proper error messages when preview generation is failed
[899](https://github.com/SenseNet/sn-client/pull/899)

- Folder name issues in explorer are fixed. 
[781](https://github.com/SenseNet/sn-client/issues/781)

- Fixed: Error throwing on typing % in search field
[710](https://github.com/SenseNet/sn-client/issues/710)

You can find the release [here](https://github.com/SenseNet/sn-client/releases/tag/2020-099)
