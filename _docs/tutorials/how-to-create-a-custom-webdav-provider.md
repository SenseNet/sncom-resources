---
title:  "How to create a custom WebDav provider"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-custom-webdav-provider.md'
category: Tutorials
version: v6.3.2
tags: [webdav, provider, content repository, sn6, backend]
description: This article describes how developers can customize the way we serve and manage content through the WebDav interface.
---

# How to create a custom WebDav provider

sensenet is able to expose the contents of the [Content Repository](/docs/content-repository) on multiple interfaces. For intranet users one of the most important interfaces is [Webdav](/docs/webdav). You can manage files and folders easily, directly in _Windows Explorer_. This article describes how developers can customize the way we serve and manage content through the WebDav interface.

## WebDav provider

By default when you browse the [Content Repository](/docs/content-repository) through [Webdav](/docs/webdav), you see all folders and files that you have permissions to see. You may create or even move folders and documents, if you have the necessary permissions. The WebDav provider was created to let developers customize what users see in _Windows Explorer_ and what they can do. E.g. you may restrict the creation of folders or files, or list the contents only in specific folders. The following list contains the possible extension points of the provider:

- **GetChildren**: you can customize the items (folders and files) listed under a particular folder.
- **AssertCreateContent**: you can prevent users creating a content in a particular folder.
- **AssertModifyContent**: you can prevent users modifying a content.0
- **AssertMoveContent**: you can prevent users moving a content.

Additionally to the basic WebDav protocol, there are methods that you can use to customize the _Document Workspace Management_ panel in _Microsoft Office 2007_. Please note that this feature has been removed from subsequent versions of Microsoft Office.

- **GetDocumentsAndFolders**: list of other documents and subfolders in the document library
- **GetWorkspaceMembers**: list of workspace member users

## Built-in default WebDav provider

sensenet has a default WebDav provider which is sufficient in most cases. It lists all visible folders and files and throws no exceptions.

## Custom WebDav provider

If you want to restrict the list of folders and files that your users see in Windows Explorer, you may do so by creating a custom class that inherits one of the following.

- `SenseNet.Portal.WebDAV.WebDavProvider` (abstract base class)
- `SenseNet.Portal.WebDAV.DefaultWebDavProvider` (built-in default provider, use this if you want to avoid overriding all the methods above)

In your custom class you can decide to override one or more of the methods mentioned above. In the assert methods you should throw an exception if you want to deny a certain operation.

> Please note that the assert methods are ment to prevent users from doing something. The WebDav protocol does not allow us to provide a meaningful error message to the user, so this is what we can do: stop the operation with throwing an exception.

#### Deployment

You can deploy your custom WebDav provider by building your solution and copying the dlls into the web folder. No further configuration is needed, the portal will find the custom provider automatically.
The first time somebody accesses the Content Repository through WebDav, a log entry will be created stating the currently loaded WebDav provider.

## Example

In the following example you see a custom WebDav provider where we hide certain folders and files, and make sure that the user do not create files with an _.abc_ extension.

```csharp
public class CustomWebDavProvider : WebDavProvider
{
    public override IEnumerable<Node> GetChildren(IFolder folder)
    {
        return folder.Children.Where(ch => !ch.Name.StartsWith("Secret"));
    }
 
    public override void AssertCreateContent(
        string parentPath, 
        string contentName, 
        string contentTypeName)
    {
        // throw an exception if needed
        if (contentName.EndsWith(".abc"))
            throw new InvalidOperationException("You cannot create .abc files through WebDav.");
    }
 
    public override void AssertModifyContent(Node node)
    {
        // throw an exception if needed
    }
 
    public override void AssertMoveContent(Node node, string destinationParentPath)
    {
        // throw an exception if needed
    }
}
```