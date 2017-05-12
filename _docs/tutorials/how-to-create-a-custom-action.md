---
title:  "How to create a custom Action"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-custom-action.md'
category: Tutorials
version: v6.0
tags: [sn6, action, application, backend]
---

# How to create a custom Action

sensenet ECM has a powerful feature for defining and accessing content operations called the [Smart Application Model](/docs/smart-application-model). The basic building blocks of this model are actions and applications. The previous articles contain information for portal builders on how to create actions and applications using the built-in method. This article describes the way for developers to create a custom action that is able to execute custom initialization code or behave differently than the built-in ones.

[Applications](/docs/application) can be viewed as the code that executes when the page renders the appropriate content (e.g. an _Edit_ page for an _Article_). However this article is about actions that are also classes, but the execution of an action takes place well before the application. An action code is executed when an action control (e.g. an [ActionLinkButton](/docs/actionlink-button) or [ActionMenu](/docs/action-menu)) displays the action (clicking on the link will navigate to the application). The initialization code may set the action _Forbidden_ (grey and unclickable) or even hide it. This is the place for executing custom permission checks or parameter handling.

> **Why create a custom action?** ASP.NET or JavaScript provide a lots of different ways to achieve these kind of scenarios. What we offer with our action framework is a whole architecture for handling and displaying actions. You will not have to worry about generating the action URL (e.g. adding the back url), and you will be able to manage and display your custom actions alongside with the common built-in actions (check the [ActionLinkButton](/docs/actionlink-button) or [ActionMenu](/docs/action-menu) controls for more details).

## Upgrade from previous versions

```diff
- Before sensenet ECM version 6.1.2, there was a possibility to configure the actions in the web.config. 
- During the upgrade from previous versions you may remove all the action and scenario type registrations 
- from the unity section of the web.config and application configuration files, they are not needed anymore.
```

## Action types

