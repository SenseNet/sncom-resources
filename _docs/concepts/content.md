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

Content is the basic block for storing information in sensenet. A content can be any kind of data, user, document, workspace, memo, task, etc. Using content items everywhere unlocks a great deal of exceptional features that make your experience as a user more seamless, and your job as a developer a lot easier. 

## Where can I find these content?

The foundation of sensenet is the content repository, where documents, tasks, users, projects – everything is a content. It is the fundamental building block of the system that makes content management easy and powerful at the same time. The content repository is basically a tree structure of the various stored items. 

A specific content is identified by a unique id and also by its path in the repository - the relative path to the root content. The root of the content repository is a content at the /Root path, and all other items are placed somewhere under this root content - for example the users and groups are placed at /Root/IMS.

![Content tree](/img/admin-ui-content.png "Content tree")

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        <a href="/docs/tutorials/explore-1000-content-demo-repository/#adminui">Explore a demo repository</a> with tons of demo content on the admin surface</a>.
    </p>
</div>

## How should I imagine a Content?

Every content is built up of fields (a user content for example has a *name* field and *password* field among others). Different types of content can be created by defining a different set of fields. The type of the content is called the ```content type``` and defines the set of fields a content possesses and also the behavior of it. 

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        <a href="https://sensenet.com/sign-up">Register an account and create a repository</a> to discover content types.
    </p>
</div>

## How can I store/browse my data?

sensenet's administrative surface provides a handful of tools to manage content. You can create new content of the defined content types and fill their fields with data, you can define new content types of any kind, you can copy, move, delete, rename content and upload/download files into/from the content repository and many many more.

## Accessing content through the REST API

With sensenet services layer, you do not need a UI to manage content at all, because you can access your content in the repository through our REST API. The requested resource can be any content or children of a content in the repository that is permitted for the current user. 

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        Take the next step become familiar with <a href="/docs/concepts/content-management-through-rest-api"><strong>Content management through REST API</strong></a> or complete one of the <a href="/docs/tutorials"><strong>tutorials</strong></a> and create your first client app built upon sensenet.
    </p>
</div>