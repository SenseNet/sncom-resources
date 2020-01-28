---
path: "/api-docs/basic-concepts/collection"
title: "Collection"
index: 2
---

# Get children of a content

The requested (parent) resource can be any content in the repository that is permitted for the current user. The resource may be addressed with a content's Path. It returns with a list of entities and all their properties.

If the requested (parent) resource is not found, the server returns with a 404 Error status code.

## Addressing children of a content (collection)

Service path followed by the site relative path of the container returns child content of the requested parent as a collection.

[comment]: # (Example here - REST, .NET, JavaScript, Reactjs)

## Addressing the count of a collection

Returns the count of items in the requested collection. The value depends on other optional query string parameters ($top, $skip, $filter, query, etc.) and does not depend on the [$inlinecount]() parameter.

[comment]: # (Example here - REST, .NET, JavaScript, Reactjs)

This returns with a raw integer value.

## [$inlinecount query option](#inlinecount)

This option controls the `__count` property's value that can be found in every collection response. Its valid values are: `allpages` and `none` (other value causes an error, default value is `none`).

**allpages**: count of the whole set (filter, top, skip options are ignored)  
**none**: result shows the actual count of items (`__count` property is not hidden)

[comment]: # (Example here - REST, .NET, JavaScript, Reactjs)