# Permission queries

## Overview
**Sense/Net ECMS** has a flexible [Permission System](__TODO__) for controlling the accessibility of content on different levels. You are able to set permissions (allow or deny) for individual users or groups, for individual documents or whole libraries and workspaces. To be able to visualize the permission settings we created a **C#** and [OData REST API](__TODO__) for querying the settings that developers and portal builders can use in custom solutions.

## Details
This article contains information for developers and portal builders about the **Sense/Net ECMS** API for *querying permission setting overviews* in a subtree.

>To use this API the logged in user must have subtree *SeePermission* permission on the root content.

The API has a native **C#** implementation and a **Rest API** counterpart. The methods are the same, only the parameter types are different to make it more convenient for the actual use case. The C# API class name is: *PermissionQuery* in the *SenseNet.ContentRepository.Security* namespace. The C# methods and OData operations can be found later in this article.

### Concepts
You are able to display a complex structure that represents the permission settings in a subtree. The displayed structure depends on the concept that you choose. There are two concepts that are determined by the parameter *explicitOnly*:

- **Explicite list**: The user wants to see all content that have any permission setting (allow, deny or break) for the selected identity in in the selected subtree. This view can be used to modify the permission settings because the editor sees all explicite permission settings in the permission tree that are related to the selected identity. 
- **Effective list**: The user wants to see all permitted (or denied) content for the selected identity. This view gives you an overview of permission settings because the editor sees all content with their effective permissions.
>>In **Sense/Net 6.3** only the **explicit list** concept is implemented. The latter, effective list is coming in the following months.

#### Concept examples
The following figure displays a **content subtree** and permission settings. For simplicity the content are represented by letters. The selected content has a special role (it is the yellow X in the brown circle). The path of the selected content is */R/A/X*. The color coded boxes are the permission settings: one box one permission entry. For example *"U1 +P1"* means: in this content *U1* has *P1* permission. "+" means allowed, "-" means denied. In this example there are:

- three users: U1, U2, U3
- two groups: G1, G2
- three permissions: P1, P2, P3 

There is a yellow box on the right with the caption "Break". On this content the permissions are breaked, U1, U2, U3, G1 and G2 permisions are cleared. No other explicit entries are changed.

![Sample content tree](images/permission-queries/PermissionQueries1.png "Sample content tree")

Next figure displays the relevant permission tree according to permission settings in the sample content tree above. Please note that the permission tree is similar to the content tree but not the same. In the permission tree all content that do not have explicite permission settings are skipped, so in some cases the 'permission parent' is different than its physical parent. Because of this the permission tree is smaller than the content tree.

![Relevant permission tree](images/permission-queries/PermissionQueries2.png "Relevant permission tree")

Let's see the two concepts look like in this content and permission tree. 

##### Example 1

- selected content: **X** (path: */R/A/X*)
- selected identity: **U3** 
- selected permission: **P2**

###### Effective tree
In this case the relevant content are the **red** and **yellow** circles:

![Effects of P2 permissions for U3](images/permission-queries/PermissionQueries3.png "Effects of P2 permissions for U3")

- **Allowed**: only the yellow contents
- **Denied**: only the red contents.
- **Allowed or denied**: union of the red and yellow contents

###### Explicite tree
If only the explicite list is relevant, two content will be listed. On the figure above they have a blue rectangle. 
- */R/A/X/A*
- */R/A/X/A/A*

##### Example 2

- selected identity: **U1** 
- selected permission: **P1**

The relevant set is the following:

![Effects of P1 and Break permissions for U1](images/permission-queries/PermissionQueries4.png "Effects of P1 and Break permissions for U1")

The **Break** is a special case. Because **P1** is allowed for the user **U1** on the */R/A* content, the break and clear permissions must be interpreted as an explicite permission entry because the permission is changed on this content. If the list method is *"explicite only"* (now only this method is implemented) the breaked content always appears in the relevant cluster even if the explicit entry does not change the permission. The reason for this is that the "break" changes the permission inheritance.

### Context content
In this API there is always a content that is the root of the selected subtree. The API calls are implemented as generic OData operations so the first parameter is always the OData resource as the context content.

### Permission differentiation
In the future GUI developers will be able to differentiate permission levels using the following enumeration with the permission query methods. 
```csharp
public enum PermissionLevel { Allowed, Denied, AllowedOrDenied }
```

- **Allowed**: the content is relevant if it is permitted for the selected user.
- **Denied**: the content is relevant if it is denied for the selected user.
- **AllowedOrDenied**: the content is relevant if it is permitted or denied for the selected user.

### Identity differentiation
In some cases, you may not need to list all the identities; sometimes it is enough to list only users or groups. The identity lister methods have a parameter that allows to differentiate by identity type. Value of this parameter is one of the following enumeration:
```csharp
public enum IdentityKind { All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits }
```

### Methods
There are 7 methods in the permission query API that are divided into 3 groups.

