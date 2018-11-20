# Permission System

## Overview
One of the main features in **Sense/Net ECM** is its complex - yet easy-to-use - permission system. You can set permissions on every [Content](__TODO__) in the [Content Repository](__TODO__) to restrict user access and to fine-adjust the actions available on specific Content for different users. The Sense/Net permission system uses a model based on permission inheritance with allow and deny rules.

## Details
The permission system in Sense/Net ECM is a mixture of three permission features:
- **declarative permissions**: in Sense/Net you can set permissions for a particular user/group/organizational unit on every single content. Every content can have different permission settings. This can be given in usage time and can be changed and fine-adjusted by permission administrators on a running site any time.
- **programmatic permissions**: Sense/Net allows you to restrict access to a certain custom feature or programmed logic in development time by writing simple code that makes calls to the [Permission API](__TODO__).
- **role based permissions**: you can set permissions on a certain functionality to a group of users thus specifying roles in Sense/Net.

### Identities
Before we go through the different permission models, we have to know the items we are working with. In Sense/Net ECM there are 3 types of identities you can set permissions for on a content.

#### User
A user represents a single person. It is a content itself that can be created, modified or deleted the same way as other content. For details please check the following article:
- [User Accounts as Content](__TODO__)

Users can be synchronized from [Active Directory Synchronization|Active Directory](__TODO__) to let them sign in automatically using their Windows account. All users reside under a [Domain](__TODO__) and they must have a unique name and login name inside that domain so that the system can identify them correctly upon login.
- [User Content Type](__TODO__)

#### Group
A group is a content in the [Content Repository](__TODO__) that cannot have physical children but has a *Members* [Reference Field](__TODO__) that can contain users or other groups.
>Because a group may have other groups as a member, group membership works in a **transitive** way: if a user is a member of *GroupA* and *GroupA* is a member of *GroupB*, the user is also considered a member of *GroupB*.

When you set permissions for a group, that setting will be taken into account in case of every single member user when they log in to the system. This is why it is advisable to set permissions for a group (or organizational unit) instead of individual users: when a new user comes in or leaves the company, you do not have to bother with permission settings: you just have to add it to a group or remove it from one.

Groups and group memberships can also be synchronized from [Active Directory Synchronization|Active Directory](__TODO__).

There are two types of groups in Sense/Net ECM:
- global groups that can be created under a domain in */Root/IMS*
- [Workspace local groups](__TODO__) that have a smaller scope and can be created to customize the permissions inside a workspace.

There are also a couple of [Special and built-in groups and users](__TODO__) in Sense/Net ECM that worth noting - please review them before you start working with the permission system.

#### Organizational unit
Organizational units work the same way in terms of permission settings as groups: all users under an org unit will receive the permissions set for the org unit. The difference is in the structure: org units can have child elements (other org units or even subfolders), so they can be used to build a tree structure in the Content Repository.

Organizational units can also be synchronized from [Active Directory Synchronization|Active Directory](__TODO__).

### Declarative permissions
The following apply to declarative permissions in Sense/Net:
- **Item-based rules.** In Sense/Net it is possible to define permission rules on individual content that control which users/groups/organizational units can access the given content in what ways. 
- **Can be modified on live sites.** These declarative permission rules can be set up and modified on a live Sense/Net site, you are not restricted to define permission rules in development time. 
- **Administer permissions via GUI.** You also don't have to modify any code to change permission settings, Sense/Net ECMS provides a clear-cut GUI to allow administrators change permission settings. This UI can be accessed from [Content Explorer](__TODO__) via an [Action](__TODO__) link (*Set permissions*). When clicked, the browser is navigated to a window where you can add new permission entries defined for users/groups/organizational units, setting allow or deny rules on the specific [Content](__TODO__). Read the following how-to for details:
  - [How to set permissions on a content](__TODO__)

### Programmatic permissions
Besides using a simple GUI to defined declarative permissions it is also possible to define programmatic permissions in Sense/Net. This can be useful when you want to restrict access to a certain function for a defined set of users/groups/orginanizational units. Sense/Net provides a simple API to check permissions in the following aspects:
- **Membership check.** Can be checked whether the current user is part of a specific group or organizational unit,
- **Check permission on a content**. Can be checked whether the current user has certain permissions to a specific content.

Programmatic permissions are defined at development time, but of course it is always possible to implement permission checks in a flexible, configurable way. Read more info on using programmatic permissions at [Permission API](__TODO__).

