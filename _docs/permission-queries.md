---
title: "Permission queries"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/permission-queries.md'
category: Development
version: v7.0
tags: [permission, security, api, queries, search]
description: "The permission query API in sensenet lets developers access information in a huge permission structure very fast."
---

# Permission queries

sensenet has a flexible [Permission System](permission-system) for controlling the accessibility of content on different levels. You are able to set permissions (allow or deny) for individual users or groups, for individual documents or whole libraries and workspaces. To be able to visualize the permission settings we created a **C#** and [OData REST API](odata-rest-api) for querying the settings that developers and portal builders can use in custom solutions.

This article contains information for developers and portal builders about the sensenet API for *querying permission setting* in a subtree.

> To use this API the logged in user must have subtree *SeePermission* permission on the root content.

The API has a native **C#** implementation and a **Rest API** counterpart. The methods are the same, only the parameter types are different to make it more convenient for the actual use case. The C# API class name is: *PermissionQuery* in the *SenseNet.ContentRepository.Security* namespace. The C# methods and OData operations can be found below in this article.

> **Please note** that the current permission query API is very specific to certain permission queries. In the future there will be a lot more flexible API based on LINQ for developers to query security information directly from inner structures. Until then please take a look at the [original Permission queries wiki article](http://wiki.sensenet.com/Permission_queries) for diagrams and examples on the old API.

## Concepts
Using this API developers can display a complex structure that represents the permission settings in a subtree. The displayed structure depends on the concept that you choose. There are two concepts that are determined by the parameter *explicitOnly*:

- **Explicit list**: The user wants to see all content that have any permission setting (allow, deny or break) for the selected identity in the selected subtree. This view can be used to modify the permission settings because the editor sees all explicit permission settings in the permission tree that are related to the selected identity. 
- **Effective list**: The user wants to see all permitted (or denied) content for the selected identity. This view gives you an overview of permission settings because the editor sees all content with their effective permissions.

> Currently only the **explicit list** concept is implemented.

## Security query API
To see the currently available methods and responses along with sample diagrams, please head over to the [original Permission queries wiki article](http://wiki.sensenet.com/Permission_queries).

> A new security query api is coming soon.