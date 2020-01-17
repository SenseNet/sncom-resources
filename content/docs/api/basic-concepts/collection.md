---
title: "Collection"
index: 2
---

# Get children of a content

## Addressing children of a content (collection)

Service path followed by the site relative path of the container.

```http://www.example.com/OData.svc/Root/Content```

It returns child content of /Root/Content as a collection.

[comment]: # (Example here - REST, .NET, JavaScript, Reactjs)

## Addressing the count of a collection

Returns the count of items in the requested collection. The value depends on other query string parameters ($top, $skip, $filter, query, etc.) and does not depend on the $inlinecount parameter.

[comment]: # (Example here - REST, .NET, JavaScript, Reactjs)

This returns with a raw integer value.

## $inlinecount query option

This option controls the `__count` property that can be found in every collection response. Its valid values are: `allpages` and `none`.

**allpages**: count of the whole set (filter, top, skip options are ignored)  
**none**: result shows the actual count of items (`__count` property is not hidden)

Other value causes error. This query option is optional, the default value is `none`.