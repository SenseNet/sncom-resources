---
title: "Sense/Net 6.5.3 Community Edition"
author: augusztino
image: "/img/posts/light.jpg"
tags: [release, community edition, new features]
---

A new public Community Edition is available for Sense/Net ECM! As always, we offer new features and many bug fixes

---

Please review the changes and new features and give a feedback on [our forum](http://forum.sensenet.com/>)!

## Main new features

-   Speedup: indexing and security activities
-   Customizable content naming
-   Login through OData

## Speedup: indexing and security activities

This is a huge improvement for projects where there are many activities happening in the Content Repository at the same time: in previous versions the indexing subsystem handled all operations in a single queue, making completely independent operations wait for each other. This is not the case anymore: our improved activity queue is able to execute independent activities in a parallel way so that users will get a faster response.

## Customizable content naming

Finally, developers get the chance to customize the behaviour of the system when a content name must be generated (e.g. from the display name or when you upload a document). We offer two built-in [content naming providers](http://wiki.sensenet.com/ContentNamingProvider) for you to choose from, but of course you can develop your own too.

-   [Content naming](http://wiki.sensenet.com/Content_naming>)

## Login through OData

This is a first step toward a more open content repository: now it is possible to log in to the portal through our [OData REST API](http://wiki.sensenet.com/OData_REST_API>). This is useful for custom mobile applications or 3rd party portals that want to access the Content Repository using [cross-origin ajax calls](http://wiki.sensenet.com/Cross-origin_resource_sharing>).

-   [Login action](http://wiki.sensenet.com/Built-in_OData_actions_and_functions#Login_action_-_from_version_6.5.3>)

## Give it a go!

To download Sense/Net 6.5.3 Community, [click here](http://sensenet.codeplex.com/releases/view/620127)!

 

