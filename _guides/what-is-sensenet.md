---
title:  "What is sensenet"
tags: [intro, concepts, use cases, dms, intranet, document management, mobile app]
description: Introduction to sensenet
permalink: /guide/introduction/what-is-sensenet
index: 0
---

## What is sensenet

sensenet is an open source content services platform written in .NET for developers and development companies. Its enterprise grade security and permission system makes it a perfect core of any content management solution, so you only need to focus on business logic. You can build single-page apps using your favorite JS framework without steep learning curve and access each and every content easily through OData REST API. Additionally, any 3rd party service can be integrated into sensenet, so the possibilities are infinite.

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

sensenet is the world’s first open source content services platform (CSP). According to Gartner, CSP solutions are the next stage in what we formerly called as enterprise content management (ECM). We could also call sensenet a headless enterprise content management system with strong support for frontend development.

With sensenet we offer a robust but modularized system. The whole product consists of multiple packages that build on each other. Most packages have the Services component as their prerequisite, as it provides the core layer of sensenet, the central Content Repository.

Everything is content in sensenet. In the Content Repository documents, tasks, users, projects, even system configuration – everything – is a Content. It is the foundation, the fundamental building block of the system that makes content management easy and powerful at the same time. All content items are organized into a huge content tree, so when managing and presenting content, applying features like versioning, approval or permissions, you can always think in subtrees and inheritance.

Using content items everywhere unlocks a great deal of exceptional features that makes your experience as a user more seamless, and your job as a developer a lot easier. Focus on the business requirements – the platform handles the rest!

In practice all this means that sensenet gives you everything you need to build a custom content based solution for you or your customers, without starting from scratch. The codebase even contains demo sites with example code and content you can use.

Install a stable, reliable system in the background, and use our ready-made toolset, or add your own. During this work you will, of course, either need development capacity on your own, but you can also resort to different levels of support, hosting or development services from our partners or from us.

## Community and Enterprise licenses

sensenet is available in two licenses. Both licenses have basically the same codebase, and you can build the same solution with them.

The Community license is available under the GNU General Public License: it is free as in beer, and free as in speech. You do not have to pay for it, and you can use it in whatever ways you like. You can enjoy the support of the community, and you can also contribute to sensenet’s codebase. All the documentation is available for free, too. You are even allowed to sell the resulting products and services. The only limitation is that you are required to give back to the community, and make your code publicly available under GPL.

The Enterprise license adds more benefits. You are not required to publish your code, and you are entitled for operational support and optional SLA levels and development support.

This freemium model lowers risks for you. You can get to know everything about the product and the source code, play with it and use it even in live projects. We want happy customers. Should you decide to buy additional services or the right to protect your code with the Enterprise license, you will already be confident in what you pay for.

## Software environment

sensenet has lots of backend and frontend components. You have the freedom to decide which components you use to build your high performing, robust and scalable project in a fast and productive fashion, using reliable code, ready-made for you.

The backend can be installed basically on any Windows based system. You will need at least an IIS 7.0 webserver, .Net Framework 4.6.1 libraries (4.7.2 environment on the executing machine) and a database server (MS SQL, but you can also use MongoDB for the binaries).

For our JavaScript frontend you will need Node.js to run the components outside of the browser in a server-side environment, reaching the backend Content Repository and the other .NET components through OData REST API, and then sending the back the dynamically created pages to the requesting web browser.

Another option for the frontend is the C# .NET client API for building desktop applications.

## Use your programming language

We want sensenet to be available for a wide range of developers both at backend and frontend, by supporting modern and widespread platforms and frameworks. 

### .NET for the backend and desktop apps

The Content Repository and other backend related components and tools are mostly written in .NET. We are transitioning towards .NET Standard 2.0, which means that you can soon develop your application in .Net Framework (4.6.1+) or .Net Core (2.0+). It is not just the backend, though, as we also have a .NET client API that you can use mainly for creating desktop apps.

### JavaScript/TypeScript for the frontend

The frontend components for the web are written in TypeScript, so you can code in JavaScript or TypeScript. We also heavily support modern JS frameworks like Aurelia and React with Redux.

### Do I *have* to use .NET or JS in your project?

Absolutely not. We have an OData REST API that you can use directly for manipulating content from your preferred language, so you can even avoid both .NET and JS if you want. Just install the Content Repository and some optional background components, and develop the frontend in the language you prefer.

## Components for your needs

The backend gives you a solid and reliable base with readymade extensions on which you can rapidly build a UI and related functions the way you want to, using our frontend client components and related libraries.

### Core .NET backend: Content Repository

