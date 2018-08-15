---
title: "Getting started with MVC actions"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/getting-started-mvc-actions.md'
category: Tutorials
index: 0
version: v7.0
tags: [mvc, getting started, controller, view, backend]
description: Tutorial for adding actions to your first sensenet MVC application.
---

# Getting started with MVC actions
This article is a part of a series about the different client and server-side technologies and architectures when designing your first app.

In this tutorial you'll learn how to add basic actions (controllers and views) to your **Asp.Net MVC application** that you already extended with sensenet. We assume you already visited the article about building an [MVC application with sensenet](/docs/tutorials/starting-out-with-mvc).

> You'll need at least the installation and authentication (login/logout) part from the tutorial above to make this work.

This article is for server-side MVC developers. If you would like to work with a client-side technology, please visit the following tutorial:

- [Starting out with ReactJs and Redux](/docs/tutorials/starting-out-with-reactjs)

## What will we build?
The examples in this article may be a part of an [MVC application](/docs/tutorials/starting-out-with-mvc) where content items need to be created, managed and deleted. We will work with tasks: there will be a dashboard (basically a grid) for tasks where the user has an option to create new tasks or complete and delete existing ones.

![Dashboard](/docs/img/tutorials/mvc-sample-tasks.png)

When completing this short exercise, please try to focus on the sensenet-related parts - for example the way we search for content items and load them from the Content Repository, the way we create and modify content. We tried to keep everything else minimal so you can focus on the new stuff and not on the usual MVC-related parts.

### Artifacts
During this tutorial we will create the following new items in your application:

- Task controller
- Task view model
- Task views
   - Create
   - Delete

> Please note that although we are working with MVC controllers and methods in this article, you may use **Web API controllers** and methods as well.

## Task view model
Our goal is to display tasks on the UI. For that we need a model for task items. Please create a new class named *TaskViewModel* in the *Models* folder in VS and fill it with the following class:

> The code samples in this article require C# 7.2, but you may convert the code to support lower versions easily.

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

        private int _id;
        public int Id
        {
            get => _id > 0 ? _id : Task?.Id ?? 0;
            set => _id = value;
        }

        private string _displayName;
        [Required]
        [Display(Name = "Short description")]
        public string DisplayName
        {
            get => _displayName ?? Task?.DisplayName;
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
            get => _description ?? Task?.Description;
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
            set => _assignedTo = value;
        }

        public DateTime DueDate => (DateTime)(Task?["DueDate"] ?? DateTime.MaxValue);

        public TaskViewModel() { }
        public TaskViewModel(Task task)
        {
            Task = task;
        }
    }
}
```

The view model above is designed to be able to work with or without an existing sensenet Task object as well.

In case of an existing task: it takes a Task instance in the constructor and exposes a few properties. There are several built-in strongly typed properties like DisplayName, and there is an extensive API for accessing dynamic properties - for example the *GetReference* method lets you load referenced content items, in this case the assignee user.

> Note that there are several other ways to create a model on top of sensenet content items - for example you can create a model that wraps a *Content* object instead of a strongly-typed business object like Task above (that will let you work with the field layer instead of strongly typed properties). Or you can even use these types (Task or Content) *as your model*, without creating a model class.

> The **SystemAccount.Execute** call above is necessary for cases when the current user does not necessarily have permissions for a *referenced content* - in this case the assigned user. This is a trick for loading data from the repository as an administrator and displaying only the required info to the user.

## Task controller
The central item of this tutorial is the controller responsible for managing Tasks. Create this in the usual _Controllers_ folder in Visual Studio.

```csharp
using System;
using System.Web.Mvc;
using System.Web.Routing;
using SenseNet.ContentRepository.Storage;
using SnWebApplication.Models;
using SNCR = SenseNet.ContentRepository;

namespace SnWebApplication.Controllers
{
    public class TaskController : Controller
    {
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
                // this container has to exist
                var parent = Node.LoadNode("/Root/Sites/Default_Site/TestWorkspace/Tasks");

                // build and save the new task
                var task = SNCR.Content.CreateNew("Task", parent, null);
                task.DisplayName = taskViewModel.DisplayName;
                task["Description"] = taskViewModel.Description;
                task["DueDate"] = DateTime.Now.AddDays(1);
                task["AssignedTo"] = Node.LoadNode(taskViewModel.AssignedToId);
                task.Save();

