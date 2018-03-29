---
title: "Entering the new era - The componentized SN7"
author: borsi 
image: "/img/posts/components.jpg"
tags: [sn7, components, componentization]
---

It's been a long one year, but we're nearing the end of the componentization project for sensenet. If you tried to keep up with the progress, what you could see, was a bunch of git repositories, NuGet and npm packages popping up now and again, but you may not be sure what each of them really does. You might be thinking "Okay, you tore the whole thing to pieces, but how the hell does it all fit together?" Fear not.

---

I’ll try and break down these components to you, so when you accidentally hop on to our github enterprise page, you won’t feel lost in the forest of repositories.

*[[DISCLAIMER: I am not coming up with all this all by myself. People smarter than me, have already written a great description about this [here](http://community.sensenet.com/docs/sensenet-components/). So if you don't like my style, by all means, hop over there and read everything you can find.]]*

If you're still here, fasten your seatbelts. It's going to be a long ride. So what's lurking under the SenseNet enterprise in GitHub?

## The Core

*The essentials. The alpha, and the omega. What you need to have a powerful content management platform up and running on your premises.*

[**SenseNet/sensenet**](https://github.com/SenseNet/sensenet)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Services.Install.svg)](https://www.nuget.org/packages/SenseNet.Services.Install)

At the very core of sensenet, there’s Sensenet Services. Services is the "Mother of All Components": you'll need it, if you want to do anything with sensenet, for it is the heart of the platform.

It contains:

- The main Content Repository and dynamic content type system
- A set of built-in basic content types (File, Folder Workspace, ContentList/DocumentLibrary)
- Indexing and Search
- Security
- **SenseNet/sn-admin**
  - This handy tool can be your best friend when developing on sensenet. Be sure to get acquainted with each other.
- **SenseNet/sn-tools**
  - When we face something more than once, it is nice to have a solution at hand the next time we encounter it. We collect our little tools in this repository.

But no UI, whatsoever. You can access the Content Repository inside Services through well defined - you guessed it - services/service entry points, such as the REST API, or WebDav. You can even use the javascript or the .NET client library, which are wrappers for the OData layer.

> For detailed install steps please follow [this link](http://community.sensenet.com/docs/install-sn-from-nuget/).

## Extensions

*Everything that makes your life better. Content types, we built for you. Prepackaged business logic in breadcrumbs, with mayo.* 

![Put it all together!](/img/posts/wrenches.jpg)

[**SenseNet/WebPages**](https://github.com/SenseNet/sn-webpages)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.WebPages.Install.svg)](https://www.nuget.org/packages/SenseNet.WebPages.Install)

WebPages is our good old UI component. When you install it on top of Services, you get a login page and the Content Explorer out of the box. You can build your own pages using the app model and our built-in portlets. Everything you'll find here is built with [ASP.NET](http://ASP.NET) WebForms.

To summarize, when you install WebPages, you'll have:

- The Services component (it's a requirement in the NuGet package)
- The Content Explorer
- A Login page
- Our Built-in Portlets

> For detailed install steps please follow [this link](http://community.sensenet.com/docs/install-webpages-from-nuget/).

[**SenseNet/Workspaces**](https://github.com/SenseNet/sn-workspaces)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Workspaces.Install.svg)](https://www.nuget.org/packages/SenseNet.Workspaces.Install)

Workspaces is a functional component for sensenet, it contains predefined content types for workspaces, you can use for various scenarios. If you only have Services installed (because for whatever reason you don't want to use WebPages or build your UI using [ASP.NET](http://ASP.NET) WebForms), you'll only get the workspace types. If, however, you have WebPages, you'll also get the related content templates and the whole UI package for Workspaces - build entirely in [ASP.NET](http://ASP.NET) WebForms.

> For detailed install steps, please check [this article](http://community.sensenet.com/docs/install-workspaces-from-nuget/).

[**SenseNet/Workflow**](https://github.com/SenseNet/sn-workflow)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Workflow.Install.svg)](https://www.nuget.org/packages/SenseNet.Workflow.Install)

This component integrates the powerful Windows Workflow Foundation into your sensenet. You can use it to build content driven workflows, such as the built-in Approval workflow.

If you want to build complex business scenarios and processes, Workflow is your go-to component.

[**SenseNet/sn-notification**](https://github.com/SenseNet/sn-notification)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Notification.Install.svg)](https://www.nuget.org/packages/SenseNet.Notification.Install)

Notifications lets your users subscribe to content changes in the Repository. The notifications are sent via e-mail either in bulk, or immediately. 

[**SenseNet/sn-taskmanagement**](https://github.com/SenseNet/sn-taskmanagement)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.TaskManagement.Core.svg)](https://www.nuget.org/packages/SenseNet.TaskManagement.Core)

Task manager is a component you need to install completely separately. It's for managing long-running background tasks, such as preview generation. But don't let us set limits for your creativity, the task manager is a powerful tool to run a bunch of tasks in the background on a seperate machine. 

Make sure you read the documentation for Task Management and discover it's full power.

## Client libraries

*Manipulate the Content Repository with the magic of client libraries. Build Single Page Applications, compelling UI's, or WPF desktop apps, all powered with sensenet! Take your pick.*

![Serve the client y'all!](/img/posts/serve-the-client-delish.jpg)

[**SenseNet/client-js**](https://github.com/SenseNet/sn-client-js)

Current npm package: [![NPM version](https://img.shields.io/npm/v/sn-client-js.svg?style=flat)](https://www.npmjs.com/package/sn-client-js)

This Javascript (it's really Typescript, "but who counts" nowadays) library lets you work with the Content Repository by providing a Javascript client API for the main content operations.

Since we're talking about a Javascript library, instead of NuGet, you can install it from npm. Once you have a sensenet Services running somewhere, set up CORS and you're ready to start developing a Single Page Application for example.

There are several related packages that are in development and that will let you build applications in an even more productive fashion. These are:

- [sn-controls-aurelia](https://github.com/SenseNet/sn-controls-aurelia)
- [sn-controls-react](https://github.com/SenseNet/sn-controls-react)
- [sn-redux](https://github.com/SenseNet/sn-redux)

The first library contains sensenet UI controls implemented in Aurelia. The second does the same in React, with the exception that our React controls use Redux for a centralized state store, while our Aurelia controls don't. All of these libraries have the prerequisite of installing sn-client-js.

[**SenseNet/sn-client-dotnet**](https://github.com/SenseNet/sn-client-dotnet)

Current NuGet package: [![NuGet](https://img.shields.io/nuget/v/SenseNet.Client.svg)](https://www.nuget.org/packages/SenseNet.Client)

If you fancy using the Content Repository from your .NET application, you can easily do that using the .NET Client for sensenet. The library connects to the REST API and wraps it into a neat C# API. Use it any way you can think of (we think you could build nice WPF apps with it for example)!

If you have *any* questions, or feedback, talk to us. You can chat with us on [Gitter](http://gitter.im/SenseNet/sensenet), or send us [e-mails](http://hello%5Bat%5Dsensenet%5Bdot%5Dcom), like in the medieval times.