#### Three level tree structure
This structure is designed for content that are permitted or denied per permission to users/groups/organizational units in the selected subtree (3 methods):

##### OData API

- **First level**: *GetRelatedIdentities*. Identity list that contains every users/groups/organizational units that have any permission setting (according to permission level) in the subtree of the context content. Parameters:
  - **level** (string): the value is "AllowedOrDenied". "Allowed" or "Denied" are *not implemented yet*.
  - **kind** (string): the value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
Example:
```text
URL: /OData.svc/Root/Sites('Default_Site')/GetRelatedIdentities?metadata=no&$select=Path
Verb: POST
Request body: {level: "AllowedOrDenied", kind: "Groups"}
```
Result:
```javascript
{
    "d": {
        "__count": 38,
        "results": [
            {
                "Path": "/Root/IMS/BuiltIn/Portal/Everyone"
            },
            {
                "Path": "/Root/IMS/BuiltIn/Portal/Administrators"
            },
            {
                "Path": "/Root/IMS/BuiltIn/Portal/IdentifiedUsers"
            },
            ...
        ]
    }
}
```

- **Second level**: *GetRelatedPermissions*. Permission list of the selected identity with the count of related content. **0** indicates that this permission has no related content so the GUI does not have to display it as a tree node. Parameters:
  - **level** (string): the value can be "AllowedOrDenied", "Allowed" or "Denied".
  - **explicitOnly** (bool): the value *"true"* is required because "false" is *not implemented yet*.
  - **member** (string): fully qualified path of the selected identity (e.g. */Root/IMS/BuiltIn/Portal/Visitor*).
  - **includedTypes** (string[]): an item can increment the counters if its type or any ancestor type is found in the 'includedTypes'. Null means filtering off. If the array is empty, there is no element that increases the counters. This filter can reduce the execution speed dramatically so do not use if it is possible.
Example:
```text
URL: /OData.svc/Root/Sites('Default_Site')/GetRelatedPermissions
Verb: POST
Request body: {level: "AllowedOrDenied", explicitOnly: true, member: "/Root/IMS/BuiltIn/Portal/EveryOne", includedTypes: null}
```
Result:
```javascript
{
    "See": 48,
    "Preview": 48,
    "PreviewWithoutWatermark": 48,
    "PreviewWithoutRedaction": 48,
    "Open": 48,
    "OpenMinor": 1,
    "Save": 1,
    "Publish": 0,
    "ForceCheckin": 0,
    "AddNew": 1,
    "Approve": 0,
    "Delete": 0,
    "RecallOldVersion": 0,
    "DeleteOldVersion": 0,
    "SeePermissions": 0,
    "SetPermissions": 0,
    "RunApplication": 48,
    "ManageListsAndWorkspaces": 0,
    "Custom01": 0,
    "Custom02": 0,
    "Custom03": 0,
    "Custom04": 0,
    "Custom05": 0,
    "Custom06": 0,
    "Custom07": 0,
    "Custom08": 0,
    "Custom09": 0,
    "Custom10": 0,
    "Custom11": 0,
    "Custom12": 0,
    "Custom13": 0,
    "Custom14": 0
}
```

- **Third level**: *GetRelatedItems*. Content list that have explicite/effective permission setting for the selected user in the current subtree. Parameters:
  - **level** (string): the value can be "AllowedOrDenied", "Allowed" or "Denied".
  - **explicitOnly** (bool): the value *"true"* is required because "false" is *not implemented yet*.
  - **member** (string): fully qualified path of the selected identity.
  - **permissions** (string[]): related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission type name (e.g. ```["Open","Save","Custom02"]```).
Example:
```text
URL: /OData.svc/Root/Sites('Default_Site')/GetRelatedItems?metadata=no&$select=Path
Verb: POST
Request body: {level: "AllowedOrDenied", explicitOnly: true, member: "/Root/IMS/BuiltIn/Portal/EveryOne", permissions: ["RunApplication"]}
```
Result:
```javascript
{
    "d": {
        "__count": 48,
        "results": [
            {
                "Path": "/Root/Sites/Default_Site/(apps)"
            },
            {
                "Path": "/Root/Sites/Default_Site/(apps)/DiscussionForum/Browse"
            },
            {
                "Path": "/Root/Sites/Default_Site/(apps)/Email/Browse"
            },
            {
                "Path": "/Root/Sites/Default_Site/(apps)/ExpenseClaim/Browse"
            },
            ...
        ]
    }
}
```

##### C# API

```csharp
public static IEnumerable<Content> GetRelatedIdentities(Content content, PermissionLevel level, IdentityKind identityKind);
public static IDictionary<PermissionType, int> GetRelatedPermissions(Content content, PermissionLevel level, bool explicitOnly, ISecurityMember member);
public static IEnumerable<Content> GetRelatedItems(Content content, PermissionLevel level, bool explicitOnly, ISecurityMember member, IEnumerable<PermissionType> permissions);
```

