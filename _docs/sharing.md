---
title: "Sharing"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/sharing.md'
category: Concepts
version: v7.0
tags: [sharing, permission, security]
description: "Sharing content with other users is a great way to boost the productivity of an application. In this article we describe how sensenet users can share documents or even whole workspaces with each other or even with the public."
---

# Sharing
Sharing in sensenet (like many other features of the [Content Repository](content-repository)) is built around the concept of [content](content). As sensenet content items are stored in a huge tree, it is easy to share not only a single content (like a document) but a whole folder or a workspace with other users.

In this article you'll learn about the different modes and levels you can share content in sensenet.

## Who do I share with?
It is not necessary to know much about the user you want to share a content with if they are already registered in the system: an **email address** or a **username** is enough. In the future there will be more options, like picking a user or a group from the repository.

In case of *Public sharing* (see below) it is not even necessary to provide an email: it is enough to simply generate a public sharing link that you can send or post anywhere.

### Notifications
When you share something with an email address or a known user, we will send a notification email. It will contain a **sharing link** that the user will be able to follow to access the content. About forwarding this email to others please see the *Sharing modes* section below.

> It is possible switch sharing ON or OFF globally or for a subtree and customize notification emails. See the *Configuration* section below for details.

## Sharing levels
When you share something, you will be presented with an option for what do you want your target users to do with the content. For example a read-only access is represented by the *Open* sharing level. If we want to let users modify the content, that requires the *Edit* level.

> More sharing levels are coming later.

## Sharing modes
There are three sharing modes that determine who will get permissions to access the content. 

#### Private
The system tries to find a known user for the email you provided. If it finds them, the user will get *explicit permissions* to the content - and nobody else. If the user forwards the email with the sharing link in it to others, it will be useless for them, unless they log in to the system with the target user's credentials.

#### Authenticated
Every *logged in user* will have access to the content - but not visitors (technically the *Everyone* group will get permissions to the content). This makes the link received in the notification email *shareable*, so it can be forwarded to co-workers for example.

#### Public
Anybody with the link will be able to access the content, without even signing in.

> The advantage of *private* and *authenticated* sharing (over *public* sharing) is that it lets users not just access the content through the sharing link: they can also *query* for content shared with them. This lets them access shared folders and documents by *browsing*, not just visiting them directly.

It is perfectly fine if you want to have multiple sharing links, let them be private or public. This lets you manage access more easily by removing sharing for some users and keep access for others.

## Removing sharing
By deleting sharing records (either from the UI or using the [Sharing API](sharing-api)) the previously sent sharing links will no longer work and the users will not have access to the previously shared content.

## Repository changes
What happens when something that is related to a shared content or a user changes?

#### A user is deleted
All sharing information and permissions related to them will be removed.

#### A new user is created or an existing user gets an email address
If there are *private* sharing records with this email and *no identity*, we will give explicit permissions for the new user on that content. This is to make sure that if a user registers to access a content that was shared with them privately, they get a seamless user experience.

#### A shared content is deleted to the Trash
This is a special case when a content is not yet physically removed from the system, only deleted to the Trash. For existing users this won't change much, they will still be able to access the content the same way as any other content.

For *public* sharing this is different: **visitors will no longer access those content items** - unless the documents are restored from the Trash. In that case the old public sharing links will still be working.

## Configuration
You can switch ON or OFF the feature or customize the notification emails using the *Sharing* settings.

##### Sharing settings 

> /Root/System/Settings/Sharing.settings

Having different mail subjects and bodies per subtree is possible, because the keys themselves (see below) are coming from settings.

```json
{
   "NotificationEnabled": false,
   "NotificationSender": "info@example.com",
   "NotificationMailSubjectKey": "NotificationMailSubject",
   "NotificationMailBodyKey": "NotificationMailBody"
}
```

##### Default string resources 

> class: _Sharing_

```txt
NotificationMailSubject (static)
NotificationMailBody (params for link and sharing level)
```

Substituting parameters is also configurable by developers. See details in the [Sharing API](sharing-api) article.