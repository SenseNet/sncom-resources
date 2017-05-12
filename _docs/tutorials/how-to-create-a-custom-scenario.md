---
title:  "How to create a custom Scenario"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-a-custom-scenario.md'
category: Tutorials
version: v6.1.2
tags: [sn6, action, application, scenario, smart application model, backend]
---

# How to create a custom Scenario

sensenet ECM has a powerful feature for defining and accessing content operations called the [Smart Application Model](/docs/smart-application-model). The basic building blocks of this model are actions and applications. Usually you want to provide users with a set of actions that they can choose from. This kind of action grouping can be done with a scenario. The previous articles contain information for portal builders on how to organize actions into scenarios using the built-in method. This article describes the way for developers to create a custom scenario that uses a different algorithm for collecting actions.

## Steps

### 1. Create a new class

A custom scenario from a developer's point of view is a .Net class that inherits `SenseNet.ApplicationModel.GenericScenario`. We will create a scenario for managing Articles in an Article Section.

```csharp
[Scenario("ManageArticles")]
public class ManageArticlesScenario : GenericScenario
{
}
```

Notice the `Scenario` attribute on the class. It is used for providing a name for the scenario - if you want to provide a different name than the class name. If the class name is appropriate, you do not have to mark the class with the attribute.

#### Upgrade from previous versions

```diff
- Before sensenet ECM version 6.1.2, there was a possibility to override the Name property of the scenario. 
- During upgrade from previous versions you need to take the following steps:
- Remove the `Name` property override
- Add the `Scenario` attribute to the class and provide the same name as you did in the Name property before.
- Remove all the action and scenario type registrations from the unity section of the web.config and application configuration files, they are not needed anymore.
```

#### Include actions using the default behavior

We want to include the following actions in the scenario:

- **Edit** (application: _/Root/Sites/Default_Site/NewsDemo/(apps)/ArticleSection/Edit_)
- **Delete** (application: _/Root/(apps)/GenericContent/Delete_)

To achieve that, you have to add the name of the scenario (in our case ManageArticles) to the two applications' `Scenario` property. You can do that in [Content Explorer](/docs/content-explorer) on the Edit page of the two applications.

<div style="text-align: center;">
<img src="/docs/img/scenario/scenario-property.png" alt="Scenario property" width="600" border="0" />
</div>

### 2. Display the scenario

The scenario class above does nothing special, only the Edit and Delete actions will appear in the menu because of the default behavior of the built-in `GenricScenario` class. You can check that by modifying the following view:

- _/Root/Global/renderers/ArticleList.ascx_

Insert the following code snippet at the top of the view:

```xml
<sn:ContextInfo runat="server" Selector="CurrentContext" ID="myContext" />
<sn:ActionMenu ID="ArticlesMenu" runat="server" ContextInfoID="myContext" Text="Manage articles" Scenario="ManageArticles"></sn:ActionMenu>
```

The [ActionMenu](/docs/actionmenu) control above will display our scenario for the current context (selected by a [ContextInfo](/docs/context-info) control).

If you navigate to the _Internal News_ page (http://localhost/NewsDemo/Internal), you will see a _Manage articles_ menu at the top of the article list, containing the two actions you marked with the scenario name.

### 3. Collect actions

The real purpose of creating a custom scenario class is to include actions that otherwise would not be in the scenario. In our case we will add an _Add_ action to the scenario so that editors can create new articles in that article section from choosing a menu item.

To achieve that you need to expand the scenario class to override the `CollectActions` method. This is responsible for collecting the actions that will be displayed.

```csharp
[Scenario("ManageArticles")]
public class ManageArticlesScenario : GenericScenario
{
    protected override IEnumerable<ActionBase> CollectActions(
        ContentRepository.Content context, 
        string backUrl)
    {
        //collect regular actions using the base method
        var actList = base.CollectActions(context, backUrl).ToList();
 
        //check context and permissions
        if (context == null || !context.Security.HasPermission(PermissionType.AddNew))
            return actList;
 
        //create the action, and provide the type name as an additional parameter
        var act = ActionFramework.GetAction("Add", context, backUrl, new {ContentTypeName = "Article"});
 
        //customize action
        act.Text = "Add Article";
 
        actList.Add(act);
 
        return actList;
    }
}
```

If you build your code and check the Internal news page again, an _Add_ action will apear in the menu that you can use to add Articles to this Section.

<div style="text-align: center;">
<img src="/docs/img/scenario/scenario-with-add.png" alt="Scenario with Add" border="0" />
</div>

### 4. Use scenario parameters

Scenarios may use parameters to customize their behavior. This can be useful when you want to display the same scenario in different environments or the scenario needs information about its sorroundings (e.g. the portlet that resides in).

```diff
- It is important to know that if the scenario uses a parameter, it is not stateless anymore. 
- This means the system will have to create a new scenario object every time. 
- To tell this to the system you need to expand the scenario attribute on the class by a bool value (allow singleton behavior) that prevents the system re-using the same object: `[Scenario("ManageArticles", false)]`
```

#### Modify the scenario class

To use parameters you need to extract them during scenario initialization. The following code displays the full class that has a new property called Extended. If this parameter is set to true, we will add a _CopyTo_ action to the scenario.

```csharp
[Scenario("ManageArticles", false)]
public class ManageArticlesScenario : GenericScenario
{
    public bool Extended { get; private set; }
 
    protected override IEnumerable<ActionBase> CollectActions(
        ContentRepository.Content context, 
        string backUrl)
    {
        //collect regular actions using the base method
        var actList = base.CollectActions(context, backUrl).ToList();
 
        //check context and permissions
        if (context == null || !context.Security.HasPermission(PermissionType.AddNew))
            return actList;
 
        //find the Add application
        var app = ApplicationStorage.Instance.GetApplication(
            "Add", 
            context, 
            PortalContext.Current.DeviceName);
 
        //create the action, and provide the type name as an additional parameter
        //var act = app.CreateAction(context, backUrl, new { ContentTypeName = "Article" });
        var act = ActionFramework.GetAction("Add", context, backUrl, new {ContentTypeName = "Article"});
 
        //customize action
        act.Text = "Add Article";
 
        actList.Add(act);
 
        //use the given parameter
        if (Extended)
        {
            var extAction = ActionFramework.GetAction("CopyTo", context, backUrl);
            extAction.Text = "Copy section to...";
            actList.Add(extAction);
        }
 
        return actList;
    }
 
    public override void Initialize(Dictionary<string, object> parameters)
    {
        base.Initialize(parameters);
 
        if (parameters == null)
            return;
 
        if (parameters.ContainsKey("Extended"))
            Extended = Convert.ToBoolean(parameters["Extended"] as string);
    }
}
```

#### Add parameter to view

To add a parameter you only need to modify the action menu control statement we use to display the scenario. The ScenarioParameters property of the control takes key-value pairs that will be passed to the scenario. Though we use static parameters here, you can add new dynamic parameters too. See Portlet template replacer for more information.

```xml
<sn:ActionMenu ID="ArticlesMenu" runat="server" ContextInfoID="myContext" Text="Manage articles" Scenario="ManageArticles" ScenarioParameters="Extended=true"></sn:ActionMenu>
```

After you added the parameter abouve you should see the _Copy to_ action in the action menu on the Internal news page.

<div style="text-align: center;">
<img src="/docs/img/scenario/scenario-with-parameter.png" alt="Scenario with parameter" border="0" />
</div>