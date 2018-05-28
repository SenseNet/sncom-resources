---

title: "Upgrade sensenet 6 to 7"
author: [tusmester]
image: "../img/posts/upgrade_sn6_sn7.jpg"
tags: [upgrade, patch, sn6]

---

It was a long time ago when we released the latest (and last) version of sensenet 6. Since then we [moved to GitHub](/blog/2017/05/23/moving-to-github) and converted sensenet into a collection of [components](/blog/2017/09/27/new-sn7-components). And now finally we arrived to a point when we can start upgrading old sensenet 6 installations to the new, more flexible and lightweight Content Services Platform: sensenet v7.

---

## Do I need to deal with the upgrade?
Well, of course this concerns you only if you already have a sensenet 6 instance in production and you cannot afford loosing (recreating) the database. Even then please consider the options in this section carefully to make sure you have to start patching.

The differences between sensenet 6 and 7 are numerous, this is why it is important to decide whether you really have to do the upgrade. Because sometimes it is **a lot easier and faster** to simply spin up a new [sensenet 7 installation](/docs/install-sn-from-nuget), **export** your content from your sensenet 6 repository and **import** them to the new one. You'll end up with a cleaner, simpler and more lightweight application. Of course you cannot choose this if:

- your repository is *huge* and contains many content items (e.g. lots of files) that would take ages to export and import
- you have custom code that relies on *content ids* (e.g. an external system that stores content ids as foreign keys) - because ids will change after export/import (unlike content paths that remain the same)
- your application relies heavily on features or apis that were removed and not available in sensenet 7

## Removed or obsolete features
Yes, there are some features that we could not take with us to the new platform - mostly because of technical reasons.

### Not available
- **Tagging**: it was no way for us to keep this feature as it relied on a direct reference to the underlying Lucene indexing implementation and it would not be possible to replace the built-in search provider with a different one
- **Captcha**: please use one of the common solutions available online
- **WebContentDemo** type: this content type has been retired. All instances will be converted to Articles during the upgrade, so no data will be lost, but if you have content items of this type *in the file system* (or source control), you have to convert them to articles before you can import them into sensenet 7.

### Available in a compatibility pack
The compatibility pack is an API package that will be installed during the upgrade. It contains many retired APIs that will bring at least parts of removed features back. Sometimes they only let you access your data (e.g. tags), in other cases you will still be able to use the full feature.

- Wall
- Journal
- Survey
- Voting
- Rating
- Wiki
- Blog
- Discussion forum
- Event calendar
- Tag management UI

The compatibility pack is not maintained anymore in sensenet 7 (of course the community may fix bugs in it or add missing APIs), but at least it lets upgraded sites operate without too much change. It is recommended to replace these features with a more modern implementation before or after the upgrade.

## Components and future patches
If you upgrade a sensenet 6 instance to sensenet 7, you will have a 'regular' sensenet 7 installation. You will be able to install **all future patches** the same way as any other sensenet 7 instance. There are a few things to consider here though:

- You'll have all the currently available sensenet 7 components, you **cannot opt-out** of any of them during patching (and currently there is no way to uninstall a component later).
- Your repository will contain lots of old or obsolete content that will not be deleted during patching. They will cause no harm, but it is advisable to make a cleanup before upgrading - meaning deleting demo or unnecessary content.

## sensenet 7 - a different philosophy
sensenet 6 was a monolithic application that gave developers the possibility to **extend it** with their custom code and features - but even without that it provided many features out of the box, including a full UI.

sensenet 7 however is a platform that you can **integrate into your application** (notice the difference?). This gives developers a lot more flexibility and front-end developers a lot more options to build a UI using modern technologies.

This is why working with sensenet 7 is different in many ways from what you are used to with sensenet 6. For example:

