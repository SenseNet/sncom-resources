---

title: "Getting started with sensenet using MVC"
author: tusmester
image: "../img/posts/getting-started-with-mvc.jpg"
tags: [mvc, visual studio, nuget, getting started, controller, view, backend]

---

When you build a site with sensenet, you have many options when it comes to choosing a technology. This post walks you through a few easy steps to create your first **Asp.Net MVC** app with sensenet 7.0. It is a part of a series about the different client and server-side technologies and architectures when designing your first app.

---

This post will help you create your first **Asp.Net MVC** app with sensenet 7.0. For other possibilities please take a look at the following articles:

- [Starting out with ReactJs and Redux](/docs/tutorials/starting-out-with-reactjs)
- [Starting out with Aurelia](/blog/2018/01/10/starting-out-with-aurelia)

> This post is based on a tutorial, you can find the latest version in [this article](/docs/tutorials/starting-out-with-mvc).

## What will we build?
This MVC sample application will be a very simple CRUD app: it will display a dashboard with tasks assigned to the current user and another list for other users' tasks. It will also let users create and delete tasks.

This architecture means a web application with custom code added on the **server side in C# and cshtml**. For a Javascript single page application example please visit one of the links above.

![Dashboard](https://raw.githubusercontent.com/SenseNet/sensenet.github.io/master/img/posts/mvc-sample-dashboard.PNG)

When completing this short exercise, please try to focus on the sensenet-related parts - for example the way we search for content items and load them from the Content Repository, the way we create and modify content. We tried to keep everything else minimal so you can focus on the new stuff and not on the usual MVC-related parts.

#### Security out of the box
All the sensenet Content-related operations (like content Save or Load) are performed using the **permissions of the currently logged in user** - except when switching to the administrator for technical purposes, as we explain below. This means that the user will not be able to create or delete anything that he or she does not have permissions for.

## Prerequisites
You will need a basic MVC project to begin with and install one or more sensenet components. 

> For the purpose of this guide you will need the basic **sensenet Services** package and also the [WebPages](https://community.sensenet.com/docs/install-webpages-from-nuget/) component, because it will let you sign in easily and monitor the created content items.

There are two options here:

- Install [sensenet Services from NuGet](https://community.sensenet.com/docs/install-sn-from-nuget) and also the [WebPages](https://community.sensenet.com/docs/install-webpages-from-nuget/) component: this way you will create a brand new MVC application, pull in the necessary packages from NuGet and make a few modifications manually.
- Or you can copy one of the prebuilt [sensenet project templates](https://github.com/SenseNet/sn-vs-projecttemplates). Those templates contain the **same NuGet packages**, they just save you the time of manually installing them. Our suggestion is to start with the one that contains the [Services and WebPages](https://github.com/SenseNet/sn-vs-projecttemplates/tree/master/src/SnWebApplicationWithWebPages) packages. The steps in this case:
     1. copy the template
     2. build the solution
     3. execute the **same install commands** as at the end of the install guides above. These commands will create a database for you and import the necessary content items (please take a look at the install guides above for more details). In case you chose the two main packages, this means the following commands:

        ```
        snadmin install-services
        snadmin install-webpages
        ```

After the steps above, you will have an MVC application with sensenet 7.0 integrated. The remaining part of this article is about how to add a basic CRUD functionality for content items in Visual Studio.

> It is important to make sure when working with a sensenet web application that you shut down the application properly when you update the server code. This means stopping the IIS Express site so that sensenet can release the index write lock correctly - otherwise you would have to delete that file manually when you start the app next time.

![IISExpress sites](https://raw.githubusercontent.com/SenseNet/sensenet.github.io/master/img/posts/mvc-sample-iisexpress.PNG)

## Authentication
To demonstrate a use case for different users, this sample is designed to display Tasks for the current user and (in a different list) tasks for others. Asp.Net MVC authentication however is *not the scope of this guide*, so we will use the old built-in WebForms-based UI for signing in and possibly create new users for testing purposes.

We will not make use of the Asp.Net *Identity* feature, because currently there is no Identity storage implemented for sensenet (yet).

#### Modify the Login link
We need to change the default **Login** link in the header to redirect to the default sensenet main page that contains a login control. To do that, please modify the *_LoginPartial* view (in the *Shared* folder in VS): replace the Login action link at the bottom of the view with the following html link:

```html
<a id="loginLink" href="/Root/Sites/Default_Site">Login</a>
```

Start the site and click on the login link to verify that it leads you to the sensenet login page and you can log in with the default admin credentials (*admin/admin*).

#### Logout link and user name
For the **Logout** link to work and the signed-in user info to be correct, we have to modify the **form submit link** and the user link in the same *_LoginPartial* view in the case when the user is authenticated.

The final version of the view is the following:

```html
@using Microsoft.AspNet.Identity
@if (Request.IsAuthenticated)
{
    using (Html.BeginRouteForm("Default", new
    {
        ReturnUrl = ViewBag.ReturnUrl,
        controller = "Account",
        action = "LogOff"
    }, FormMethod.Post, new { id = "logoutForm", @class = "navbar-right" }))
    {
        @Html.AntiForgeryToken()

        <ul class="nav navbar-nav navbar-right">
            <li>
                @Html.MvcActionLink("Hello " + User.Identity.Name + "!", "Index", "Manage", routeValues: null, htmlAttributes: new { title = "Manage" })
            </li>
            <li><a href="javascript:document.getElementById('logoutForm').submit()">Log off</a></li>
        </ul>
    }
}
else
{
    <ul class="nav navbar-nav navbar-right">
        <li>@Html.MvcActionLink("Register", "Register", "Account", routeValues: null, htmlAttributes: new { id = "registerLink" })</li>
        <li><a id="loginLink" href="/Root/Sites/Default_Site">Login</a></li>
    </ul>
}
```

Notice the *BeginRouteForm* method above that we use to generate a correct link that redirects to the Logoff action in the built-in Account controller.

#### Logging off
For the logoff mechanism to work correctly, please modify the LogOff method in the *AccountController* class (*Controllers* folder in VS) to execute the sensenet logout logic.

```csharp
public ActionResult LogOff()
{
    SenseNet.Portal.Virtualization.AuthenticationHelper.Logout();
    return RedirectToLocal("/");
}
```

> The *AuthenticationHelper* class above provides methods for logging in and out, you can use them in your custom code too.

## Task view model
Our goal is to display tasks on the UI. For that we need a model for task items. Please create a new class named *TaskViewModel* in the *Models* folder in VS and fill it with the following class:

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using SenseNet.ContentRepository;
using SenseNet.ContentRepository.Storage.Security;

namespace SnWebApplication.Models
{
    public class TaskViewModel
    {
        public readonly Task Task;

        [Required]
        [Display(Name = "Short description")]
        public string DisplayName => Task?.DisplayName;

        [Display(Name = "Assigned to")]
        public string AssignedToText => SystemAccount.Execute(() => Task?.GetReference<User>("AssignedTo")?.DisplayName) ?? string.Empty;

        public DateTime DueDate => (DateTime)(Task?["DueDate"] ?? DateTime.MaxValue);

        public TaskViewModel(Task task)
        {
            Task = task;
        }
    }
}
```

The model above takes a sensenet Task instance in the constructor and exposes a few properties. There are several built-in strongly typed properties like DisplayName, and there is an extensive api for accessing dynamic properties - for example the *GetReference* method lets you load referenced content items, in this case the assignee user.

> Note that there are several other ways to create a model on top of sensenet content items - for example you can create a model that wraps a *Content* object instead of a strongly-typed business object like Task above (that will let you work with the field layer instead of strongly typed properties). Or you can even use these types (Task or Content) *as your model*, without creating a model class.

> The **SystemAccount.Execute** call above is necessary for cases when the current user does not necessarily have permissions for a *referenced content* - in this case the assigned user. This is a trick for loading data from the repository as an administrator and displaying only the required info to the user.

## Dashboard view model
To serve the task lists to the view, we create a view model for the dashboard. Please create a new class in the *Models* folder in VS and name it *DashboardViewModel*

```csharp
using SenseNet.ContentRepository;
using SenseNet.Search;
using System.Collections.Generic;
using System.Linq;

namespace SnWebApplication.Models
{
    public class DashboardViewModel
    {
        public IEnumerable<TaskViewModel> MyTasks => Content.All
            .Where(c => c.TypeIs("Task") && (User) c["AssignedTo"] == (User)User.Current).Take(20).AsEnumerable()
            .Select(t => new TaskViewModel((Task)t.ContentHandler));

        public IEnumerable<TaskViewModel> OthersTasks => ContentQuery
            .Query("+TypeIs:Task -AssignedTo:@@CurrentUser@@ .TOP:20").Nodes.Cast<Task>()
            .Select(t => new TaskViewModel(t));
    }
}
```

> Note that we expose **two Task model lists** here as properties. One of them (My tasks) is implemented using the [LINQ to sensenet](http://wiki.sensenet.com/LINQ_to_Sense/Net) technique, the other one executes a simple [Content Query](http://wiki.sensenet.com/Content_Query_syntax) for task content items. The result is very similar in the background, you may choose either of them when searching for content items.

## Dashboard controller
The next step is to create a controller for serving the UI the necessary views. Create a new empty controller named *DashboardController* in Visual Studio (*Controllers* folder) and fill it with the following code:

```csharp
using System.Web.Mvc;
using SnWebApplication.Models;

namespace SnWebApplication.Controllers
{
    public class DashboardController : Controller
    {
        public string SitePath { get; } = "/Root/Sites/Default_Site";
        public string TaskListName { get; } = "Tasks";
        public string TaskListPath => SitePath + "/" + TaskListName;

        // GET: Dashboard
        public ActionResult Index()
        {
            return View(new DashboardViewModel());
        }
    }
}
```

The initial Index action simply returns a view. We will fill this class with additinal action methods later for POST requests.

## Dashboard view
To create views for the dashboard, please create a new folder named *Dashboard* in the *Views* folder in VS.

Create an empty *Index* view in the Dashboard folder without a layout page, and fill it with this initial markup:

```html
@{
    ViewBag.Title = "Dashboard";
}

@model SnWebApplication.Models.DashboardViewModel

<h2>@ViewBag.Title</h2>
<h3>@ViewBag.Message</h3>

<div class="row">
    <div class="col-md-4">
        <h3>My tasks</h3>

        <table>
            <thead><tr><th>To do</th><th>Due date</th></tr></thead>
            <tbody>
                @foreach (var task in this.Model.MyTasks)
                {
                    <tr>
                        <td>@task.DisplayName</td>
                        <td>@task.DueDate</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>

    <div class="col-md-4">
        <h3>More tasks</h3>
        <table>
            <thead><tr><th>To do</th><th>Due date</th><th>Assigned to</th></tr></thead>
            <tbody>
                @foreach (var task in this.Model.OthersTasks)
                {
                    <tr>
                        <td>@task.DisplayName</td>
                        <td>@task.DueDate</td>
                        <td>@task.AssignedToText</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>
```

### Dashboard link
To access the dashboard page, please insert a link to the header in the *_Layout.cshtml* file (around line 27)

```html
<li>@Html.MvcActionLink("Dashboard", "Index", "Dashboard")</li>
```

When you start the site, you should be able to log in and visit the dashboard page using the new link in the header. It will contain no tasks yet, so we need to add the possibility for the user to manage tasks.

## Adding and Deleting a Task
### Update the task view model
Let's add a few things to the task view model so that it becomes capable of handling task creation. Please modify the *TaskViewModel* class that we created above to its final form:

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using SenseNet.ContentRepository;
using SenseNet.ContentRepository.Storage.Security;
using SenseNet.Search;

namespace SnWebApplication.Models
{
    public class TaskViewModel
    {
        public readonly Task Task;

        private int _id;
        public int Id
        {
            get { return _id > 0 ? _id : Task?.Id ?? 0; }
            set { _id = value; }
        }

        private string _displayName;
        [Required]
        [Display(Name = "Short description")]
        public string DisplayName
        {
            get { return _displayName ?? Task?.DisplayName; }
            set
            {
                if (Task != null)
                    Task.DisplayName = value;

                _displayName = value;
            }
        }

        private string _description;
        [Display(Name = "Details")]
        public string Description
        {
            get { return _description ?? Task?.Description; }
            set
            {
                if (Task != null)
                    Task.Description = value;

                _description = value;
            }
        }

        [Display(Name = "Assigned to")]
        public string AssignedToText => SystemAccount.Execute(() => Task?.GetReference<User>("AssignedTo")?.DisplayName) ?? string.Empty;

        private int _assignedTo;
        [Display(Name = "Assigned to")]
        public int AssignedToId
        {
            get { return _assignedTo > 0 ? _assignedTo : SystemAccount.Execute(() => Task?.GetReference<User>("AssignedTo")?.Id) ?? 0; }
            set { _assignedTo = value; }
        }

        public DateTime DueDate => (DateTime)(Task?["DueDate"] ?? DateTime.MaxValue);

        public static IEnumerable<User> Users => ContentQuery.Query("+TypeIs:User .SORT:Name .TOP:10").Nodes.Cast<User>();

        public TaskViewModel()
        {
            
        }
        public TaskViewModel(Task task)
        {
            Task = task;
        }
    }
}
```

The new properties make it easier to build a UI for creating new tasks - for example selecting a person that the task is assigned to.

### Adding the Create and Delete views
Add new empty view in the *Views/Dashboard* folder and name it *Create*.

```html
@{
    ViewBag.Title = "Create task";
}
@using SnWebApplication.Models
@model TaskViewModel

<h2>@ViewBag.Title</h2>

<div class="row">
    <div class="col-md-8">
        <section id="loginForm">
            @using (Html.BeginRouteForm("Default", new RouteValueDictionary
            {
                {"controller", "Dashboard"},
                {"action", "Create"}
            }, FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
            {
                @Html.AntiForgeryToken()
                <div class="form-group">
                    @Html.LabelFor(m => m.DisplayName, new { @class = "col-md-2 control-label" })
                    <div class="col-md-10">
                        @Html.TextBoxFor(m => m.DisplayName, new { @class = "form-control" })
                        @Html.ValidationMessageFor(m => m.DisplayName, "", new { @class = "text-danger" })
                    </div>
                </div>
                <div class="form-group">
                    @Html.LabelFor(m => m.AssignedToId, new { @class = "col-md-2 control-label" })
                    <div class="col-md-10">
                        @Html.DropDownList("AssignedToId",
                            TaskViewModel.Users.Select(u => new SelectListItem
                            {
                                Text = u.DisplayName,
                                Value = u.Id.ToString(),
                                Selected = u.Id == SenseNet.ContentRepository.User.Current.Id
                            }),
                            null,
                            new { @class = "form-control" })
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input type="submit" value="Create" class="btn btn-default" />
                    </div>
                </div>
            }
        </section>
    </div>
</div>
```

This view shows a form with a few task fields to fill. For example there is a **dropdown list** containing the users coming from the task view model property.

Create another view named *Delete* in the *Views/Dashboard* folder with the following contents:

```html
@{
    ViewBag.Title = "Delete task";
    ViewBag.Message = "Are you sure you want to delete this task?";
}
@using SnWebApplication.Models
@model TaskViewModel

<h2>@ViewBag.Title</h2>
<h3>@ViewBag.Message</h3>

<div class="row">
    <div class="col-md-8">
        <section id="loginForm">
            @using (Html.BeginRouteForm("Default", new RouteValueDictionary
            {
                {"controller", "Dashboard"},
                {"action", "Delete"},
                { "Id", Model.Id }
            }, FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
            {
                @Html.AntiForgeryToken()
                <div class="form-group">
                    @Html.LabelFor(m => m.DisplayName, new { @class = "col-md-2 control-label" })
                    <div class="col-md-10">
                        @Model.DisplayName
                    </div>
                </div>
                <div class="form-group">
                    @Html.LabelFor(m => m.AssignedToText, new { @class = "col-md-2 control-label" })
                    <div class="col-md-10">
                        @Model.AssignedToText
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-2 col-md-10">
                        <input type="submit" value="Delete" class="btn btn-default" />
                        @Html.MvcActionLink("Cancel", "Index", "Dashboard")
                    </div>
                </div>
            }
        </section>
    </div>
</div>
```

The *Delete* view above uses the *BeginRouteForm* extension method to build a form url that contains the **id of the task** to be deleted.

### Add new methods to the controller
To display the Create and Delete views and to perform the actual operations, you will have to add a few methods to the *DashboardController* class. The final form of the controller is the following:

```csharp
using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using SNCR = SenseNet.ContentRepository;
using SenseNet.ContentRepository.Storage;
using SenseNet.ContentRepository.Storage.Security;
using SnWebApplication.Models;

namespace SnWebApplication.Controllers
{
    public class DashboardController : Controller
    {
        public string SitePath { get; } = "/Root/Sites/Default_Site";
        public string TaskListName { get; } = "Tasks";
        public string TaskListPath => SitePath + "/" + TaskListName;

        // GET: Dashboard
        public ActionResult Index()
        {
            return View(new DashboardViewModel());
        }

        // GET: Dashboard/Create
        public ActionResult Create()
        {
            return View(new TaskViewModel());
        }

        // POST: Dashboard/Create
        [HttpPost]
        public ActionResult Create(TaskViewModel taskViewModel)
        {
            try
            {
                var parent = Node.LoadNode(TaskListPath);
                if (parent == null)
                {
                    // create the container if does not exist
                    using (new SystemAccount())
                    {
                        var list = SNCR.Content.CreateNew("TaskList", Node.LoadNode(SitePath), TaskListName);
                        list.Save();

                        parent = list.ContentHandler;
                    }
                }

                // build and save the new task
                var task = SNCR.Content.CreateNew("Task", parent, null);
                task.DisplayName = taskViewModel.DisplayName;
                task["Description"] = taskViewModel.Description;
                task["DueDate"] = DateTime.Now.AddDays(1);
                task["AssignedTo"] = Node.LoadNode(taskViewModel.AssignedToId);
                task.Save();

                return RedirectTo("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Dashboard/Delete/5
        public ActionResult Delete(int id)
        {
            // find the task using LINQ to sn
            var task = SNCR.Content.All.FirstOrDefault(c => c.Id == id && c.TypeIs("Task"));

            // display the confirm delete view
            return task == null
                ? View()
                : View(new TaskViewModel(task.ContentHandler as SNCR.Task));
        }

        // POST: Dashboard/Delete/5
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeletePost(int id)
        {
            try
            {
                if (id > 0)
                    SNCR.Content.DeletePhysical(id);

                return RedirectTo("Index");
            }
            catch
            {
                return View();
            }
        }

        private ActionResult RedirectTo(string actionName)
        {
            // this is a helper method for simplifying redirects
            return RedirectToRoute("Default", new RouteValueDictionary
            {
                {"controller", "Dashboard"},
                {"action", actionName}
            });
        }
    }
}
```

The Create action receives a task view model filled with the data from the client. It makes sure that the **parent container (the Task List) exists** before adding a new task.

The new task's fields are filled from the model and the new content is saved into the Content Repository. All **database operations**, **indexing** and **security checks** will happen under the hood, you do not have to do anything else, just fill the fields and call the Save method.

![Create a task](https://raw.githubusercontent.com/SenseNet/sensenet.github.io/master/img/posts/mvc-sample-create.PNG)

The *DeletePost* method (note that we had to name it differently to avoid a name collision) is simple: it deletes the content with the provided id - it does not even have to load it from the db.

### Extend the Dashboard Index view
To display links for the new Create and Delete actions above, please modify the *Index.cshtml* file in the Views/Dashboard folder to its final form:

```html
@{
    ViewBag.Title = "Dashboard";
}
@using SenseNet.ContentRepository.Storage.Security
@using SenseNet.Portal.Helpers
@model SnWebApplication.Models.DashboardViewModel

<h2>@ViewBag.Title</h2>
<h3>@ViewBag.Message</h3>

<div class="row">
    <div class="col-md-4">
        @Html.MvcActionLink("New task", "Create", "Dashboard")
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <h3>My tasks</h3>

        <table>
            <thead><tr><th>To do</th><th>Due date</th><th></th></tr></thead>
            <tbody>
                @foreach (var task in this.Model.MyTasks)
                {
                    <tr>
                        <td>@task.DisplayName</td>
                        <td>@task.DueDate</td>
                        <td>
                            @if (task.Task?.Security.HasPermission(PermissionType.Delete) ?? false)
                            {
                                @Html.RouteLink("Delete", "Default", new RouteValueDictionary
                                {
                                    {"controller", "Dashboard"},
                                    {"action", "Delete"},
                                    {"Id", @task.Id}
                                })
                            }
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>

    <div class="col-md-4">
        <h3>More tasks</h3>
        <table>
            <thead><tr><th>To do</th><th>Due date</th><th>Assigned to</th><th></th></tr></thead>
            <tbody>
                @foreach (var task in this.Model.OthersTasks)
                {
                    <tr><td>@task.DisplayName</td><td>@task.DueDate</td><td>@task.AssignedToText</td>
                        <td>
                            @if (task.Task?.Security.HasPermission(PermissionType.Delete) ?? false)
                            {
                                @Html.RouteLink("Delete", "Default", new RouteValueDictionary
                                {
                                    {"controller", "Dashboard"},
                                    {"action", "Delete"},
                                    {"Id", @task.Id}
                                })
                            }
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>
```

We added a Create link at the top and Delete links to the tables on both sides. 

If you successfully completed the steps above, you will be able to manage Tasks on the Dashboard of your first sensenet MVC site!

## What's next?
The example above is very simple and limited. In the future we would like to add more helpers to simplify the creation of **route links** in cshtml files and new components for aiding **authentication**.

Please experiment with the code, try to use your own MVC techniques and [contact us](https://community.sensenet.com/contact/) if you stuck at some point or need a new feature!

Photo by [Cam Adams](https://unsplash.com/photos/imBSxksI7DA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/start?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
