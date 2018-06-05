---
title:  "Content"
tags: [content, content repository]
description: A Content is the basic block for storing information in sensenet. A Content can be any kind of data, for example users, documents, memos, tasks, text files, etc. are all referred to as content in the portal. Any content can be created, edited, copied, moved or deleted easily.
permalink: /guide/content-repository/content
index: 0
---

## Content

A Content is the basic block for storing information in sensenet. A Content can be any kind of data: for example users, documents, memos, tasks, text files, etc. are all referred to as content in your app or site. Any content can be created, edited, copied, moved or deleted easily.

### Where can I find these content?

Content are stored in the Content Repository - the storage layer of your project. The Content Repository is basically a tree structure of the various stored content of your app. A specific Content is identified by a unique id and also by its path in the Content Repository - the relative path to the root content. The root of the Content Repository is a content at the /Root path, and all other content is placed somewhere under this root content - for example the login page for the default site is placed at */Root/Sites/Default_Site/login*.

### How should I imagine a Content?

Every Content is built up of Fields (a user Content for example has a name field and password field). Different types of content can be created by defining a different set of fields. The type of the the Content is called the Content Type and defines the set of fields a Content possesses and also the behavior of the Content. The set of fields the type defines is reusable, meaning different types can be created by deriving from already defined types and the newly created type will obtain the fields of its parent type. For example: a File Content has - among a couple others - a name Field for storing the name of the file and a binary Field for storing the binary data of the file, and an Image Content (whose type is a child type of the File Content Type) also have a name (for the name of the image) and a binary Field (for the image pixel data) and a couple of other fields, too - that a simple File does not contain: Keywords (for making the image searchable), DateTaken (for storing the info of when the picture was taken in case it is a photo), etc.

### Accessing content through the REST API
In case you have only the core Services layer installed, you do not have a UI at all, but you can still access your content in the repository through our REST api.

### Examples

The following are some example content in the Content Repository:

- */Root/YourDocuments/PressRoom/SenseNet6-Logos.pdf*: this is a PDF format File. You can upload / download files like this in Content Explorer.
- */Root/YourDocuments/PressRoom*: this is the Folder containing the above PDF. You can create folders anywhere in Content Explorer.
- */Root/Global/images/logo_portalengine.gif*: this is an Image. When you browse it, you will see the image itself. When you edit it, you can set the values of the fields of this content.
- */Root/Sites/Default_Site/infos/features/calendarinfo*: this is a WebContentDemo content specially created to hold information of the yellow info boxes visible on the demo site. This particular content stores the text that is displayed at the Event Calendar feature of the demo site.
- */Root/IMS/Demo/Managers/alexschmidt*: this content is a User. The login name of the account it represents is alexschmidt, and the password can be set by editing this content and setting the value for the password field.
- */Root/IMS/BuiltIn/Portal/Administrators*: this is a Group for the administrators of the portal. Users can be added to this group by editing the group and adding them to the members field. Anyone included in the members list will have administrator privileges on the portal.
- */Root/Sites/Default_Site/login*: this is a simple Page that is displayed when you are not logged in but you need to be logged in to browse the requested content.
- */Root/System/Schema/ContentTypes/GenericContent/File/Image*: this is a ContentType describing the structure and behavior if Image Content Types. As you can see, the Content Type is a content itself.