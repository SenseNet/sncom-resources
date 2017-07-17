---
title:  "How to make your life infinitely better - sensenet CTD's"
author: herflis
image: "/img/posts/goals.jpg"
tags: [content, content type, content type definition, CTD, aspect, content list, expando fields, document management]
---

Dynamic Content Type system sounds amazing, but what does it actually mean? Followings try to clarify the basics and show you how can you take advantages of sensenet ECM's Content Repository as the new home of your custom company data.

---

![Content, content everywhere](/img/posts/content-everywhere.jpg)

[Everything is a content](/blog/2017/07/12/everything-is-a-content), not only in sensenet ECM but in our everyday work. Tasks, documents, memos, invoices, emails, contacts, etc. However digitalized content could make our life easier, this content items can be so diverse that they are usually placed in separate systems. So if we're searching for a contact, we have to check the company's CRM system and login to our intranet site in the same time to share it with our collegues. Why are this things usually stored in separate systems? On the one hand, due to the different metadata, on the other hand because they need custom care, custom functionality. 

Since [everything, tasks, memos and even users are Content in sensenet ECM](/blog/2017/07/12/everything-is-a-content), managing them and working on them collaboratively can be done at one place in the same system through the same API or ui. Even though they are stored in the same system, content can have a lot of different metadata and can be handled by unique content handlers to grant for example approval process or notify users about changes. sensenet ECM helps you customizing metadata and content-handling in several ways, you can define or override top-level Content Types if you want to use them system-wide (e.g. a custom User type), or you can add custom metadata for content items that are stored in a specific library (e.g. list of contracts).

Let's now look under the hood to see how above mentioned things can be done in sensenet ECM.

### Content Types as a key of managing content in sensenet ECM

In sensenet ECM Content Types are also stored in the Content Repository tree as content ([Everything is a content](/blog/2017/07/12/everything-is-a-content), you know). While content items contain fields Content Types are built-up by field definitions. Managing them could be done through the same ui, you can create new ones like you add other type of content. If you create a new Content Type it can be used everywhere in your portal (where it is enabled as an allowed type of course, but it can enabled on every level of the repository). This way you are able to define the main group of types for your intranet which will be the basis of your EMC's type system. There are lot of built-in types in sensenet ECM (e.g. for Folder, Document, Library, Workflow, User) which are a perfect starting point for creating custom ones.

Why are Content Types the key of managing content? To oversimplify somewhat it is because they hold information about what type of metadata can be stored on a content and how it will be handled by the system. But they contain not only the handler and field definitions, but lots of other things like how this fields will be rendered on the ui when you are editing a Content, which fields will be validated and how, etc.

### The Content Type tree

![Content Type Tree](/img/posts/content-type-tree.png)

Tree srtucture helps us to understand the hierarchy, the connection between Content Types and let us take advantages of inheriting and overriding. If you're familiar with Object-oriented programming it is quite easy to get it but if you're not, think about it as cat breeds and their similiarities and differencies. All of them are cats eventually, they have four legs, they are sleeping and purring all the time, but they can have a different colour or type of fur and different nutritional or caring needs. So if you have a custom document type, for example for contracts you can easily inherit it from the built-in Document type. So that it will have all the built-in fields that are defined on Document type (e.g. Name, Size, Binary), but can have custom ones too (e.g. Reponsible Person, Date of signature). Basically the contracts will be handled as Documents in the system but in addition you can define custom logic behind them to complete the built-in one.

### Creating custom Forms or Surveys

Since managing content is based on defining fields in Content Types and configure how they will be rendered and validated on the ui, this behaviour can be used as a base of custom form and survey building. If a user fill out the form, actually she creates a new content, a form item. If you want to create a survey you only have to add a new a custom Content Type defining the fields of the form item. Incredibly easy, isn't it? Survey items will be saved as Content in the repository so they can be searched by their field values, evaluated easily or you can even build custom ui upon the results (lists, charts, etc).

### If Content Types Definitions are not flexible enough

#### Customizing metadata as a non-developer

What if you have different kind of contracts for each organization in your company with different metadata and different workflows in the background. You also want to let your non-dev colleagues managing the contract types because they can only be seen and open for the organization members. Creating a custom Content Type for all the different contracts is not worthy because you would create tons of Content Type Definitions and only use them once. On the other hand the organization members are maybe not enough qualified to create custom Content Types and they also don't have the permissions to do that. In this case expando fields provided by sensenet ECM are a great solution. You only have to create a new List and add and customize new columns as fields by a few click. This expando fields are not persisted on Content Types, so they can be used only locally on a list.

![Expando fields](/img/posts/expando-fields.png)

#### Aspects

Sometimes you need not only an individual custom field but a group of fields (e.g. rating related ones) that has to be used on multiple type of Content as one. sensenet ECM provides a solution for this case with Aspects so you do not need to define all fields on by one on a type but you can define an Aspect that holds the neccessary fields and configs and attach it to a Content. For now unfortunately working with Aspects is a developer task because it needs some coding, but sensenet ECM is also a development platform, the API is ready to working with Aspects...and you know, sensenet ECM is open source, so maybe you are the one who will save the world with an Aspect editor! ;)

#### Content Templates

Working with Workspaces could be tough if you have multiple Workspaces with the same metadata but you need custom content structure below them. Building folder and library structure and set everything after every Workspace creation over and over definitely would be nightmare. Fortunately sensenet ECM has a solution for that, Content Templates. It helps you to build a children library structure for your types that are created automatically on Content creation.

Want to know more about sensenet ECM and its capabilities (not only in the case of Dynamic Content Type System)?

- [Try it](https://www.sensenet.com/try-it) – without installation
- [Check the top use cases](https://www.sensenet.com/for-customers/use-cases) – how others use sensenet ECM
- [RTFM](/docs)