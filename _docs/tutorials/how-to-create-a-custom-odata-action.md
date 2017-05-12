---
title:  "How to create a custom OData action"
source_url: 'https://github.com/SenseNet/sensenet.github.io/docs/tutorials/how-to-create-a-custom-odata-action.md'
category: Tutorials
version: v6.3
tags: [sn6, action, application, odata, smart application model, ajax, backend]
---

# How to create a custom OData action

sensenet ECM has a powerful feature for defining and accessing content operations called the [Smart Application Model](/docs/smart-application-model). The basic building blocks of this model are actions and applications. The previous articles contain information for portal builders on how to create actions and applications using the built-in method. There is another article for developers about how to create custom actions - it is recommended to read that first. This article describes the way for developers to create a custom action that is accessible through the [OData API of sensenet ECM](/docs/odata-rest-api).

sensenet ECMS is able to publish all of the content in the [Content Repository](/docs/content-repository) through the [OData REST API](/docs/odata-rest-api). In addition, it is possible to publish actions through this API - even custom actions you develop. This is essential for client-side developers: they will be able to access the full power of sensenet ECM through simple OData requests, and will be able to build a totally custom user interface above a robust repository.

For a list of built-in actions that are accessible through OData, see [this article](/docs/built-in-odata-actions-and-functions).

```diff
- Before you create a custom action, consider using the [Generic sensenet OData action](/docs/generic-sensenet-odata-action), which lets you call a method without creating a custom action.
```

> Please note that in sensenet ECM there is a restriction in the OData implementation: actions and functions can be invoked only on entities and not collections.

## OData and HTML actions

Actions in sensenet ECM can have two faces: they can be accessible through OData and may have a well-known HTML user interface, provided by an application content (e.g. a [Smart Page](/docs/smart-pages)). The custom action class must tell the system (through a couple of properties) which type of behavior it supports:

- only HTML
- only OData
- both HTML and OData

> About custom actions that supports only the HTML behavior, please check the [How to create a custom Action](how-to-create-a-custom-action) tutorial. In this article we are describing **OData actions**.

## Steps for an OData action

In this section you can learn how to create a custom action that can be accessible through OData requests. The idea is that you place an **Http application** into the [Content Repository](/docs/content-repository) with the desired name that tells the system about the action (you have to set the **Action type name** field of the application to the custom action class name). This is necessary for our Action Framework and OData handler to recognize the action and execute it when a request arrives for it.

> By connecting the application and the action you will be able to control the accessibility of your action: setting permissions on the application or setting the required content permissions affects the behavior and visibility of the action through OData too.

In this section we create an action that asks if a user has permissions for a content. The action will need two parameters:

- `user path` (optional): if not provided, the current user will be used
- `permissions`: name of the permissions we want to check for (e.g. Open, Save)

The content that we check permissions for is the content addressed by the OData request.

### 1. Create an action class

First, we have to create a class that inherits `ActionBase` and provide the information to the system about what kind of behavior our action supports.

```csharp
public class HasPermissionAction : ActionBase
{
    //we do not support HTML behavior
    public override string Uri
    {
        get { return null; }
    }
 
    public override bool IsHtmlOperation { get { return false; } }
    public override bool IsODataOperation { get { return true; } }
    public override bool CausesStateChange { get { return false; } }
}
```

The properties above describe te action in the following way:

