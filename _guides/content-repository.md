---
title:  "Content Repository"
tags: [content, content repository]
description: A content repository is a store of digital content with an associated set of data management, search and access methods allowing application-independent access to the content rather like a digital library, but with the ability to store and modify content in addition to searching and retrieving.
permalink: /guide/content-repository
index: 1
---

## Content Repository

A content repository is a store of digital content with an associated set of data management, search and access methods allowing application-independent access to the content rather like a digital library, but with the ability to store and modify content in addition to searching and retrieving. The sensenet Content Repository (SNCR) forms the technical underpinning of sensenet. It gives structure to unstructured content as the logical storage facility. It is the container of content (individual blocks of information) that also provides the service layer to manipulate (add, copy, move, delete, etc.) it.

The Content Repository is basically a tree structure of the various stored content. A specific content is identified by a unique id and also by its path in SNCR.

### Content Repository and the type system

The sensenet Content Repository is built upon a metadata system with pre-defined base types and type inheritance support. Content stored in SNCR can have different types, but content can be one type at any one time. A content type defines the properties (fields) and behavior of content. Content type definitions are also stored as content in the repository. They are located in the /Root/System/Schema/ContentTypes folder. To sum it up, the SNCR relies on the type system that - from the storage perspective - defines the reusable set of fields for each content type. You can also add extra fields to a certain content (apart from the fields in its type) through aspects.

### Metadata indexing for fast search and filtering

Content in the SNCR are indexed using the Lucene indexing and search library. The text of binary documents (Micosoft Word, Excel, Adobe PDF, etc) is extracted and can also be searched in SNCR. Lucene provides extremely fast query results even on big (over 10 million content) repositories.

### Content access and url resolution

Every content in SNCR is identified by its unique Id and its Path. You cannot change a content id, but you can move a content to another folder and thus change its path. The tree structure of the SNCR makes it possible to use the path as a link to the content, and thus the individual content can be addressed by their root-relative or site-relative paths as URL links. For example a root-relative /Root/Sites/DefaultSite/My-folder/My-file.docx content can be addressed as My-folder/My-file.docx if your browser points to a url that is registered on the Default_Site.

### Managing sensenet Content Repository

In an ECM system the most frequently used operations are searching, reading and writing content in the content repository. Document libraries in workspaces, custom forms, pictures in image libraries are all stored and managed in the one and only big tree of sensenet Content Repository. If you want to have an overview of the whole tree structure (similarly to Windows Explorer or OSX Finder) you can use the administrative GUI of sensenet, the Content Explorer (this is available only if you have the WebPages component or the full sensenet 6.5 product installed).