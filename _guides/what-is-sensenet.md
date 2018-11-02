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

sensenet is the world’s first open source content services platform (CSP). According to Gartner, CSP solutions are the next stage in what we formerly called as enterprise content management (ECM). We could also call sensenet a headless enterprise content management system with strong support for frontend development.

With sensenet we offer a robust but modularized system. The whole product consists of multiple packages that build on each other. Most packages have the Services component as their prerequisite, as it provides the core layer of sensenet, the central Content Repository.

Everything is content in sensenet. In the Content Repository documents, tasks, users, projects, even system configuration – everything – is a Content. It is the foundation, the fundamental building block of the system that makes content management easy and powerful at the same time. All content items are organized into a huge content tree, so when managing and presenting content, applying features like versioning, approval or permissions, you can always think in subtrees and inheritance.

Using content items everywhere unlocks a great deal of exceptional features that makes your experience as a user more seamless, and your job as a developer a lot easier. Focus on the business requirements – the platform handles the rest!

In practice all this means that sensenet gives you everything you need to build a custom content based solution for you or your customers, without starting from scratch. The install packages even contain optional demo sites with example code and content you can use.

Install a stable, reliable system in the background, then use our ready-made toolset, or add your own. During this work you will, of course, either need development capacity on your own, but you can also resort to different levels of support, hosting or development services from our partners or from us.

## Community and Enterprise licenses

sensenet is available in two licenses. Both licenses have basically the same codebase, and you can build the same solution with them.

The Community license is available under the GNU General Public License: it is free as in beer, and free as in speech. You do not have to pay for it, and you can use it in whatever ways you like. You can enjoy the support of the community, and you can also contribute to sensenet. All the documentation is available for free, too. You are even allowed to sell the resulting products and services. The only limitation is that you are required to give back to the community, and make your code publicly available under GPL. The Enterprise license adds more benefits. You are not required to publish your code, and you are entitled for operational support and optional SLA levels and development support.

This freemium model lowers risks for you. You can get to know everything about the product and the source code, play with it and use it even in live projects. We want happy customers. Should you decide to buy additional services or the right to protect your code with the Enterprise license, you will already be confident in what you pay for.

## Software environment

sensenet has lots of backend and frontend components. You have the freedom to decide which components you use to build your high performing, robust and scalable project in a fast and productive fashion, using reliable code, ready-made for you.

The backend can be installed basically on any Windows based system. You will need at least an IIS 7.0 webserver, .Net Framework 4.6.1 libraries (4.7.2 environment on the executing machine) and a database server (MS SQL, but you can also use MongoDB for the binaries).

For our JavaScript frontend you will need Node.js to run the components outside of the browser in a server-side environment, reaching the backend Content Repository and the other .NET components through OData REST API, and then sending the back the dynamically created pages to the requesting web browser.

Another option for the frontend is the C# .NET client API.

## Development environments

We want sensenet to be available for a wide range of developers both at backend and frontend, by supporting modern and widespread platforms and frameworks. 

### .NET

The Content Repository and other backend related components and tools are mostly written for the .NET platform. We are transitioning towards .NET Standard 2.0, which means that you can soon develop your application in .Net Framework (4.6.1+) or .Net Core (2.0+). It is not just the backend, though, as we also have a .NET client API that you can use for accessing the repository from .Net applications.

### JavaScript/TypeScript

Frontend components for the web are written in JavaScript/TypeScript. We have also created React building blocks you can use for example for icons, view and list controls or search.

### Do you *have* to use .NET or JS in your project?

Absolutely not. We have an OData REST API that you can use directly for manipulating content from your preferred language, so you can even avoid both .NET and JS if you want. Just install the Content Repository and some optional background components, and develop the frontend in the language you prefer.

## Tools for your needs

The backend gives you a solid and reliable base with readymade extensions on which you can rapidly build a UI and related functions the way you want to, using our frontend client components and related libraries.

### The basics