- **IsHtmlOperation**: returns _true_ here if the action is related to a regular application that has a regular HTML output too. Default value is _true_.
- **IsODataOperation**: returns _true_ here if you plan to publish this action through OData. Default value is _false_.
- **CausesStateChange**: returns _true_ here if your action changes the state of the content in any way. If you return _false_, than this will be considered as an OData function instead of an action. For more information about the difference between actions and functions, see the [OData documentation](http://www.odata.org/media/30002/OData.html#operations).

### 2. Implement the action

Next, we have to publish the parameters our action supports and implement the logic in the `Execute` method. This method will be called by the OData handler when we send a request for this action.

```csharp
public class HasPermissionAction : ActionBase
{
    //we do not support HTML behavior
    public override string Uri
    {
        get { return null; }
    }
 
    //=========================================================================== OData
 
    public override bool IsHtmlOperation { get { return false; } }
    public override bool IsODataOperation { get { return true; } }
    public override bool CausesStateChange { get { return false; } }
 
    private ActionParameter[] _actionParameters = new[] { 
        new ActionParameter("user", typeof(string)), 
        new ActionParameter("permissions", typeof(string[]), true) };
    public override ActionParameter[] ActionParameters { get { return _actionParameters; } }
 
    public override object Execute(Content content, params object[] parameters)
    {
        var userParamValue = (string)parameters[0];
        var permissionsParamValue = (string[])parameters[1];
        IUser user = null;
 
        if (!string.IsNullOrEmpty(userParamValue))
            user = Node.Load<User>(userParamValue);
 
        var permissions = permissionsParamValue.Select(PermissionType.GetByName).ToArray();
 
        return user == null 
            ? content.Security.HasPermission(permissions) 
            : content.Security.HasPermission(user, permissions);
    }
}
```

As you can see in the source code above, we receive the content and the parameters the request contains. Using the given identity and permission name information we are able to perform the permission check and return with the result.

> Please note that the sample code above does not contain error handling; please always check for errors and missing parameters when you write an action.

#### Action parameters

Action parameters are sent to the portal in the request body. Publishing the appropriate parameters for your action is essential part of creating a custom action. You need to provide the _Type_ of the parameter for the system to be able to correctly deserialize the parameters from the reques

In the example above we provide the previously mentioned action parameters in the action class:

- `user`: string parameter for the user Path
- `permissions`: string array for permission names

### 3. Register the action

The system will recognize your action only if you place an application in the correct folder in the [Content Repository](/docs/content-repository). In this case we create a `HttpHandlerApplication` named **HasPermission**:

- _/Root/(apps)/GenericContent/HasPermission_

We connect the application to the action by providing the name of our action in the **Action type name** field.

<div style="text-align: center;">
<img src="/docs/img/odata/odata-action-has-permission.png" alt="OData action HasPermission" width="600" border="0" />
</div>

#### Permissions

The application created above lets you manage the accessibility of this action. This means you can control who can invoke this action using the regular permission system of sensenet ECM. Only users and groups with See/Open permissions for this application will be able to invoke the action through OData.

### 4. Send an OData request

From now on you are able to invoke the action through OData. Here is a sample request for the `HasPermission` action (the user below is not set, meaning the currently logged in user will be used for the permission check):

- **URL**: _/OData.svc/workspaces/Project/budapestprojectworkspace('DocumentLibrary')/HasPermission_
- **Request body**: {user:null, permissions:["Open","Save"]}
- **result**: true

```diff
- Please note that currently only POST requests are supported for sensenet OData functions. 
- This means you cannot invoke OData operations from the address bar of the browser.
```

## Collection result

If the result of a custom OData action is a **Content collection** (`IEnumerable<Content>`) or a **Content dictionary** (IDictionary thats key is Content and value is anything), it is possible to use the usual filtering paging and formatting query options (e.g. _$filter_, _$top_, _$skip_) when sending the request. This is provided by the sensenet OData API automatically.

The following example request gets 5 of the security identities (only users) under the workspaces folder, skipping the first 5 (meaning the second page). Output is minified: only the path is displayed and entity's metadata is hidden:

```js
$.ajax({
    url: "/OData.svc('workspaces')/GetRelatedIdentities?metadata=no&$select=Path&$skip=5&$top=5&$filter=isof('User')",
    dataType: "json",
    type: 'POST',
    data: "models=[" + JSON.stringify({ 'level':'allowedordenied' , 'kind': 'All' }) + "]",
    success: function () {
        //...
    }
});
```

## Collection result examples

Both example's request contain the following querystring: _?metadata=no&$select=Path_.
**Content collection result example:**

```js
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

**Content dictionary result example:**

```js
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
        ]
    }
}
```