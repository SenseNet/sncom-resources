---
title: "Install AD sync from NuGet"
source_url: 'https://github.com/SenseNet/sn-adsync/blob/master/docs/install-adsync-from-nuget.md'
category: Guides
version: v7.0
tags: [install, nuget, packages, ad, adsync, sn7]
description: This article is for developers about installing the **AD sync** component for sensenet ECM from NuGet. Before you can do that, please install at least the core layer, sensenet Services, which is a prerequisite of this component.

---

# Install AD sync from NuGet
This article is **for developers** about installing the [AD sync](/docs/adsync) component for [sensenet ECM](https://github.com/SenseNet) from NuGet. Before you can do that, please install at least the core layer, [sensenet Services](/docs/install-sn-from-nuget), which is a prerequisite of this component.

> About choosing the components you need, take look at [this article](/docs/sensenet-components) that describes the main components and their relationships briefly.

## What is in the package?
There are two packages - one for each sync direction:

- Sync AD to Portal
- Sync Portal to AD (*this feature is not yet supported in sensenet ECM 7*)

You do not have to install both - only the one for the direction you plan to synchronize users and groups (*AD-to-portal* synchronization is used a lot more widely, because companies are used to managing their internal security structure in AD).

> Please note that to see and use the built-in user interface for editing AD settings and more, you will need the [WebPages component](https://github.com/SenseNet/sn-webpages) too. 

## Installing the NuGet packages in Visual Studio
### Sync AD to Portal package
To get started, **stop your web site** and install the 'sync AD to portal' package the usual way:

1. Open your **web application** that already contains the *Services* component installed in *Visual Studio*.
2. Install the following NuGet package (either in the Package Manager console or the Manage NuGet Packages window)

[![NuGet](https://img.shields.io/nuget/v/SenseNet.SyncAD2Portal.svg)](https://www.nuget.org/packages/SenseNet.SyncAD2Portal)

> `Install-Package SenseNet.SyncAD2Portal`

### Sync Portal to AD package
> This feature is not yet supported in sensenet ECM 7.

## Installing the ad sync components in the repository
To complete the install process, please execute the appropriate SnAdmin command as usual:

1. Open a command line and go to the *[web]\Admin\bin* folder of your project.
2. Execute the necessary install command with the SnAdmin tool.

```text
.\snadmin install-syncad2portal
```

## Deploying the executor
For details about deploying the tool, please check out the [AD to Portal sync](/docs/sync-ad-to-portal) article.