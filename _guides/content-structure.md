---
title:  "Structure"
tags: [content, content repository, structure, tree]
description: Content structure
permalink: /guide/content-repository/content-structure
index: 2
---

## Structure

The Content Repository is basically a tree structure of the various stored content. A specific content is identified by a unique id and also by its path in SNCR. The root of SNCR is at the */Root* path, all other content is placed somewhere under this root content - for example the login page for the default site is placed at */Root/Sites/Default_Site/login*. The default structure is organized as follows (only the main folder structure is listed here):

- Root - this is the root of the tree structure. If you click on it in Content Explorer you will get a link summary page where the most common administrative functions are listed (Root Console)
- (apps) - top level (apps) folder containing the global applications for various Content Types
- ContentTemplates - folder containing Content Templates: pre-defined default values and structures for Content Types
- Global - the global resources of the portal. Requested skin resources will fall back to these Content if not defined in the current skin
    - celltemplates
    - contentviews
    - fieldcontroltemplates
    - images
    - pagetemplates
    - plugins
    - renderers
    - scripts - JavaScript files
    - styles - Css files
- IMS - folder containing Domains, Organizational units, Groups and Users in a hierarchical tree structrure
- Localization - resource files with multi-language text content for Localization
- Portlets - folder of installed Portlets
- Sites - container of defined sites
    - Default_Site - demo site
- Skins - container folder for Skins
    - empty - an empty skin for creating new skins
    - sensenet - default skin and resources of demo site
- System - system related Content
    - Devices - contains Device content which can help you to create specific application pages to display the same content on different devices (e.g. tablet, mobile)
    - errormessages – contains customized site specific html files to display exception messages (the files are grouped in folders by site)
    - Renderers - some renderers used by the base system
    - Schema
    - Aspects - container for Aspects
    - ContentTypes - container for Content Types
    - Settings – contains global Settings
    - SystemPlugins - resources of base system applications
    - WebRoot - container for system handlers/pages, with automatic redirection from ‘/’ path (see WebRoot Folder for details).
    - Workflows – container for workflows
- Trash - container of deleted Content (Trash)