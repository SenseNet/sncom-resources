---
title:  "Installing patch 7.0.1"
author: iviczl
image: '/img/posts/patch.jpg'
tags: [sensenet, install, patch, 7.0]
---

Sensenet ECM moved to GitHub in small parts. These parts are also maintainable, so need patches. Here is the first one and I will tell you some things about it.

---
## Services

The Services component was the first to dwell on GitHub therefore it is quite reasonable to receive the first patch as well. This contains bugfixes and a single new feature.
### Find out if you need it
The following conditions indicate that your sensenet ECM have to be upgraded with the patch:
+ you have an installed sensenet ECM 7.0.0 site
+ you want an in place upgrade  

If one of these criterias is not fit for your situation you will not need to install this patch.
For a development environment you can use the changed sources next to the patch file.
### Where can you find it?
You can find the patch on the [release page](https://github.com/SenseNet/sensenet/releases/tag/v7.0.1)'s Assets paragraph, where you can download it from.
### How do you install it?
When you downloaded the patch (sn-services-patch-7.0.0-7.0.1.zip) from the release page, you have to place it into the site's Admin/tools folder.
In order to install it, you need to follow the next few steps:
1. stop the site
2. execute the patch (with [snAdmin](https://github.com/SenseNet/sn-admin))
3. update [Services](https://github.com/SenseNet/sensenet) component from NuGet

![Upgrade](/img/upgrade.png "Upgrade")

After you have done with it you can start the site again and will find your Services component upgraded to version 7.0.1.
