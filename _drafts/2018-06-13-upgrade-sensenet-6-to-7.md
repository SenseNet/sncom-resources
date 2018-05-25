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

## The upgrade process
Let's see how you should approach the upgrade and go through the steps one after the other.

#### Cleanup before the process
#### Backup everything
#### Get the new libraries
- create a new web project
- install all sensenet component packages
#### Update and compile your code
- copy your old code elements to the new project
- update your code with the API changes in sensenet
#### Execute the first package
#### Execute the second package