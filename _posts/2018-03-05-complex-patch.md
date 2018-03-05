---

title: "A complex patch"
author: tusmester
image: "../img/posts/complex-patch.jpg"
tags: [patch, upgrade, install, SN7]

---

In most cases executing a [sensenet ECM patch](/_posts/2018-02-14-install-patch) is easy: download-execute-forget. There are cases however when because of API or content changes this requires a bit more attention. In this post we will go through a process like this.

---

From time-to-time we have to change some parts of the API. Usually this happens because we need to clean up or clarify those parts or to make way for a new feature. If your custom solution used the previous API, this may require some manual work during patching.

> Of course we always try to minimize the impact of these changes, extend our APIs silently. But in cases like the [information retrieval refactor](https://github.com/SenseNet/sensenet/issues/125) we could not avoid a few breaking changes. Sometimes the change does effect only a subset of our users, depending on whether you've used a certain API or not. 

## Optimistic approach

The process always starts as usual, by downloading and trying to [execute the latest patch](/_posts/2018-02-14-install-patch). If it fails with a **type load error**, that is usually a sign that you are using an old API either directly in your code or through a 3rd party component. In that case you'll have to **rebuild or update** those libraries before executing the patch.

If there are type mismatch errors between the old and the new API and the package contains steps that need to be executed using the *new dll set* (for example updating pages or importing), there is no way to avoid adding your updated libraries to the package - see the details below.

## Rebuilding your libraries

If you have to rebuild your libraries, please do the following:

- backup your web folder containing the old environment
- get the latest NuGet packages of the component you are trying to patch
- rebuild your solution and resolve build errors.

## Extend the package

There is a way for developers to **add custom libraries** to sensenet packages so that they are copied to the target directory **during patching**. The necessary steps are already there inside the patch in the appropriate place, so you **do not have modify the manifest** - only **put the libraries into the zip file**.

The reason behind this magic is that in complex patch cases we need to copy the new libraries in the middle of package execution - not earlier and not later. Steps before need to use the old libraries and steps after need the new ones.

Please copy your libraries to the following subfolder inside the package:

```txt
Customization\bin
```

Everything placed into the subfolder above will be copied to the *web\bin* folder of the target site.

You can also put import content files to the package, they will be imported into the repository at the appropate time:

```txt
Customization\import
```

The content file structure will be imported under the *Root* content when we import our own content files at the end of a patch.

> Not all future patches will contain these copy/import steps - only when there was an API change that makes this necessary. If you think that a certain patch lacks these steps, or you encounter an error that cannot be handled this way, please contact us. **Modifying the manifest file inside the patch** is of course also possible, but please do that only if you are absolutely sure what you are doing.

## Execute the update package

First you have to **restore the original, old environment**. Yes, that is correct - please restore old libraries and web folder. This is necessary because a complex package needs to start with the old environment - for example because it needs those old libraries to perform an operation before overwriting them with the new ones. It also expects that the web folder (for example configuration) is in the old state.

After that you should be able to execute the patch (containing your updated libraries) without errors. At the end you also have to **update NuGet packages again**, so that you use the latest libraries in your development environment.

## Dependent packages

Sometimes there are **other sensenet components** (for example *WebPages* or *Workspaces*) that depend on the new API. If you installed them in your environment, you will also have to update those components too, because NuGet will get the latest libraries automatically, but your repository would contain the old component version. You'll notified about this when you try to start the portal next time and receive an error message stating that there is a component in the database with an old version number that cannot run.

Please let us know how you manage to work with these patches and how can we improve the process!

> Photo by [Denys Nevozhai](https://unsplash.com/photos/7nrsVjvALnA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/collections/1577014/car?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)