                return RedirectToHome();
            }
            catch
            {
                return View();
            }
        }

        // GET: Task/Delete/5
        [ActionName("Complete")]
        public ActionResult Complete(int id)
        {
            // "completed" is one of the existing valid options for the 
            // Status field, please check the Task CTD for other options.

            var task = SNCR.Content.Load(id);
            task["Status"] =  "completed";
            task.Save();

            return RedirectToHome();
        }

        // GET: Task/Delete/5
        [ActionName("Delete")]
        public ActionResult Delete(int id)
        {
            return View(SNCR.Content.Load(id));
        }

        // POST: Task/Delete/5
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeletePost(int id)
        {
            if (id > 0)
                SNCR.Content.DeletePhysical(id);

            return RedirectToHome();
        }

        private ActionResult RedirectToHome()
        {
            return RedirectTo("Index");
        }
        private ActionResult RedirectTo(string actionName)
        {
            // this is a helper method for simplifying redirects
            return RedirectToRoute("Default", new RouteValueDictionary
            {
                {"controller", "Home"},
                {"action", actionName}
            });
        }
    }
}
```

Let's go through the action methods one by one.

#### Create
The first (GET) Create method is responsible for providing a view for new tasks, there is no sensenet-specific stuff here, only the view model we created above.

The POST Create method is more interesting: it receives a view model filled by the user and uses its properties to create a new Task content in the repository.

This is one way to create a content: it works with the _Content layer_, which is a generic API for managing items in the repository. Another option is to create a strongly typed business object (in this case a _Task_) and fill its properties. The end result is the same: the system creates a new content in the repository in a previously existing Tasks list.

> **Important**: although you can access the strongly typed [content handler object](/docs/content-handler) (in this case a Task) inside the [Content object](/docs/content) through the `content.ContentHandler` property, please make sure you work with either the content or the business object: **do not use both at the same time** when you need to _save_ content items, as it may lead to unwanted behavior.

#### Complete
The Complete action shows how you can work with content items in MVC: just load them by id and modify the content or call any method on it. For example you may add an extension method to complete a task using a single call (instead of modifying a field like above), you may change fields, check permissions, start a workflow or make a versioning action call - anything provided by the server-side C# API of sensenet.

#### Delete
The GET Delete method is a bit different from Create: the View takes a `Content` object as a model and displays field values to the user - see the view source code later.

The POST version of the Delete method is an example for when you do not even have to load the content itself: just use the static API for deleting the content.

## Task views
We will create two views for tasks: one for creating a new Task and one for confirming the Delete operation. Please create them in the _Views/Task_ folder in Visual Studio.

### Create
Please note that the Model of this view is `TaskViewModel`, the class we created before.

```html
@{
    ViewBag.Title = "Create task";
}

@using SenseNet.ContentRepository
@model SnWebApplication.Models.TaskViewModel

<h2>@ViewBag.Title</h2>

<div class="row">
    <div class="col-md-8">
        <section id="loginForm">
            @using (Html.BeginRouteForm("Default", new RouteValueDictionary
            {
                {"controller", "Task"},
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
                                 Content.All.DisableAutofilters().Where(c => c.TypeIs("User")).AsEnumerable().Select(u => new SelectListItem
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

This view displays a form to fill: a task description and an assignee. Note the way we fill the assignee dropdown: we execute a [content query](/docs/content-query) using **LINQ** for available users.

### Delete
The Model of this view is a `Content` object instead of a special view model: we need it only for the id, that is the only thing we want to POST to the server when the user submits the form.

```html
@{
    ViewBag.Title = "Delete task";
    ViewBag.Message = "Are you sure you want to delete this task?";
}

@model SenseNet.ContentRepository.Content

<h2>@ViewBag.Title</h2>
<h3>@ViewBag.Message</h3>

<div class="row">
    <div class="col-md-8">
        <section id="loginForm">
            @using (Html.BeginRouteForm("Default", new RouteValueDictionary
            {
                {"controller", "Task"},
                {"action", "Delete"},
                { "Id", Model.Id }
            }, FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
            {
                @Html.AntiForgeryToken()
                <div class="form-group">
                    <div class="col-md-10">
                        @Model.DisplayName
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-0 col-md-10">
                        <input type="submit" value="Delete" class="btn btn-default" />
                        @Html.MvcActionLink("Cancel", "Index", "Home")
                    </div>
                </div>
            }
        </section>
    </div>
</div>
```

## Displaying the task list
You may add the following grid HTML anywhere in your application, even on the main page. It lists Tasks objects (for simplicity: only the first few of them) along with the actions we created above: _Delete_ and _Complete_.

```html
<h2>Tasks</h2>
@Html.MvcActionLink("New task", "Create", "Task")
<p></p>
<table>
    <thead><tr><th style="width: 200px;">To do</th><th>Due date</th><th style="width: 200px;"></th></tr></thead>
    <tbody>
        @foreach (var task in Content.All.Where(c => c.TypeIs("Task")).OrderBy(c => c["DueDate"]).Take(10))
        {
            <tr>
                <td>@task.DisplayName</td>
                <td>@task["DueDate"]</td>
                <td>
                    @if (task.Security.HasPermission(PermissionType.Delete))
                    {
                        @Html.RouteLink("Delete", "Default", new RouteValueDictionary
                                {
                                    {"controller", "Task"},
                                    {"action", "Delete"},
                                    {"Id", @task.Id}
                                })
                    }
                    @if (((List<string>)task["Status"])?.FirstOrDefault() != "completed")
                    {
                        @Html.RouteLink("Complete", "Default", new RouteValueDictionary
                        {
                            {"controller", "Task"},
                            {"action", "Complete"},
                            {"Id", @task.Id}
                        })
                    }
                </td>
            </tr>
        }
    </tbody>
</table>
```

Note that the view checks for permissions in case of the Delete action and the value of the `Status` field of every task whether to display the action or not. These are just examples of how can you make your UI more streamlined and work as expected.

## What's next?
The example above is very simple and limited. In the future we would like to add more helpers to simplify the creation of **route links** in cshtml files and new components for aiding **authentication**.

Please experiment with the code, try to use your own MVC techniques and [contact us](https://community.sensenet.com/contact/) if you stuck at some point or need a new feature!