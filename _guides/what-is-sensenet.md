---
title:  "What is sensenet"
tags: [intro, concepts, use cases, dms, intranet, document management, mobile app]
description: Introduction to sensenet
permalink: /guide/introduction/what-is-sensenet
index: 0
---

## What is sensenet

sensenet is an open source content services platform for developers and development companies. Its enterprise grade security and permission system makes it a perfect core of any content management solution, so you only need to focus on business logic. You can build single-page apps using your favorite JS framework without steep learning curve and access each and every content easily through OData REST API. Alternatively, developers may integrate it with any .Net application, e.g. an MVC web app.

## Use cases

As a development platform with a capable content repository, sensenet could satisfy a wide variety of business needs. From company intranet to mobile app, you can develop your own solution, focusing only on business logic and leave the rest to a stable system in its core. See below some examples of what can be achieved with sensenet.

### Document Management
sensenet has robust document management capabilities that enables you to get the most out of your digital work environment. For many companies, the focus of document management is on the storage and organization of documents. They want to be able to store documents in a secure and organized way that still allows content to be found easily. Learn about features and functions built for sensenet to make document management reliable and easy to use.

- permission system
- indexing and search
- collaboration
- version control & approval
- Microsoft Office integration
- custom workflows
- document preview
- content types & templates
- localization

### Company intranet

The main purpose of an intranet is to share company information and increase the collaboration among employees. sensenet, with its document management capability and enterprise grade permission system is ready to form the core of any collaborative workspace which can be tailor made to specific needs. Sharing documents, defining organizational groups and custom workflows are all ready for you.

### Public website

With sensenet you are able to build public websites easily even by using JS frameworks. You can create single-page applications with little or no back-end related development, sensenet handles all the rest for you. All features, including document management, permission system and custom workflow are accessible, so you have much more possibility than using a simple CMS solution. You can also connect any 3rd party service to the system using APIs already available in sensenet.

### Mobile app

Thanks to multiple connection possibilities by APIs, mobile app development is also possible with sensenet. Build your app on your favorite platform and use sensenet as a content repository behind your solution dealing with content requests, permissions and so on.

## Development platform for content

Everything is content in sensenet. Documents, tasks, users, projects, even system configuration – everything – is stored and managed in the Content Repository, provided by the Services component. It is the foundation, the fundamental building block that makes content management easy and powerful at the same time. All content items are organized into a huge content tree, so when managing and presenting content, applying features like versioning, approval or permissions, you can always think in subtrees and inheritance.

In practice this means that sensenet gives you everything you need to build a content based custom solution. Instead of starting from scratch you have access to a selection of well designed and tested special development tools and content structures. The install packages even contain optional demo sites with example code and content you can use.

## Community and Enterprise licenses

sensenet is available in two licenses. Both licenses have basically the same codebase, and you can build the same solution with them.

The Community license is available under the GNU General Public License. It gives you the source code and documentation, free as in beer, free as in speech. You are even allowed to sell the resulting products and services. The only obligation is that you have to make your solution publicly available for the community under GPL.

The Enterprise license adds more benefits. You can get operational and development support with optional SLA levels, and you can keep your code private. The freemium model guarantees transparency: should you decide to buy these additional services, you will be confident in what you pay for. We want happy customers.

## Software environment

The backend can be installed basically on any Windows based system. You will need an IIS webserver, .Net Framework and a database server (MS SQL, but you can also use MongoDB for the binaries).

For the JavaScript frontend you will need Node.js to run the components outside of the browser in a server-side environment. It will reach the backend Content Repository and the other .NET components through OData REST API, and then dynamically create webpages and send them back to the requesting browser.

sensenet is robust, but modular. We publish many small packages with a minimal set of libraries and content. Installing only the parts you need also keeps maintenance and upgrade costs at minimum. Our [NuGet]( https://www.nuget.org/profiles/sensenet), and [npm](https://npmjs.com/search?q=sensenet) packages (the latter with the @sensenet scope) can be conveniently installed and upgraded with their package managers.

## Development environment: APIs everywhere

The Content Repository and other backend related components and tools are mostly written for the .NET platform, transitioning towards .NET Standard 2.0. You can use our C# .NET client API for accessing the repository from any .Net application, let it be a server or a client app. It exposes a completely async API so that you can use it in a resource-friendly way.

The JavaScript/TypeScript frontend components are for web and mobile apps. Using the JS client API instead of native JavaScript boosts your productivity and make client-server interaction a lot easier when manipulating the Content Repository. We have also created React building blocks you can use for example for icons, view and list controls or search.

You can also use OData REST API directly for manipulating content with your preferred language, avoiding both .NET and JS if you want. Just install the Content Repository and some optional background components, and develop the frontend in the language you prefer.

### Basic features

After installing the [Services component](https://github.com/SenseNet/sensenet), you can start sending requests to your site. It will provide a unified service layer for content, the central Content Repository. Users can reach content through entry points like WebDAV, so they can map the repository as a remote drive, you can give them access from third party applications, or they can open/edit files directly in Microsoft Office.

sensenet requires a full and always up-to-date index. You can use our built-in indexing and search engine based on Apache Lucene, or you can create your own implementations as well.

The Security component – that you can even use in 3rd party projects outside of sensenet – manages permission entries, optionally with JWT and OAuth for industry standards.

### Additional features around the repository

You can integrate the powerful Windows Workflow Foundation to build content driven workflows, perform synchronization between your Active Directory and the organization tree, manage operations in the background in a scalable way for long-running tasks, or allow users to subscribe to content changes and receive notification emails.

You can decide how to store binaries (SQL, MongoDB) what built-in or 3rd party logging, tracing or messaging provider to use. Example implementations with content structures, like document libraries, to-do apps, calendars are also included. 

### Web and mobile

The JavaScript client API is extended with several other solutions. The core client package bypasses authentication by default. If you need JWT authentication, just install and configure our package for it. We also have a Google Oauth2 authentication component ready for you to install on top of it.

You can work in React and Redux or Aurelia, and have access to a collection of Material-UI supported UI components, controls, actions, async actions and more for sensenet. You might also opt for mapping third party controls to generated sensenet schemas and use them for automatized form generation. You can also create typesafe client-side content queries with a fluent API that will be evaluated into sensenet core content queries.

The document viewer component for sensenet lets your users view documents and images in any modern browser on PCs, tablets and mobile phones, with paging, zooming, rotation, commenting and other document management functions.

## Be successful with sensenet

sensenet gives you freedom in planning your project, and supports your decisions on the long run.

sensenet, and the company behind sensenet is very successful in all verticals, including finance, public sector, energy and utilities, telco, aerospace and many others, with over [300 deployment](https://www.sensenet.com/references).

sensenet is a live product with proven history and a clear future. It is modern, transparent and transitioning. Have a look at our upcoming plans in our [roadmap](https://www.sensenet.com/roadmap).