After installing the [Services component](https://github.com/SenseNet/sensenet), and can start sending requests to your site. It will provide you a unified service layer for content, the central Content Repository. It offers features like storing and managing content and meta data, content type and template system, versioning, or trash functionality.

Users can reach content through entry points like WebDAV, so they can map the repository as a remote drive, you can give them access through standard OData REST API from third party applications, or they can even open/edit files directly in Microsoft Office. Each content item is stored and can be moved within a tree structure that assigns a path to them. These paths can be used as links by the URL resolution of the site or sites set up in the Content Repository.

sensenet requires a full and always up-to-date index of the repository content. You can use our built in indexing and search engine based on Lucene 2.9, or you can create your own query and index implementations.

The Security component – that you can even use in 3rd party projects outside of sensenet – provides you a solution for managing permission entries for users, roles and groups in a hierarchical organization, with JWT and OAuth for industry standard authentication and authorization.

### Additional features

There are several backend components that extend the functionality of the Content Repository. Some support collaboration out of the box. Our Workspaces component gives you rich workspace elements like content types and content templates for collaboration. The Workflow component integrates the powerful Windows Workflow Foundation into your sensenet ECM. You can use it to build content driven workflows, such as the built-in Approval workflow. A separate Notification component allows users to subscribe to content changes and receive emails.

sensenet also gives you options in how you would like to store binaries (SQL, MongoDB), what already available logging or a messaging implementation to use, but you also free to integrate another solution that you prefer.

If you need to handle long-running tasks you can deploy our Task Management component that helps you manage operations in the background in a scalable way. sensenet also provides various toolsets such as retrying an operation multiple times or a robust trace component, performing synchronization between your Active Directory and the organization tree in the Content Repository and easy upgrade process for your installed packages.

### APIs everywhere

While there are many ways you can use sensenet, probably the most effective and rapid way to reach your goals is to install the central Content Repository with any components you need, and then build your solution around it by accessing and manipulating the content directly through our OData REST API or through other sensenet APIs. 

You have three options:

*	**JavaScript/Typescript client API** for browsers or mobile apps, with strong React/Redux and Aurelia support. Like the backend, the JS frontend also has a core client component for content manipulation. Though optional – as almost all components in sensenet – it is a good starting point for manipulating the Content Repository. Using the API instead of native JavaScript boosts your productivity and make client-server interaction a lot easier. With the JS client API you can easily create, load, modify, delete content, and execute custom actions. It also contains some predefined security and versioning related actions, response models, interfaces and abstracts.
*	**C# .NET client API** for accessing the repository from any .Net application, let it be a server or a client app. It exposes a completely async API so that you can use it in a resource-friendly way.
*	**Direct access** to our OData REST API with any other language.

The first two options let you work with sensenet by providing an API for the main content operations. They connect to the REST API, but hide the underlying requests. You can create or manage content, execute queries etc., instead of having to construct the requests yourself. Direct access gives more freedom, but more work to do as well.

### JavaScript client API extended

We have several other components extending the functionality of the client. With a separate component you can create typesafe client-side content queries with a fluent API that will be evaluated into sensenet core content queries. Another component gives you a library with content type and content schema definitions used by default in sensenet installations. A third one listens to completed or failed Content Repository events like creating, modifying, loading, deleting, moving or executing actions on content.

Another set of packages will help you build the UI and related functions. You can work in React and Redux or Aurelia, and have access to a collection of Material-UI supported UI components, controls, actions, async actions and more for sensenet. You might also opt for mapping third party controls to generated sensenet schemas by specifying relations between sensenet schemas and specified UI controls at content and field level and use them for automatized form generation.

The core client package bypasses authentication by default. If you need JWT authentication, just install and configure our package for it. We also have a Google Oauth2 authentication component ready for you to install on top of it.

We also have a collection of generic dev utilities containing helpers for disposable objects, a retrier, a method tracer and a simple value observer implementation. It is sensenet-independent, so it can be used in any project.

The document viewer component for sensenet lets your users view documents and images in any modern browser on PCs, tablets and mobile phones, with paging, zooming, rotation, commenting and other document management functions.

## Gives you freedom and and a clear future [what...? XXXXXXXXXXXXXXXXX] 

sensenet offers you freedom in planning your project, and supports your decisions on the long run. Besides using our built-in or example implementations we made sensenet ready for many types of external providers. You can integrate your preferred 3rd paty solutions for authentication, messaging, logging, tracing, storing binaries, and others.

Installing only the parts you need also keeps maintenance and upgrade costs at minimum. We publish many small packages with a minimal set of libraries and content. Our [NuGet]( https://www.nuget.org/profiles/sensenet), and [npm](https://npmjs.com/search?q=sensenet) packages (the latter with the @sensenet scope) can be installed and upgraded at your convenience with their package managers. Since sensenet is open source, you are more than welcome to contribute and create your pull requests on [GitHub](https://github.com/SenseNet).

sensenet, and the company behind sensenet is very successful in all verticals, including finance, public sector, energy and utilities, telco, aerospace and many others, with over [300 deployment](https://www.sensenet.com/references).

sensenet is a live product with proven history and a clear future. It is modern, transparent and transitioning. Have a look at our upcoming plans in our [roadmap](https://www.sensenet.com/roadmap).
