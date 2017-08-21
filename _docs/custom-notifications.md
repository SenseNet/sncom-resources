---
title: "Custom notifications"
source_url: 'https://github.com/SenseNet/sn-notification/blob/master/docs/custom-notifications.md'
category: Development
version: v7.0
tags: [api, notification, sn7]
description: sensenet ECM provides an easy-to-use Notification feature to allow users to subscribe to different events and receive mail messages about changes in the Content Repository. This article is for developers about customizing this feature.

---

# Custom notifications
sensenet ECM provides an easy-to-use [Notification](/docs/notification) feature to allow users to subscribe to different events and receive mail messages about changes in the [Content Repository](/docs/content-repository). 

The process of mail generation can be fine tuned using *NotificationConfig* files.

When an event occurs in the Content Repository, an email message is sent to all subscribers, immediately or in a digest message - depending on the frequency settings of the subscription. These email messages can be customized by placing a content of *NotificationConfig* content type under a system folder of the name *(config)*, at the desired place in the Content Repository. Resolution of these configurations pretty much works the same way as resolving applications in the [Smart Application Model](/docs/smart-application-model). Here is an example structure for placing NotificationConfig content in the Content Repository:

- Root
  - Sites
     - Default_Site
       - (apps)
       - (config)
         - NotificationConfig

This way every email about changes below the *Default_Site* will be controlled by the NotificationConfig content placed in the (config) system folder. The **name** of the configuration content **must be NotificationConfig**.

> A NotificationConfig content can control the outlook of separate emails and therefore it currently *does not support digest mode emails*. Any email about a change under a path controlled by a custom NotificationConfig content will be sent separately, even if the subscription is for digest emails.

### NotificationConfig fields
All NotificationConfig content has the following fields:

- **Subject**: defines the subject of the email to be sent. {FieldName} templates are supported, they will be replaced by the appropriate field value of the changed content.
- **Body**: defines the body of the email to be sent. {FieldName} templates are supported.
- **SenderAddress**: defines the address of the sender of the email to be sent. This parameter is optional, if left empty, the default value will be used that is set as NotificationSenderAddress in the Web.config file.

### NotificationConfig default operation
The following applies to the email sending procedure when an event is affected by a *NotificationConfig* content:

- emails about content that are in a subtree thet does not contain a notification config are generated with the [default templates](/docs/notification)
- NotificationConfig content at lower levels override those on upper levels
- the Subject and the Body of the emails are specified by the corresponding Fields of the NotificationConfig content. The provided *{FieldName}* templates are replaced with their corresponding Field data.
- the Sender of the emails is set to the SenderAddress specified by the NotificationConfig content (if not empty)
- emails about the changes of NotificationConfig files are not sent.

### Template resolution
You can use any dynamic property in a template that can be cast to a string, for example:

- Body: Content description is {Description}

You can also use string properties of referenced content, like:

- Subject: content changes by {CreatedBy.FullName}

Besides dynamic properties, the following basic properties are supported:

- Id
- Name
- Path
- DisplayName

### Custom NotificationConfig
You can create custom Notification configurations by creating a custom [Content Type](/docs/content-type) inheriting from *NotificationConfig*, and creating a custom [Content Handler](/docs/content-handler) for it. Within the Content Handler (that should derive from *SenseNet.Notification.NotificationConfig*) you can override the following base methods:

- **GetSubject**: creates a subject for the email message. The changed/created content is passed as a parameter.
- **GetBody**: creates a body for the email message.
- **GetSenderAddress**: creates a sender address for the email message.
- **IsNotificationAllowedForContent**: you can define whether an email message is to be sent for the provided content or not. The default implementation simply checks if the context is the NotificationConfig content itself and in that case it returns false - you can specify a complex decision logic here if necessary.

You can use the *ReplacePropertyValues* base method to use the built-in template resolution procedure.

See the example section below on how to create a custom NotificationConfig type and handler.

## Examples/Tutorials
### Customizing subject and body
This example shows how to customize the subject and the body of notification emails for Articles.

