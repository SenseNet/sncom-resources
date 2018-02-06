---

title:  "Installing a patch in sensenet ECM"
author: iviczl
image: "../img/posts/patch.jpg"
tags: [install, patch, SN7]

---

Sensenet ECM moved to GitHub in small parts. These parts are also maintainable, so need patches. Here is the first one, let's see what this means for developers.

---

## Patching Services

The **Services** component was the first to dwell on GitHub therefore it is quite reasonable to receive the first patch as well. It contains bugfixes and a single new feature.

> Although this post was written at the time of the first patch, the process will be very similar in case of subsequent patches in other components as well.

### Find out if you need it
The following conditions indicate that your sensenet ECM have to be upgraded with the patch:

+ you have an installed sensenet ECM 7.0.0 site
+ you want an **in place upgrade**, which means you want to get the latest version **without dropping the database**.

> If one of these criterias is not fit for your situation you will not need to install this patch. In a development and test environment where you **reinstall and reindex the whole database** every time, you can use the updated NuGet packages and continue working.

### Where can you find it?
You can find the patch on the [release page](https://github.com/SenseNet/sensenet/releases)'s Assets paragraph, where you can download it from.

### How do you install it?
Download the patch (a zip file indicating the base and the target versions) from the release page. In order to install it, you need to follow the next few steps:

1. Stop the site.
2. Execute the patch (using [SnAdmin](/docs/snadmin)). This will raise the version number of this component in the database and make the necessary modifications.

   `snadmin patch.zip`
3. Update the **SenseNet.Services** and **SenseNet.Services.Install** packages from NuGet in Visual Studio so that next time you build your solution you get the new libraries.

![Upgrade](/img/posts/upgrade.png "Upgrade")

After you have finished the process you can start the site again and will find your Services component upgraded to the latest version. To make sure this happened, you may check the **VersionInfo** page on the Root console in Content Explorer.