- we provide libraries and installers in **NuGet and npm packages** (instead of dlls to copy as in sensenet 6)
- our components are versioned and upgraded separately and more frequently as fixes and features are published
- it is a lot easier to participate in the dev process by monitoring our repositories on [GitHub](https://github.com/SenseNet) and contributing to our source code

### A new UI development approach 
In sensenet 7 projects the UI is created using modern technologies (like a one-page application with React or ASP.NET MVC) instead of ASP.NET *WebForms* (and portlets and ascx controls) which is still available as a legacy technology but *should not be used in new projects* - please use one of our many [front-end libraries](/blog/2018/02/21/scoped-packages) that let you compose UI elements in a flexible way.

> After upgrading please consider replacing your existing UI gradually with a new one built on newer technologies.

### New recommendation for tools
Previously we encouraged creating separate command line tools if you needed to access the repository and modify content items. In sensenet 7 it is more advisable to make use of [SnAdmin](/docs/snadmin) as the packaging tool that can be extended by custom steps deployed in .Net libraries. We also offer built-in [SnAdmin tools](/docs/snadmin-tools) (that are really just built-in one-line wrapper packages around snadmin steps) for the same operations as before: importing/exporting content or re-indexing the repository.

> So please do not deploy command line tools into the `web\Tools` folder anymore. Create SnAdmin custom steps instead, as this simplifies starting the repository and configuring the environment.

## The upgrade process
Let's see how you should approach the upgrade and go through the steps one after the other.

#### Cleanup before the process
You do not have to delete any built-in system content of course, but if you have unused or unnecessary custom content or custom features, please consider removing them beforehand, it will make the upgrade process faster.

#### Backup everything
Please make a backup of your **database** and **web folder** too. Not only because it makes sense, but because you will need *both old and new dlls* during the upgrade, as you'll see below.

#### Get the new libraries
In a sensenet 6 environment you have an old web project with many *manually referenced* libraries. To have a clean slate, please do the following:

- create a new web project
- install the following sensenet NuGet packages
   - SenseNet.Services.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.Services.Install.svg)](https://www.nuget.org/packages/SenseNet.Services.Install)
   - SenseNet.WebPages.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.WebPages.Install.svg)](https://www.nuget.org/packages/SenseNet.WebPages.Install)
   - SenseNet.Workspaces.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.Workspaces.Install.svg)](https://www.nuget.org/packages/SenseNet.Workspaces.Install)
   - SenseNet.Workflow.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.Workflow.Install.svg)](https://www.nuget.org/packages/SenseNet.Workflow.Install)
   - SenseNet.Notification.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.Notification.Install.svg)](https://www.nuget.org/packages/SenseNet.Notification.Install)
   - SenseNet.Preview.Install [![NuGet](https://img.shields.io/nuget/v/SenseNet.Preview.Install.svg)](https://www.nuget.org/packages/SenseNet.Preview.Install)
   - SenseNet.Preview.Aspose (for _Enterprise_ customers)


> You **do not** have to execute the SnAdmin packages inside them, only install the NuGet packages in Visual Studio! You only need the libraries for now, not a new database.

If you have additional libraries (business logic in non-web projects), you should create new projects for every one of them too, and install the dll-only versions of the necessary sensenet NuGet packages. For example, if you need the main sensenet references in your library, you should install the `SenseNet.Services` package (and _not_ the SenseNet.Services._Install_ package, because that is needed only once, in the web project). If you need the Workflow dlls of sensenet, install the `SenseNet.Workflow` package - and so on.

#### Update and compile your code
- copy your old code (classes, etc., everything) to the new project
- add the additional NuGet packages needed by your custom code
- update your code with the API changes in sensenet (if you encounter changes that you cannot resolve, please contact us or query the community resources for advice)
- compile your library and copy it to the `Customization\bin` subfolder of the **first package** (`sn-patch-6.5.4-7.1-part1.zip`).

> Yes, you'll have to **modify the package by adding your libraries**. This is the easiest way to make sure that no old code remains in the web folder and the new version of your code gets copied there at the right time.

Please make sure you do not copy or compile these new libraries into the working web folder, because the upgrade packages need the old environment, including old libraries.

#### Execute the first package
You'll have to execute the two packages in the **old web folder**. The new web project that you created in the previous step is just for compiling the new libraries, at least for now. Later you can move on to use it as the new web folder, but during the patch please work in the old one.

> The reason behind having two packages is that the patch structure itself changed since version 6 and they are not compatible.

- make sure that the `web\Tools\SnAdminRuntime.exe.config` file contains the correct connection string and (in case of an nlb environment all network targets - other web servers - are listed in the config)
- copy the patch to the `web\Admin` folder
- execute the patch using SnAdmin

```txt
snadmin sn-patch-6.5.4-7.1-part1.zip
```

Please review the execution logs in the `web\Admin\log` folder to make sure everything looks fine.

- copy the new SnAdmin executable
   - delete all files in the old `web\Admin\bin` folder
   - copy the new SnAdmin executable and related files from the new web project's `web\Admin\bin` folder to the old one

Now the environment is ready for executing the second package.

#### Execute the second package

- if possible, create a backup of this state (even though the portal is not usable at this point, you cannot start it as it is in a half-state)
- execute the second patch using SnAdmin

```txt
snadmin sn-patch-6.5.4-7.1-part2.zip
```

Please review the execution logs in the `web\Admin\log` folder to make sure no errors occurred. At this point you should be able to start the site, but it is advisable to clean up the environment as the last step.

#### Cleanup the solution
As we created a new web project before, please copy the `web.config` and `web\Tools\SnAdminRuntime.exe.config` from the old web folder (where they were updated during the upgrade process!) to the new one.

You should delete old projects and use the new web project from now on.