1. create a new *SystemFolder* with the name *(config)* under /Root/Sites/YourSite/Articles
2. create a new *NotificationConfig* content in the (config) folder
3. set the subject to Article: {DisplayName}
4. set the body to:

```html
Jump to Article: <a href="http://example.com{Path}">{DisplayName}</a>
<hr/>
{Subtitle}
{Lead}
{Body}
```

This way the emails sent about News Articles will have a customized subject and body, containing the different Field values of the Article, like DisplayName and Body.

### Differentiating by Content Type
The following example shows how to send customized notifications on content in the Content Repository (in this example content that can be commented and liked by users). Since Comments and Likes are also content in the Content Repository, notifications are also sent to users who have subscribed when they are created. These emails should look somewhat different from other emails.

- **1:** create a new [Content Handler](/docs/content-handler) inheriting from NotificationConfig. Create new strongly typed properties for defining the templates for subjects and bodies for Likes and Comments. Override the *GetSubject*, *GetBody* and *IsNotificationAllowedForContent* methods:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SenseNet.Notification;
using SenseNet.ContentRepository;
using SenseNet.ContentRepository.Schema;
using SenseNet.ContentRepository.Storage;

namespace MyHandlers
{
    [ContentHandler]
    public class PostNotificationConfig : NotificationConfig
    {
        /*================================================================================= Constructors */

        public PostNotificationConfig(Node parent) : this(parent, "PostNotificationConfig") { }
        public PostNotificationConfig(Node parent, string nodeTypeName) : base(parent, nodeTypeName) { }
        protected PostNotificationConfig(NodeToken nt) : base(nt) { }

        /*================================================================================= Mapped Properties */

        private const string LIKESUBJECTPROPERTY = "LikeSubject";
        [RepositoryProperty(LIKESUBJECTPROPERTY, RepositoryDataType.String)]
        public virtual string LikeSubject
        {
            get { return base.GetProperty<string>(LIKESUBJECTPROPERTY); }
            set { base.SetProperty(LIKESUBJECTPROPERTY, value); }
        }

        private const string LIKEBODYPROPERTY = "LikeBody";
        [RepositoryProperty(LIKEBODYPROPERTY, RepositoryDataType.Text)]
        public string LikeBody
        {
            get { return base.GetProperty<string>(LIKEBODYPROPERTY); }
            set { base.SetProperty(LIKEBODYPROPERTY, value); }
        }

        private const string COMMENTSUBJECTPROPERTY = "CommentSubject";
        [RepositoryProperty(COMMENTSUBJECTPROPERTY, RepositoryDataType.String)]
        public string CommentSubject
        {
            get { return base.GetProperty<string>(COMMENTSUBJECTPROPERTY); }
            set { base.SetProperty(COMMENTSUBJECTPROPERTY, value); }
        }

        private const string COMMENTBODYPROPERTY = "CommentBody";
        [RepositoryProperty(COMMENTBODYPROPERTY, RepositoryDataType.Text)]
        public string CommentBody
        {
            get { return base.GetProperty<string>(COMMENTBODYPROPERTY); }
            set { base.SetProperty(COMMENTBODYPROPERTY, value); }
        }

        /*================================================================================= Required generic property handling */

        public override object GetProperty(string name)
        {
            switch (name)
            {
                case COMMENTSUBJECTPROPERTY:
                    return this.CommentSubject;
                case COMMENTBODYPROPERTY:
                    return this.CommentBody;
                case LIKESUBJECTPROPERTY:
                    return this.LikeSubject;
                case LIKEBODYPROPERTY:
                    return this.LikeBody;
                default:
                    return base.GetProperty(name);
            }
        }
        public override void SetProperty(string name, object value)
        {
            switch (name)
            {
                case COMMENTSUBJECTPROPERTY:
                    this.CommentSubject = (string)value;
                    break;
                case COMMENTBODYPROPERTY:
                    this.CommentBody = (string)value;
                    break;
                case LIKESUBJECTPROPERTY:
                    this.LikeSubject = (string)value;
                    break;
                case LIKEBODYPROPERTY:
                    this.LikeBody = (string)value;
                    break;
                default:
                    base.SetProperty(name, value);
                    break;
            }
        }

