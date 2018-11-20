---
title: "Permission API"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/permission-api.md'
category: Development
version: v7.0
tags: [permission, security, api]
description: "The permission API in sensenet lets developers manage and check permissions on content and change group memberships."
---

# Permission API
**sensenet** has a powerful but easy-to-use [Permission System](permission-system) that is designed to be able to solve all permission-related business requirements from small businesses to large enterprises.

This article is for *developers* who want to know how to work with permissions using our *C# API*. If you want to work with permissions in sensenet using our [OData REST API](odata-rest-api) please check [Built-in OData actions and functions](built-in-odata-actions-and-functions) for permission-related methods.

## Security handler
The *SecurityHandler* class is the main entry point for working with permissions. You can use it in two ways: there is a *static API* that you may use if you do not have a fully loaded [Content](content) in your hand, only an id of a content. And there is an *instance API* for when you have a content or a node. In that case you can access all the permission-related functions for *that particular content* the following way:
```csharp
var workspace = Node.LoadNode(wsPath);
// check permissions for the current user
if (workspace.Security.HasPermission(PermissionType.AddNew))
{
   ...
}
```
The *Security* property above returns an instance of the *SecurityHandler* class (you get the same object on a content and its content handler node as well, they are the same).

## Security context for other users
In case you want to check permissions for a different user than the one who is logged in, you have to create a *security context* for that other user. After that you will be able to use the permission API the same way as before:
```csharp
// create a context for a different user
var ctx = SecurityHandler.CreateSecurityContextFor(user1);
// call permission-related methods through the security context
if (ctx.HasPermission(workspace.Id, PermissionType.AddNew))
{
   ...
}
```

## Checking permissions
You can check permissions in two ways: 'Assert' methods automatically throw an exception if the provided permissions are missing, 'HasPermission' methods let you execute your custom logic.
```csharp
// option1: assert throws an error automatically
workspace.Security.Assert(PermissionType.Approve, PermissionType.AddNew);

// option2: check permissions silently
if (workspace.Security.HasPermission(PermissionType.Approve, PermissionType.AddNew))
{
   ...
}
```

## Editing permissions
In sensenet permissions are represented by *ACLs* (*Access Control Lists*). To modify the Access Control List specified for a Content, you should use the *SnAclEditor* object provided by *SecurityHandler*. For example to set permissions for a user on folders or files, you can use the following code:

```csharp
var folder1 = Node.Load<Folder>("/Root/Sites/Default_Site/MyFolder01");
var folder2 = Node.Load<Folder>("/Root/Sites/Default_Site/MyFolder02");
var file1 = Node.Load<File>("/Root/Sites/Default_Site/MyFile01.txt");

// set permissions on folder1, folder2 and file1 for two users and a group
SecurityHandler.CreateAclEditor()
.Allow(folder1.Id, user1.Id, false, PermissionType.Open, PermissionType.Custom01)
.Allow(folder2.Id, user2.Id, false, PermissionType.Open)
.Allow(file1.Id, editorsGroup.Id, false, PermissionType.Save)
.Apply();
```

>Please note that the code above loads the ACL editor once and lets you make multiple modifications, even on multiple content items for different users. The actual permission change will be made by the **Apply** method, do not forget to call that at the end.

The code above assumes that the *current user* has the appropriate *SetPermissions* permission for all the content in play. If you have to change to a different user, you may load the ACL editor in the following way:
```csharp
// create a context for any user
var ctx = SecurityHandler.CreateSecurityContextFor(adminUser);
var editor = SecurityHandler.CreateAclEditor(ctx);
```

## Membership API
If you are working with users and groups in sensenet, please edit group membership using the *Group* class and its methods. All the permission-related operations are done in the background automatically.
```csharp
// these methods call Save internally, you do not have to save the group manually
group1.AddMember(user1);
group1.RemoveMember(user1);

if (user1.IsInGroup(group1.Id)) 
{ 
   // ... 
}

if (group1.IsInGroup(group2.Id)) 
{ 
   // ... 
}
```

### Membership extender
This extensibility point lets developers extend the group membership of a user dynamically *per request*. The extender mechanism runs on *every request* and can **add one or more groups** to the list of the current user's group list in memory. The IsInGroup and permission check mechanism takes this into account.
This possibility may be useful in cases when you want to control the permissions of a user dynamically, without changing permissions manually all the time. Or put a user into a certain group only on certain days or when he visits a certain part of the repository.
To create a membership extender simply inherit from the *MembershipExtenderBase* class and return a list of dynamic groups you want to add to the users group list.
```csharp
public sealed class MyMembershipExtender : MembershipExtenderBase
{
   public override MembershipExtension GetExtension(IUser user)
   {
      //for example if the user browses a 
      //certain part of the portal
      var isInSubtree = ...;

      if (isInSubtree)
         return new MembershipExtension(new[] { Node.LoadNode("/Root/IMS/Demo/MyGroup") as ISecurityContainer });
      else
         return MembershipExtenderBase.EmptyExtension;
   }
}
```

## Permission query API
sensenet offers a way for developers to query the permission storage in many ways in case you want to create a custom UI for displaying and managing permissions. This may be also useful if you want to arrange and display content on the UI based on their accessibility (e.g. list documents or folders by certain accessibility levels). You'll find the methods below in the *SenseNet.ContentRepository.Security.PermissionQuery* class.
Please note that the methods in this class check whether the current user has the necessary *SeePermission* permission before returning the result.

```csharp
// users and groups that have any explicit permissions on the given content or its subtree
var result = PermissionQuery.GetRelatedIdentities(content, PermissionLevel.AllowedOrDenied, IdentityKind.All);

// Collects all permission settings on the given content and its subtree related to the specified user or group.
var result = PermissionQuery.GetRelatedPermissions(content, PermissionLevel.AllowedOrDenied, true, user1, null);

// Returns all content in the requested content's subtree that have any permission setting
// filtered by permission value, user or group, and a permission mask.
var result = PermissionQuery.GetRelatedItems(content, PermissionLevel.AllowedOrDenied, true, user1, permissionTypes);

// Returns users and groups that have any explicit permissions on the given content or its subtree.
var result = PermissionQuery.GetRelatedIdentities(content, PermissionLevel.AllowedOrDenied, IdentityKind.GroupsAndOrganizationalUnits, permissionTypes);

// Returns all content in the requested content's direct child collection that have any permission setting
// filtered by permission value, user or group, and a permission mask.
var result = PermissionQuery.GetRelatedItemsOneLevel(content, PermissionLevel.AllowedOrDenied, group, permissionTypes);
```

> For more details about permission queries please visit the [Permission queries](__TODO__) article.