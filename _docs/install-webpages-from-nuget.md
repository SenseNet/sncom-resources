---
title: "Install sensenet WebPages from NuGet"
source_url: 'https://github.com/SenseNet/sn-webpages/blob/master/docs/install-webpages-from-nuget.md'
category: Guides
version: v7.0
tags: [install, nuget, packages, webpages, sn7]
---

# Install sensenet WebPages from NuGet
This article is **for developers** about installing the ASP.NET WebForms-based UI layer of [sensenet ECM](https://github.com/SenseNet) from *NuGet*. Before you can do that, please install the core layer, [sensenet Services](/docs/install-sn-from-nuget), which is a prerequisite of this component.

>About choosing the components you need, take look at [this article](/docs/sensenet-components) that describes the main components briefly.

![sensenet WebPages](https://github.com/SenseNet/sn-resources/raw/master/images/sn-components/sn-components_webforms.png "sensenet WebPages")


### Web project: pull in the packages

1. Open your web application that already contains the *Services* component installed.
2. Install the following NuGet packages (either in the Package Manager console or the Manage NuGet Packages window)

#### In the web app
Contains installation artifacts (content files, content types, etc).

<div style="text-align: left">
<a href="https://www.nuget.org/packages/SenseNet.WebPages.Install"><img src="https://img.shields.io/nuget/v/SenseNet.WebPages.Install.svg" /></a>
</div>

> `Install-Package SenseNet.WebPages.Install -Pre`

(this will install the other, dll-only package too, no need to pull that in manually)

#### In other projects
A dll-only package.

<div style="text-align: left">
<a href="https://www.nuget.org/packages/SenseNet.WebPages"><img src="https://img.shields.io/nuget/v/SenseNet.WebPages.svg" /></a>
</div>

> `Install-Package SenseNet.WebPages -Pre`

### Web app changes
1. Change the Global.asax.cs codebehind: the application class should inherit from the following class: 

   SenseNet.**Portal**.SenseNetGlobal

>Please note that this is a different base class from the one in the Services layer!      

````csharp
    public class MvcApplication : SenseNet.Portal.SenseNetGlobal    
````

2. **Build your solution**, make sure that there are no build errors.

### Install the sensenet ECM WebPages component
Before installing the component, please make sure that you have access to the Content Repository *SQL database* where you want to install it. The SnAdmin tool will use the connection string in the *[web]\Tools\SnAdminRuntime.exe.config* file to access the db, please check that it contains the appropriate user credentials and server/database name.

Open a **command line** and go to the *[web]\Admin\bin* folder.

Execute the **install-webpages** command with the [SnAdmin](https://github.com/SenseNet/sn-admin) tool.

````text
.\snadmin install-webpages
````

If there were no errors, you are good to go! Hit F5 in Visual Studio and start experimenting with sensenet ECM WebPages!

## After installing sensenet WebPages
After you installed this component, you will be able to log in on the main page and browse, edit or create content on the admin UI ([Content Explorer](http://wiki.sensenet.com/Content_Explorer)).

About how to log in and enter Content Explorer, follow this URL:

https://github.com/SenseNet/sn-webpages#LogIn