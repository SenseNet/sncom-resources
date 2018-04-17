---
title: "Install sensenet Notification from NuGet"
source_url: 'https://github.com/SenseNet/sn-notification/blob/master/docs/install-notification-from-nuget.md'
category: Guides
version: v7.0
tags: [install, nuget, packages, notification, sn7]
description: This article is for developers about installing the **Notification** component for sensenet from NuGet. Before you can do that, please install at least the core layer, sensenet Services, which is a prerequisite of this component.

---

# Installing Notification from NuGet

This article is **for developers** about installing the **Notification** component for [sensenet](https://github.com/SenseNet) from NuGet. Before you can do that, please install at least the core layer, [sensenet Services](/docs/install-sn-from-nuget), which is a prerequisite of this component.

> About choosing the components you need, take look at [this article](/docs/sensenet-components) that describes the main components and their relationships briefly.

## What is in the package?
As usual, the package contains two kinds of content:

1. a notification backend that is responsible for managing notifications
2. a UI for subscribing and managing notifications

> Please note that for the latter you will need the [WebPages component](https://github.com/SenseNet/sn-webpages), because the built-in portlets and views require that component to be installed. 

> Currently there is no REST api for this feature, only a backend .Net api.

## Installing the NuGet packages in Visual Studio
### Main notification package
To get started, **stop your web site** and install the notification 'install' package the usual way:

1. Open your **web application** that already contains the *Services* component installed in *Visual Studio*.
2. Install the following NuGet package (either in the Package Manager console or the Manage NuGet Packages window)

[![NuGet](https://img.shields.io/nuget/v/SenseNet.Notification.Install.svg)](https://www.nuget.org/packages/SenseNet.Notification.Install)

> `Install-Package SenseNet.Notification.Install -Pre`

### Notification UI elements: the optional Portlets package
If you have the [sensenet WebPages](https://github.com/SenseNetsn-webpages) component installed, **you have to install the following NuGet package** that contains **portlets and other UI elements** for notifications:

[![NuGet](https://img.shields.io/nuget/v/SenseNet.Notification.Portlets.svg)](https://www.nuget.org/packages/SenseNet.Notification.Portlets)

> `Install-Package SenseNet.Notification.Portlets -Pre`

If you do not install the package above, you may encounter errors on user interfaces that need these portlets to function properly.

## Installing the Notification component
To complete the install process, please execute the *install-notification* SnAdmin command as usual:

1. Open a command line and go to the *[web]\Admin\bin* folder of your project.
2. Execute the install-notification command with the SnAdmin tool.

```text
.\snadmin install-notification
```