---
title: "Sharing API"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/sharing-api.md'
category: Development
version: v7.0
tags: [sharing, permission, security, api]
description: "The sharing API lets developers manage content sharing information. It handles all necessary permission settings under the hood."
---

# Sharing API
sensenet has a generic [Sharing](sharing) feature that lets users share content (individual documents or a whole subtree like a workspace) with other - both publicly or privately.

To learn more about the concepts of sharing please visit the link above. This article is for *developers* about how to manage sharing from .Net code.

> To see the available sharing OData actions for the client side please visit the [Built-in OData actions and functions](built-in-odata-actions-and-functions) article.

## Storage
Sharing information consists of two things:

- **sharing data**: these records are stored on the shared content. They contain who the content was shared with and by whom, on which level and when.
- **permissions**: these are security entries of type *Sharing*, handled by the security subsystem. When it comes to permission evaluation these are taken into account the same way as normal entries.

You **cannot edit these things manually**. The sharing API will handle all the necessary changes for you. The only entry point you should use is the sharing handler on the Content or the content handler object.

## Sharing handler
You can manage sharing information on a content through the sharing handler object.

Get the current list of sharing records:

```csharp
var items = myContent.Sharing.GetSharingItems();
```

You cannot modify the sharing records provided by the API above, they are read-only. To manage sharing information please use the methods below.

Add or remove sharing:

```csharp
myContent.Sharing.Share("email@example.com", SharingLevel.Open, SharingMode.Private);

// The sharing id is the unique identifier of one of the 
// sharing records above.
myContent.Sharing.RemoveSharing(id);
```

The *Share* and *GetSharingItems* methods above return sharing data item(s). In the following sections we list the contents of that object.

## Sharing data
### Sharing token
A token defines with whom we want to share the content. In most cases this will be an email address, but it can be a username, user content id too.

> It is possible that in the future this can be a group id too to aid group sharing.

### Identity
When we call the *Share* method, the system tries to find a known identity for the token. If it succeeds (e.g. finds a user or group), it fills the *Identity* of the sharing data with that id.

In case of *public sharing* the identity will be filled with the id of the newly created sharing group (see below).

> Please note that the sharing record received by the caller of the methods above may not contain user or group ids **if the caller does not have permissions** for them. In that case they will see the id of the *Somebody* placeholder user in the sharing record.

### Sharing level
When we share a content we can define the 'permission set' we want to allow the target user. For example a read-only access is represented by the *Open* sharing level. If we want to let users modify the content, that requires the *Edit* level. These levels are predefined, you cannot add new ones currently.

### Sharing mode
There are three sharing modes in the system that determine who will get permissions to access the content. The set of permissions are defined by the sharing level above.

* **Private**: the user identified by the token will get *explicit permissions* to the content.
* **Authenticated**: the *Everyone* group will get permissions to the content, which means that every logged in user will have access to the content - but not visitors.
* **Public**: anybody with the link will be able to access the content, without even signing in. The permission entry will be created for a *sharing group* (see below).

> The advantage of *private* and *authenticated* sharing (over *public* sharing) is that it lets users not just access the content through the sharing link: they can also *query* for content shared with them. This lets them access shared folders and documents by *browsing*, not just visiting them directly.

##### Sharing groups 
When we share something *publicly* (see above), the system creates a special **sharing group** dedicated for that particular content and sharing level. The group is created as a [local workspace group](workspace-local-groups) if possible. If the content is not under a workspace than a global group will be created under the *Sharing* domain. This means that there can be multiple sharing groups for a single content: **one group per content per level**.

When a request containing the **sharing id** related to this group arrives, the system puts the user into the sharing group *temporarily* (for the lifetime of the request) using the [membership extender](permission-api) technology.

This design makes sure that if a content is shared publicly and somebody clicks on that share link, they will have access only to that particular content and only on the level intended by the owner.

### Creator
The *CreatorId* property refers to the user who was logged in at the time the sharing record was created.

### Sharing date
The date when the sharing record was created.

## Notification formatter
Substituting parameters is also configurable by developers by implementing the _ISharingNotificationFormatter_ interface and configuring the provider.

```csharp
public class MySharingNotificationFormatter : ISharingNotificationFormatter
{
    public string FormatSubject(Node node, SharingData sharingData, string subject)
    {
        // default implementation: static subject
        return subject;
    }

    public string FormatBody(Node node, SharingData sharingData, string siteUrl, string body)
    {
        // TODO: construct a url that points to the content,
		// add optional parameters and format the body.
    }
}
```