        /*================================================================================= NotificationConfig */

        // gets the associated Post
        private Node GetPost(Node context)
        {
            var article = context.NodeType.IsInstaceOfOrDerivedFrom("Post") ? context : Node.GetAncestorOfNodeType(context, "Post");
            return article;
        }

        // defines two custom templates that can be used from the UI: {Post} for the Description of the Post and {PostPath} for its path
        private string ReplaceText(string text, Node context)
        {
            var post = GetPost(context);
            return text.Replace("{Post}", post.Description).Replace("{PostPath}", post.Path);
        }

        // returns the customized subject for the email, differentiating according to the Content Type of the changed/created content
        public override string GetSubject(Node context)
        {
            if (context.NodeType.IsInstaceOfOrDerivedFrom("Comment"))
                return this.ReplacePropertyValues(context, ReplaceText(this.CommentSubject, context));

            if (context.NodeType.IsInstaceOfOrDerivedFrom("Like"))
                return this.ReplacePropertyValues(context, ReplaceText(this.LikeSubject, context));

            return base.GetSubject(context);
        }

        // returns the customized body for the email, differentiating according to the Content Type of the changed/created content
        public override string GetBody(Node context)
        {
            if (context.NodeType.IsInstaceOfOrDerivedFrom("Comment"))
                return this.ReplacePropertyValues(context, ReplaceText(this.CommentBody, context));

            if (context.NodeType.IsInstaceOfOrDerivedFrom("Like"))
                return this.ReplacePropertyValues(context, ReplaceText(this.LikeBody, context));

            return base.GetBody(context);
        }

        // only Posts, Comments and Likes generate email notifications, nothing else
        public override bool IsNotificationAllowedForContent(Node context)
        {
            if (context.NodeType.IsInstaceOfOrDerivedFrom("Post") || context.NodeType.IsInstaceOfOrDerivedFrom("Like") || context.NodeType.IsInstaceOfOrDerivedFrom("Comment"))
                return true;

            return false;
        }
    }
}
```

- **2:** create a new Content Type that inherits from NotificationConfig and define the Fields for the properties given in the above Content Handler:

```xml
<ContentType name="PostNotificationConfig" parentType="NotificationConfig" handler="MyHandlers.PostNotificationConfig" xmlns="http://schemas.sensenet.com/SenseNet/ContentRepository/ContentTypeDefinition">
  <DisplayName>Posts Notification Configuration</DisplayName>
  <Description></Description>
  <Icon>Content</Icon>
  <Fields>
    <Field name="LikeSubject" type="ShortText">
      <DisplayName>LikeSubject</DisplayName>
      <Description></Description>
    </Field>
    <Field name="LikeBody" type="LongText">
      <DisplayName>LikeBody</DisplayName>
      <Description></Description>
    </Field>
    <Field name="CommentSubject" type="ShortText">
      <DisplayName>CommentSubject</DisplayName>
      <Description></Description>
    </Field>
    <Field name="CommentBody" type="LongText">
      <DisplayName>CommentBody</DisplayName>
      <Description></Description>
    </Field>
  </Fields>
</ContentType>
```

- **3:** create a new PostNotificationConfig with the name **NotificationConfig** under a (config) SystemFolder under /Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace
- **4:** set the config content's Field values optionally:
  - LikeSubject: Wall Posts: {Post} - {CreatedBy.FullName} liked
  - LikeBody: ```<a href="http://example.com{PostPath}">{PostPath}</a>```
  - CommentSubject: Wall Posts: {Post} - {CreatedBy.FullName} commented
  - CommentBody:
  
```html
<a href="http://example.com/{PostPath}">{Post}</a>
<hr/>
{CreatedBy.FullName} commented: {Description}
```

This way email messages on Likes and Comments will be fully customized.