### Role based permissions
Within an organization, roles are created for various job functions. The permissions to perform certain operations are assigned to specific roles. Members of staff (or other system users) are assigned particular roles, and through those role assignments acquire the permissions to perform particular functions. Since users are not assigned permissions directly, but only acquire them through their role (or roles), management of individual user rights becomes a matter of simply assigning appropriate roles to the user's account; this simplifies common operations, such as adding a user, or changing a user's department. See more info about the role-based security concept at [http://en.wikipedia.org/wiki/Role-based_access_control http://en.wikipedia.org/wiki/Role-based_access_control].

In Sense/Net there are different approaches to assign roles and many role based security problems can be solved with declarative permissions that makes role based permission handling in Sense/Net flexible and easy-to-use. The following approaches can be used to define role based permissions:
- **Permission setting on Applications.** You can declaratively define permission rules on Sense/Net [Application|Applications](__TODO__). This way you can define which functions can be access by which users/groups/organizational units. A lot of features have been implemented in Sense/Net using Applications (like copy, move, delete, etc.) thus the basic features can be restricted to any security entity in a declarative manner.
- **Roles by groups.** The most common way to define roles is to create groups and add members to these groups. The created groups will  serve as different roles (for example group of Editors, etc.). These groups can then be accessed by custom code using the [Permission API](__TODO__) to check if the current user is part of the group and thus has the specific role and able to access the related functionality. Global and local groups can be used to represent global and local roles (refer to [Workspace local groups](__TODO__)).
- **Using PermissionPlaceholders.** A permission placeholder is a dedicated content in the content repository. Features like custom implemented code or services can use it to determine if the current user has access to that particular functionality: if the user has *RunApplication* permissions on the permission placeholder content, then access to the functionalty will be granted, otherwise no. This approach can be a bit more flexible than using simple groups, since you can also define permission rules for organizational units this way. Built-in permission placeholders are located at */Root/System/PermissionPlaceholder*.

The Sense/Net role-base permission model comes with the following features:
- **Stock versus custom roles.** There are a number of built-in roles in the default installation (for example the Administrators, or Editors group, or any pre-defined applications, like /Root/(apps)/GenericContent/Delete, etc., or built-in permission placeholders , like /Root/System/PermissionPlaceholders/Wall-mvc). It is also possible to extend the base role system with custom roles: you can create custom global or local groups with custom members, define custom applications with custom permissions, and define custom permissionplaceholders with custom permission settings. It is also possible to adjust the permissions of the built-in roles: for example you can always modify the members of the Administrators group.
- **Role modeling.** In Sense/Net you can assign individual users to any role, but it is also possible to define hiearchical role models enabling you to assign a group of users to a certain role. For example:
  - you can add individual users and also groups to members of a local or global group,
  - you can define permissions for users, groups and organizational units on permission placeholder content,
  - you can define permissions for users, groups and organizational units on applications.

#### Applications and permissions
The Sense/Net application model handles the majority of the requests, that is for every content an application will be resolved to serve that content. For example if you browse a content the 'Browse' application (which is a page) will be rendered, and this application will display the requested content. The same thing happens for edit, rename, etc.: the appropriate application will be loaded first, and then that application will display/render the content the way it is defined by the logic of the application (you can read more about the application framework in Sense/Net here: 
- [Smart_Application_Model](__TODO__)

An important implication of the application model on permissions is the following: since applications (smart pages, etc.) are also content in the Content Repository, users need to have permissions on those, too. So when rendering a content/action, the users need to have permissions on both the content and the application. Example: if a user tries to upload a document to a document library, then the user needs See, Open, Save and Add new permissions on the document library and also See, Open and Run Application permissions on the Upload action, which is a page at /Root/(apps)/Folder/Upload. Read more about applications and permissions here: 
- [Application#Permission settings](__TODO__)

#### Permissions of services and features
There are some special cases where the users need to have special permissions to be able to access a feature or a service. Such service for example is the REST Api that handles requests for the content picker or the tree in the content explorer. Another example is the upload. These permissions are controlled by files under the */Root/System/WebRoot* folder and content under the */Root/System/PermissionPlaceholders* folder. You can read about these here 
- [WebRoot_Folder#Permissions](__TODO__)
- [Permission_settings_in_production_environment](__TODO__)

### Permission system details

#### Permission types
The following types of permissions are defined in the system. These permissions are not customizable and extendable:
- **See**: controls whether the user is allowed to see the Content (ie. visible in a list, but [Field](__TODO__) data cannot be accessed)
- **Restricted preview** (from version 6.3): whether the user is allowed to see a preview of a Content (e.g. a document). All field data can be accessed, except binary fields.
- **Preview without watermark** (from version 6.3): whether the user is allowed to see a preview of a Content (e.g. a document) without a watermark. All field data can be accessed, except binary fields.
- **Preview without redaction** (from version 6.3): whether the user is allowed to see a preview of a Content (e.g. a document) without redaction. All field data can be accessed, except binary fields.
- **Open**: controls whether the user is allowed to open the Content to see [Field](__TODO__) data of the Content
- **Open minor**: controls whether the user is allowed to open minor versions of the Content and see corresponding [Field](__TODO__) data
- **Save**: controls saving of the Content
- **Publish**: controls publishing of the Content
- **Force undo checkout**: controls whether the user is allowed to undo pending changes when the Content is checked out to someone else
- **Add new**: controls creation of new Content under the given Content
- **Approve**: controls approval of the Content
- **Delete**: controls deletion of the Content
- **Recall old version**: controls whether the user is permitted to restore an old version of the Content
- **Delete old version**: controls whether the user is allowed to delete an old version of the Content
- **See permissions**: controls whether the user is allowed to see permission settings for this Content
- **Set permissions**: controls whether the user is allowed to manipulate permission settings for this Content
>Permissions are inherited, so giving access to manipulate permissions of a single Content may result in allowing implicit access to influence permissions of other Content as well.
- **Run application**: controls whether the user is allowed to visualize the Content via an Application, or if the Content is an Application itself it controls whether the user is permitted to visualize any Content via this Application.
- **Manage lists and workspaces**: controls whether the user is allowed to add, modify or delete Lists or Workspaces.

Customizable permissions:
- **Custom 1** - **Custom 17**: Custom permissions that can be used freely. See [Custom permissions](__TODO__).

#### Permission names
The names of the permissions are internationalized. Resource file is: /Root/Localization/PortalResources.xml. In the file the permission names are prefixed with "Permission_".

#### Permission constraints
There may be certain constraints when setting a specific permission on a Content. For example it is not possible (and not rational) to give *Save* permissions for a user, when the user is not allowed to see the given Content. These kind of permission constraints are handled by the portal both in GUI and in API level. The former means that the permission editor UI provides handy mechanisms to automatically show and set the required permissions for you. See the following article for details:
- [Permission Constraints](__TODO__)

#### Permission inheritance
In **Sense/Net ECM** every [Content](__TODO__) is stored in a huge tree with a single root. When you set a permission on a high level item (close to the root), e.g. a site or a workspace, it will be inherited by its children. This way you do not have to set permissions on every subfolder or document, because all content inherit permissions from their parent.

![Permissions inheritance](images/permission-system/Permissions-inheritance.png)

Inherited permissions cannot be changed (without breaking the inheritance, see below) therefore their checkboxes are grayed out. But you can set additional permissions for the same identity (e.g. grant Open permission to someone who already has See permissions inherited).

Of course (as an exception) you may set *local only permissions* that are not propagated to children, see the 'local only permissions' section below for details.

#### Break permission inheritance
You may decide to change some permissions inherited from above - e.g. you inherited an Open permission for a user that you do not want to allow in a subtree. In that case you can *break permission inheritance* on a content. That means all the inherited permission entries will be copied to the current content and you will be able to change them. The new permission set (even if it contains less entries than the inherited) will be the one that is used in that subtree.
>If possible break permissions in exceptional cases only, because it makes permission administration more complicated.

#### Local only permissions (from version 6.3)
One of the most powerful features of the permission system in Sense/Net ECMS is the permission inheritance. There are cases however when you do not want child content to inherit a permission entry. For example you want to allow certain users to see a content (e.g. a Content List) but you do not want them to be able to see content that were added to that list. A typical use case for this is when you allow Visitors to *Open* and *Add* content to a Form but you do not want them to be able to open any items added to the form by others. In this case you would set a local only (in other words *not inherited*) permission entry on the Form for Visitors.
The advantage of this construct is that you **do not have to break inheritance** on the content (in this case the Form), which means any permission entries set on the tree above will still be inherited by child content.
As you can see on the image below you can mark the permission entry as 'local-only' when you add it on the set permission page. Every local-only permission entry is clearly marked on this page. You can even set inherited an local-only entries for the same users or groups side-by-side.
{{Screenshot|Permissions-localonly.png|Local only permissions}}
![Local only permission](images/permission-system/Permissions-localonly.png)
#### Allow vs. deny
When you set permissions for an identity, you can either *allow* that user or group to access a certain feature or *deny* it. 
>>**Deny is always stronger than allow**.

If you set a deny permission for a certain user, it does not matter if she has allow permission inherited from above or through a group membership - she will not be able to access that feature. You can only make deny permission disappear on lower levels only if you **break permission inheritance** on a subfolder and remove the deny permission there.
>It is advisable to set as few permissions on higher levels (closer to the root) as possible and allow access on subfolders instead of allowing everything on the root and use deny to hide something later. Think of working with [#Local only permissions (from version 6.3)|local only permissions](__TODO__) too to let users see certain content in the tree but not their child items.

#### Custom permissions
The built-in permission set can be extended with 17 custom permissions. These permissions are by default hidden from the UI and have no effect on permission checks but a builder or developer can easily bring custom permissions into the set of effective permissions. To learn more about using custom permissions read the following article:
- [Custom permissions](__TODO__)

## Related links
- [Permission Overview](__TODO__)
- [Permission Constraints](__TODO__)
- [How to set permissions on a content](__TODO__)
- [Custom permissions](__TODO__)
- [Permission settings in production environment](__TODO__)
- [Permission API](__TODO__)

## References
- [http://en.wikipedia.org/wiki/Role-based_access_control](http://en.wikipedia.org/wiki/Role-based_access_control)