- **URL action**: most actions are URL actions. These actions navigate to a different page (the application) and responsible for generating the appropriate URL for this (e.g.: http://localhost/NewsDemo/External/Gitex?action%3dEdit)
- **Client action**: these actions are not redirecting the page but execute client side JavaScript code defined by the developer.
- **Open Picker action**: a special type of client action. It opens a Content Picker and lets the user select one or more content, than redirects the page to the appropriate application, defined by the developer of the action.
- **OData action**: it is possible to create an action that is accessible through the OData API of sensenet ECM. See more in the [How to create a custom OData action article](how-to-create-a-custom-odata-action).

#### Default action type

If the developer did not provide a custom action type name for an application, the default action will be instantiated. In sensenet ECM the built-in default action type is **UrlAction**. This can be changed using a Web.config setting.

```xml
<add key="DefaultActionType" value="MyCustomDefaultAction" />
```

```diff
- Please note that this setting changes all action instantiation where there is no specific action name specified on the application. 
- Use this feature only if you want to make a global change in the action framework behavior, e.g. how URLs are generated.
```

## Steps for creating a URL action

In this section we create a custom action for the _Edit_ application of the _Article_ content type.

### 1. Create a new class

When you create a simple custom action, it should inherit the `UrlAction` class.

```csharp
public class ArticleEditAction : UrlAction
{
}
```

### 2. Implement initialization

If you want to attach custom initialization logic to the action, override the `Initialize` method (but do not forget to call the base `Initialize` method). In our case we will check that the user is browsing the site from the localhost URL. If that is the case, we disable the Edit action.

```diff
- Please note that this check mechanism is related only to the action. 
- You still need to perform this check on the application page in case of somebody tries to execute the app by writing the action name manually into the url.
```

```csharp
public class ArticleEditAction : UrlAction
{
    public override void Initialize(
        Content context, 
        string backUri, 
        Application application, 
        object parameters)
    {
        base.Initialize(context, backUri, application, parameters);
 
        //if we browse the site from 'localhost', disable the action
        //(only allow editing from the admin site)
        if (PortalContext.Current.RequestedUri.Host == "localhost")
        {
            this.Forbidden = true;
        }
    }
}
```

### 3. Display the action

To use this newly created action codebehind you need to do the following:

- Find the related application: _/Root/Sites/Default_Site/NewsDemo/(apps)/Article/Edit_
- Make sure that it is in the `ListItem` scenario: the Scenario property of the application should contain the ListItem name (this is necessary only to make sure that the action will show up in this particular action menu).
- Set the **Action type name** property of the application to the prevously created `ArticleEditAction` class name. This way when the system loads the Edit application, it will know what action class is connected to it.

Now check the http://localhost/NewsDemo. The _Manage Content_ action menus will contain the Edit action but it will be disabled because of our initialization logic.

<div style="text-align: center;">
<img src="/docs/img/action/custom-action-edit-article.png" alt="Custom Edit action" width="600" border="0" />
</div>

## Steps for creating a Client action

In this section we create a simple _Hello world_ client action.

### 1. Create a new class

When developing a custom Client action you need to inherit the `ClientAction` class.

```csharp
public class HelloClientAction : ClientAction
{
}
```

### 2. Set JavaScript code

In more advanced scenarios you may implement the JavaScript logic in a separate js file and just provide the name of the method to call in the Methodname property of your client action class. But for now we will provide the whole javascript code in our sample class by overriding the `Callback` property. This is responsible for providing the whole javascript for the GUI.

```csharp
public class HelloClientAction : ClientAction
{
    public override string Callback
    {
        get
        {
            return "alert('Hello!');return false;";
        }
        set
        {
            base.Callback = value;
        }
    }
}
```

##### Redirecting after a client-side operation - from version 6.3

In case you need to redirect a user to another page after the operation is complete - e.g. because you need to refresh the page, or because the content in question no longer exists - you have to develop a custom JavaScript code for achieving that (e.g. you can use the usual 'location = targetUr;' approach). For example the _Delete_ or _Move_ actions redirect to the parent after their operation completes. There are cases however when the parent is not sufficient - e.g. because the action was executed from a custom view that was bound to a different content than the current context. In these cases you can provide the following parameter to the client action that states that the action should redirect the user to the originally given back url.

- **RedirectToBackUrl**

Inline code:

```js
var action = ActionFramework.GetAction("MoveTo", content, new { RedirectToBackUrl = true });
```

Declarative style:

```xml
<sn:ActionLinkButton runat='server' NodePath='<%# Eval("Path") %>' ActionName='Delete' ParameterString="RedirectToBackUrl=true" >Delete content</sn:ActionLinkButton>
```

The JavaScript code for the action should take this value into account and redirect the user to the appropriate back url, as you can see in the source code of the MoveTo action.

```javascript
"location=" + (this.RedirectToBackUrl 
    ? string.Concat("\'", HttpUtility.UrlDecode(this.BackUri), "\'") 
    : "SN.Util.GetParentUrlForPath(path)") + ";"
```

### 3. Display the action

In this sample we do not use any predefined application as in the previous section. To provide a simple client action you need to create a content of the type _Application_. Please follow the steps below:

- Navigate to _/Root/Sites/Default_Site/NewsDemo/(apps)/Article_
- Create an _Application_ with the folowing properties
    - **Name**: Hello
    - **Scenario**: ListItem
    - **ActionTypeName**: HelloClientAction

Now check the http://localhost/NewsDemo This link works only if you have a live demo install on your localhost! (Don't forget! Some feature needs authentication and/or admin rights!) page. The _Manage Content_ action menus will contain the newly created Hello action that displays a client-side message box.

## Steps for creating a custom Open Picker action

In this section we modify the behavior of the _Move to..._ action to open the Content Picker at the current workspace root.

### 1. Create a new class

When developing a custom Open Picker action you need to inherit the `OpenPickerAction` class. In our case we want to customize the _Move to..._ action, so we inherit the `MoveToAction` class that is a picker action itself.

```csharp
public class MoveToWorkspaceAction : MoveToAction
{
}
```

### 2. Set Open Picker JavaScript code

We only want to customize the way the Content Picker opens when the user clicks on the _Move to_ action. To achieve this you only have to override the `GetOpenContentPickerScript` method of the base class.

> The source code below is only the extension of the base class behavior. We added only the lines for providing the tree roots, everything else is copied from the base class.

```csharp
public class MoveToWorkspaceAction : MoveToAction
{
    protected override string GetOpenContentPickerScript()
    {
        if (Content == null || this.Forbidden)
            return string.Empty;
 
        var openParams = string.Format(
            "MultiSelectMode: '{0}', callBack: {1}",
             MultiSelectMode, 
             GetCallBackScript());
 
        if (!string.IsNullOrEmpty(this.DefaultPath))
            openParams += string.Format(", DefaultPath: '{0}'", this.DefaultPath);
 
        //find the workspace of the current content and add it as a tree root
        var gen = Content.ContentHandler as GenericContent;
        if (gen != null && gen.Workspace != null)
            openParams += string.Format(", TreeRoots: ['{0}', '/Root']", gen.WorkspacePath);
 
        return string.Format(
            "if ($(this).hasClass('sn-disabled')) return false; SN.PickerApplication.open({0});", 
            openParams);
    }
}
```

You may freely change the code above to customize the `DefaultPath` or any other property of the open picker Javascript method too.

### 3. Display the action

In this sample we want to change the behavior of the _Move to_ action. To achieve this, you need to set your custom class name as the **Action type name** of the MoveTo application. Please follow the steps below:

- Navigate to _/Root/(apps)/GenericContent_
- Select the _MoveTo_ action and set the property below:
    - `ActionTypeName`: MoveToWorkspaceAction

Now check one of the document libraries on the portal. The Move to action (on any document) will be opened with the workspace root. If you want to move the document elsewhere,you may select the _Root_ option from the dropdown at the top of the Content Picker.

<div style="text-align: center;">
<img src="/docs/img/action/action-open-picker-moveto.png" alt="Open picker" width="600" border="0" />
</div>