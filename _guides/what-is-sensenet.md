---
title:  "What is sensenet"
tags: [intro, concepts, use cases, dms, intranet, document management, mobile app]
description: Introduction to sensenet
permalink: /guide/introduction/what-is-sensenet
index: 0
---

## What is sensenet

sensenet is an open source content services platform written in .NET for developers and development companies. Its enterprise grade security and permission system makes it a perfect core of any content management solution, so you only need to focus on business logic.
You can build single-page apps using your favourite JS framework without steep learning curve and access each and every content easily through OData REST API. Additionally, any 3rd party service can be integrated into sensenet, so the possibilities are infinite.

## Use cases

As a development platform with a capable content repository, sensenet could satisfy a wide variety of business needs.
From company intranet to mobile app, you can develop your own solution, focusing only on business logic and leave the rest to a stable system in its core. See below some examples of what can be achieved with sensenet.

### Document Management
sensenet has robust document management capabilities that enables you to get the most out of your digital work environment. For many companies, the focus of document management is on the storage and organization of documents. They want to be able to store documents in a secure and organized way that still allows content to be found easily. Learn about features and functions built for sensenet to make document management reliable and easy to use.

- permission system
- indexing and search
- version control
- Microsoft Office integration
- custom workflows
- document preview

### Company intranet

The main purpose of an intranet is to share company information and increase the collaboration among employees. sensenet, with its document management capability and enterprise grade permission system is ready to form the core of any collaborative workspace which can be tailor made to specific needs. Sharing documents, defining organizational groups and custom workflows are all ready for you.

### Public website

With sensenet you are able to build public websites easily even by using JS frameworks. You can create single-page applications with little or no back-end related development, sensenet handles all the rest for you. All features, including document management, permission system and custom workflow are accessible, so you have much more possibility than using a simple CMS solution. You can also connect any 3rd party service to the system using APIs already available in sensenet.

### Mobile app

Thanks to multiple connection possibilities by APIs, mobile app development is also possible with sensenet. Build your app on your favourite platform and use sensenet as a content repository behind your solution dealing with content requests, permissions and so on. 

## Everything is content

The foundation of sensenet is the Content Repository, where documents, tasks, users, projects, even system configuration – everything – is a Content. It is the fundamental building block of the system that makes content management easy and powerful at the same time. All content items are organized into a huge content tree, so when managing and presenting content, applying features like versioning, approval or permissions, you can always think in subtrees and inheritance.

Using content items everywhere unlocks a great deal of exceptional features that make your experience as a user more seamless, and your job as a developer a lot easier. Focus on the business problem – the platform handles the rest!

## CSP

Headless CMS
ECM
CSP

a development platform too

Component structure:
*Core layer.* Within this:
Services component. the core layer of sensene. all other packages are optional.
Includes: the main content repository with some basic built-in content types and some tools for administrative tasks. No UI.

Indexing absolutely needed, stored in the file system. Provided by... what, Services?

Messaging also?


*Feature packages* like the Search (search engine that works with the index ), WorkSpaces (predefined content types for workspaces and optional UI elements), Workflow (integrates the powerful Windows Workflow Foundation), Notifications (for users subscribed to content changes) or Task management (long-running background tasks) modules. Feature packages are not required. 


*Client SDKs*

Manipulate the CR.
Two ways: JavaScript (TypeScript) client API or .NET Client for sensenet that connects to the REST API.
JS client scoped! JavaScript (TypeScript) providing a Javascript client API



Providers. Features can even be substituted with your own solution. This means, for example, that instead of sensenet's own search module you can develop your own query and index implementation.
RabbitMQ prototype Create a messaging provider that is able to operate in the cloud. Or your own.
https://community.sensenet.com/docs/sensenet-components/
https://community.sensenet.com/blog/2017/09/27/new-sn7-components
XXXXXXXXXX



## Widespread

300+ references. https://www.sensenet.com/references

## Modern. Transitioning.

Frontend:React/Redux and Aurelia for sensenet field and view controls you can use in your applications

React
Simple, great support and community.
componentized, testable (and tested), easy to deploy, accessible and should meet the industry standards

Aurelia contain 
“A framework should get out of my way”
Quality and performance

JWT for authentication

Cloud
.Net Standard

you need devs
ODATA REST API
or anything of your choice

## Free or commercial. Your choice.

Freemium. No risk for you. Get to know it, play with it, even use for live projects if you wish. You get to know **everything** about sensenet before (if and at all) you pay for any service.

Best of both worlds. Free as in beer, free as in speech. And commercial

Community. Really free. Build a business. Sell your services. But: give back to the community.
You can check the code
You can contribute if you would like to change/add to it.

Enterprise. Why would you want it? You want to protect your code. Want get protection against lawsuits.

Company behind sensenet: Sense/Net Inc. Benefits. founded in 1995. A technology leader of .Net based document management platform.

https://techcrunch.com/2012/11/04/should-your-startup-go-freemium/?guccounter=1

## You need devs

Your devs.

Or hire us.

Server side: .NET

Frontend: JavaScript, TypeScript

REST: All the rest.

## High level structural overview

Components. Modular. publish our platform in small, separate components. Time to market quickly.

Anko: https://raw.githubusercontent.com/SenseNet/sn-resources/master/images/sn-components/sn-components_services.png,
Gyebi: https://twitter.com/Gyeby
https://community.sensenet.com/docs/sensenet-components/

CR: DB + Blob + index

security: auth, permissions

REST

client apis

## Convenient

Develop in the language you want. REST API. Language-independent.

Use packages
nuget: in the .Net world that is the de-facto standard for delivering libraries.  nuget.org to publish the bits of our ECM platform
npm. It is best if you install only the parts you need, so that you can keep maintenance and upgrade costs at minimum. This is why we publish many small packages containing only the minimal set of libraries and content.

Follow changes
patching easy

Nothing stops you from experimenting with the source code: https://github.com/SenseNet


## Reach us

stack for qs
github for issues

get notified: coderelease

Other channels:
gitter
twitter
facebook