You only [ -x-x- what about indexing? -x-x- ] have to install the [Services component](https://github.com/SenseNet/sensenet), and can start sending requests to your site. It will provide you a unified service layer for content, the central Content Repository. It offers features like storing and managing content and meta data, content type and template system, versioning, or trash functionality.

Users can reach content through entry points like WebDAV, so they can map the repository as a remote drive, you can give them access through standard OData REST API from third party applications, or they can even open/edit files directly in Microsoft Office. Each content item is stored and can be moved within a tree structure that assigns a path to them. These paths can be used as links by the URL resolution of the site or sites set up in the Content Repository.

### Extended .NET backend: Features

There are several backend components that extend the functionality of the Content Repository. The most important one is perhaps the indexing and search engine: sensenet requires a full and always up-to-date index of the repository content. You can use our current Lucene 2.9 component, or you can create your own query and index implementations.

The Security component – that you can even use in 3rd party projects outside of sensenet – provides you a solution for managing permission entries for users, roles and groups in a hierarchical organization, with JWT and OAuth for industry standard authentication and authorization. With a closely related, but separate component you can perform synchronization between your Active Directory and the organization tree in the Content Repository.

Several components support collaboration out of the box. Our Workspaces component gives you rich workspace elements like content types and content templates for collaboration. The Workflow component integrates the powerful Windows Workflow Foundation into your sensenet ECM. You can use it to build content driven workflows, such as the built-in Approval workflow. A separate Notification component allows users to subscribe to content changes and receive emails.

Deploy our Task Management solution for managing long-running background tasks in any application. You can also make decisions how you would like to store binaries (SQL, MongoDB), and what logging or a messaging implementation to deploy.

You also have options in how you would like to store binaries (SQL, MongoDB), what already available logging or a messaging implementation to use, but you are always free to integrate another solution that you prefer.

The backend also provides toolsets ranging from dev and admin tasks as small as retrying an operation multiple times to a robust trace component, or for easing the upgrade process for your installed packages.

### APIs for Clients

While there are many ways you can use sensenet, probably the most effective and rapid way to reach your goals is to install the central Content Repository with any optional components, and then build your solution around it by accessing and manipulating the content through our OData REST API either through other sensenet API’s, or directly. 

You have three options:

*	**JavaScript/Typescript client API components** for browsers or mobile apps, with strong React/Redux and Aurelia support. Like the backend, the JS frontend also has a core client component for content manipulation. Though optional – as almost all components in sensenet – it is a good starting point for manipulating the Content Repository. Using the API instead of native JavaScript boosts your productivity and make client-server interaction a lot easier. With the JS client API you can easily create, load, modify, delete content, and execute custom actions. It also contains some predefined security and versioning related actions, response models, interfaces and abstracts.
*	**C# .NET client API** for building desktop applications. It exposes a completely async API so that you can use it in a resource-friendly way
*	**Direct access** to our OData REST API with any other language.

The first two options let you work with sensenet by providing an API for the main content operations. They connect to the REST API, but hide the underlying requests. You can create or manage content, execute queries etc., instead of having to construct the requests yourself. Direct access gives more freedom, but more work to do as well.

### JavaScript client API extended

We have several other components extending the content functionality of the client. With a separate component you can create typesafe client-side content queries with a fluent API that will be evaluated into sensenet core content queries. Another component gives you a library with content type and content schema definitions used by default in sensenet installations. A third one listens to completed or failed Content Repository events like creating, modifying, loading, deleting, moving or executing actions on content.

Another set of packages will help you build the UI and related functions. You can work in React and Redux or Aurelia, and have access to a collection of Material-UI supported UI components, controls, actions, async actions and more for sensenet. You might also opt for mapping third party controls to generated sensenet schemas by specifying relations between sensenet schemas and specified UI controls at content and field level and use them for automatized form generation.

The core client package bypasses authentication by default. If you need JWT authentication, just install and configure our package for it. We also have a Google Oauth2 authentication component ready for you to install on top of it.

We also have a collection of generic dev utilities containing helpers for disposable objects, a retrier, a method tracer and a simple value observer implementation. It is sensenet-independent, so it can be used in any project.

The document viewer component for sensenet lets your users view documents and images in any modern browser on PCs, tablets and mobile phones, with paging, zooming, rotation, commenting and other document management functions.

## Plan freely, feel safe

As you have seen above, you have the freedom in deciding what components you use, but it is more than that. sensenet offers you freedom and security in planning the complexity and resources for your project, and supports your decisions in the long term.

Any 3rd party service can be integrated into sensenet so the possibilities are infinite. Besides using our built-in or example implementations we made sensenet ready for working with many types of external providers. You can integrate your preferred solutions for authentication, messaging, logging, tracing, storing binaries, and many other functions.

Since sensenet is open source, so if you feel your solution should be included in the project, you can change it or add to it. You are more than welcome to change the source code published on [GitHub](https://github.com/SenseNet) with a simple pull request.

It is best if you install only the parts you need, so that you can keep maintenance and upgrade costs at minimum. This is why we publish many small packages containing only the minimal set of libraries and content. The .NET based packages published at [nuget.org]( https://www.nuget.org/profiles/sensenet), and the actively developed and supported JS client packages published with the @sensenet scope at [npmjs.com](https://npmjs.com/search?q=sensenet) can be easily installed and upgraded at your convenience with the NuGet and the npm package managers. Especially for first time install, we recommend that you read the [Install sensenet 7.0 from NuGet](https://community.sensenet.com/docs/install-sn-from-nuget/) page from the documentation.

## Stable and Modern

When planning your project, you need a stable but future proof technology that you can trust. You need a toolset that has a proven history and a clear future.

sensenet is widespread and well-tried. The company behind sensenet is Sense/Net Inc., founded in 1995. We are a pioneer and technology leader of content services and document management platforms. sensenet is very successful in all verticals, including finance, public sector, energy and utilities, telco, aerospace and many others, with over [300 deployment](https://www.sensenet.com/references).

sensenet is a live product. It is modern, transparent and transitioning, and we hope you will also become as excited about our upcoming plans in our [roadmap](https://www.sensenet.com/roadmap) as we are.
