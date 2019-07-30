---
title:  "Content"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/concepts/content.md'
category: Concepts
version: v7.0.0
tags: [content, content repository] 
description: A Content is the basic block for storing information in sensenet. A Content can be any kind of data, users, documents, memos, tasks, text files, etc. are all referred to as content in the portal.
hidden: true
---

# Content

A Content is the basic block for storing information in sensenet. A Content can be any kind of data, user, document, workspace, memo, task, etc. Using content items everywhere unlocks a great deal of exceptional features that make your experience as a user more seamless, and your job as a developer a lot easier. 

## Where can I find these content?

The foundation of sensenet is the Content Repository, where documents, tasks, users, projects – everything is a Content. It is the fundamental building block of the system that makes content management easy and powerful at the same time. The Content Repository is basically a tree structure of the various stored items. 

A specific Content is identified by a unique id and also by its path in the Content Repository - the relative path to the root content. The root of the Content Repository is a content at the /Root path, and all other content is placed somewhere under this root content - for example the user and group content items are placed at /Root/IMS.

![Content tree](/img/admin-ui-content.png "Content tree")

// Explore content in your repository through the admin surface

## How should I imagine a Content?

Every Content is built up of Fields (a user Content for example has a *name* field and *password* field among others). Different types of content can be created by defining a different set of fields. The type of the Content is called the Content Type and defines the set of fields a Content possesses and also the behavior of it. 

// register and create a repo discover content types

## How can I store/browse my data?

sensenet's administrative surface provides a handful of tools to manage content. You can create new content of the defined Content Types and fill their fields with data, you can define new Content Types of any kind, you can copy, move, delete, rename content and upload/download files into/from the Content Repository.

## Accessing content through the REST API

With sensenet Services layer, you do not need a UI to manage content at all, because you can access your content in the repository through our REST API.
// link to rest api docs