#### Multi level tree structure
This structure is designed for getting tree of content that are permitted or denied for groups/organizational units in the selected subtree. The result content are not in a paged list: they are organized in a tree (2 methods):

##### OData API

- **First level**: *GetRelatedIdentitiesByPermissions*
  - **string level** (string): the value "AllowedOrDenied" is required.
  - **string kind** (string): the value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
  - **string[]** permissions (string[]): related permission list.
Example:
```text
URL: /OData.svc/Root('Sites')/GetRelatedIdentitiesByPermissions?metadata=no&$select=Path
Verb: POST
Request body: {level: "AllowedOrDenied", kind: "Groups", permissions: ["Open", "RunApplication"] }
```
Result:
```javascript
{
    "d": {
        "__count": 38,
        "results": [
            {
                "Path": "/Root/IMS/BuiltIn/Portal/Everyone"
            },
            {
                "Path": "/Root/IMS/BuiltIn/Portal/Administrators"
            },
            {
                "Path": "/Root/IMS/BuiltIn/Portal/IdentifiedUsers"
            },
            ...
        ]
    }
}
```

- **Other levels**: *GetRelatedItemsOneLevel*
  - **string level** (string): the value "AllowedOrDenied" is required.
  - **string member** (string): fully qualified path of the selected identity.
  - **permissions** (string[]): related permission list.
Example:
```text
URL: /OData.svc/Root/Sites('Default_Site')/GetRelatedItemsOneLevel?metadata=no&$select=Path
Verb: POST
Request body: {level: "AllowedOrDenied", member: "/Root/IMS/BuiltIn/Portal/Visitor", permissions: ["Open", "RunApplication"] }
```
Result (the operation's output is IDictionary<Content, int> that can be filtered, projected etc.)
```javascript
{
    "d": {
        "__count": 13,
        "results": [
            {
                "key": {
                    "Path": "/Root/Sites/Default_Site/(apps)"
                },
                "value": 8
            },
            {
                "key": {
                    "Path": "/Root/Sites/Default_Site/error_pages"
                },
                "value": 0
            },
            ...
            {
                "key": {
                    "Path": "/Root/Sites/Default_Site/Publicregistration"
                },
                "value": 2
            },
            {
                "key": {
                    "Path": "/Root/Sites/Default_Site/workspaces"
                },
                "value": 24
            }
        ]
    }
}```

##### C# API

```csharp
public static IEnumerable<Content> GetRelatedIdentities(Content content, PermissionLevel level, IdentityKind identityKind, IEnumerable<PermissionType> permissions);
public static IEnumerable<Content> GetRelatedItemsOneLevel(Content content, PermissionLevel level, ISecurityMember member, IEnumerable<PermissionType> permissions);
```

#### Other methods
These methods are used (or will be used) frequently in one page applications.

##### GetAllowedUsers

Returns a content collection that represents users who have enough permissions to a requested resource. The permissions effect on the user and through direct or indirect group membership too. The function parameter is a permission name list that must contain at least one item.
Example:
```text
URL: /OData.svc/workspaces/Project/budapestprojectworkspace/Document_Library('BusinessPlan.docx')/GetAllowedUsers?metadata=no&$select=Domain,Name
Verb: POST
Request body: {"permissions": ["Open"]}
```
Result:
```javascript
{
  "d": {
    "__count": 11,
    "results": [
      {
        "Domain": "BuiltIn",
        "Name": "Admin"
      },
      {
        "Domain": "BuiltIn",
        "Name": "alba"
      },
      {
        "Domain": "BuiltIn",
        "Name": "rupertbrown"
      },
      {
        "Domain": "BuiltIn",
        "Name": "ilguy"
      },
      ...
    ]
  }
}
```
##### C# API

```csharp
public static IEnumerable<Content> GetAllowedUsers(Content content, IEnumerable<PermissionType> permissions)
```
##### GetParentGroups

Returns a content collection that represents groups where the given user or group is member directly or indirectly.
This function can be used only on a resource content that is Group or User or any inherited type.
If the value of the "directOnly" parameter is false, all indirect members are listed.
Example:
```text
URL: OData.svc/Root/IMS/BuiltIn/Demo/Managers('alexschmidt')/GetParentGroups?$select=Name&metadata=no
Verb: POST
Request body: {"directOnly": false}
```
Result:
```javascript
{
  "d": {
    "__count": 4,
    "results": [
      { "Name": "IdentifiedUsers" },
      { "Name": "Portal" },
      { "Name": "Managers" },
      { "Name": "Demo" }
    ]
  }
}
```

##### C# API

```csharp
public static IEnumerable<Content> GetParentGroups(Content content, bool directOnly)
```

## Related links
- [Permission System](__TODO__)
- [Permission API](__TODO__)
- [How to set permissions on a content](__TODO__)
- [OData REST API](__TODO__)
- [Built-in OData actions and functions](__TODO__)
- [Content Repository](__TODO__)
- [Permission Overview](__TODO__)
