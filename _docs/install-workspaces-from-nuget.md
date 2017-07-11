---
title: "Install sensenet ECM 7.0 from NuGet"
source_url: 'https://github.com/SenseNet/sn-workspaces/blob/master/docs/install-workspaces-from-nuget.md'
category: Guides
version: v7.0
tags: [install, nuget, packages, workspaces, sn7]
---

# Install sensenet Workspaces from NuGet
This article is **for developers** about installing the **Workspaces** component for [sensenet ECM](https://github.com/SenseNet) from NuGet. Before you can do that, please install at least the core layer, [sensenet Services](/docs/install-sn-from-nuget), which is a prerequisite of this component.

>About choosing the components you need, take look at [this article](/docs/sensenet-components) that describes the main components and their relationships briefly.

![sensenet Workspaces](https://github.com/SenseNet/sn-resources/raw/master/images/sn-components/sn-components_workspaces.png "sensenet Workspaces")

To get started, stop your web site and install the workspaces package the usual way:

1. Open your web application that already contains the *Services* component installed in *Visual Studio*.
2. Install the following NuGet package (either in the Package Manager console or the Manage NuGet Packages window)

[![NuGet](https://img.shields.io/nuget/v/SenseNet.Workspaces.Install.svg)](https://www.nuget.org/packages/SenseNet.Workspaces.Install)

> `Install-Package SenseNet.Workspaces.Install -Pre`

### Install the Workspaces component
1. Open a command line and go to the *[web]\Admin\bin* folder of your project.
2. Execute the install-workspaces command with the [SnAdmin](https://github.com/SenseNet/sn-admin) tool.

```text
.\snadmin install-workspaces
```

#### Import demo content
Optionally you may import demo content too:

```text
.\snadmin install-workspaces importdemo:true
```

The latter will add demo workspaces under the following path in the content repository:

```text
/Root/Sites/Default_Site/workspaces
```

If there were no errors, you are good to go! Hit F5 in Visual Studio and start experimenting with sensenet ECM Workspaces!