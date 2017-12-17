---

title: "Starting out with sensenet ECM using MVC"
author: tusmester
image: "../img/posts/sensenetecm-mvc.png"
tags: [mvc, getting started, controller, view]

---

When you build a site with sensenet ECM, you have many options when it comes to choosing a technology. This post is a part of a series about the different client and server-side technologies and architectures when designing your first app.

---

This post walks you through a few easy steps to create your first **Asp.Net MVC** app with sensenet ECM 7.0. For other possibilities please take a look at the following articles:

- [Starting out with ReactJs and Redux](https://community.sensenet.com/blog/2017/12/12/starting-out-with-sensenet-ECM-using-reactjs-and-redux)
- [Starting out with Aurelia](https://community.sensenet.com/blog/2017/12/27/starting-out-with-sensenet-ECM-using-aurelia)

## What will we build?
This MVC sample application will be a very simple CRUD app: it will display a dashboard with tasks assigned to the current user and another list for other users' tasks. It will also let users create and delete tasks.

This architecture means a web application with custom code added on the **server side in C# and cshtml**. For a Javascript single page application example please visit one of the links above.

## Prerequisites
You will need a basic MVC project to begin with and install one or more sensenet ECM components. 

> For the purpose of this guide you will need the basic **sensenet Services** package and also the [WebPages](https://community.sensenet.com/docs/install-webpages-from-nuget/) component, because it will let you sign in easily and monitor the created content items.

There are two options here:

- Install [sensenet ECM Services from NuGet](https://community.sensenet.com/docs/install-sn-from-nuget) and also the [WebPages](https://community.sensenet.com/docs/install-webpages-from-nuget/) component: this way you will create a brand new MVC application, pull in the necessary packages from NuGet and make a few modifications manually.
- Or you can copy one of the prebuilt [sensenet ECM project templates](https://github.com/SenseNet/sn-vs-projecttemplates). Those templates contain the **same NuGet packages**, they just save you the time of manually installing them. Our suggestion is to start with the one that contains the [Services and WebPages](https://github.com/SenseNet/sn-vs-projecttemplates/tree/master/src/SnWebApplicationWithWebPages) packages. The steps in this case:
     1. copy the template
     2. build the solution
     3. execute the **same install commands** as at the end of the install guides above. These commands will create a database for you and import the necessary content items (please take a look at the install guides above for more details). In case you chose the two main packages, this means the following commands:

        ```
        snadmin install-services
        snadmin install-webpages
        ```

After the steps above, you will have an MVC application with sensenet ECM 7.0 integrated. The remaining part of this post is about how to add a basic CRUD functionality for content items in Visual Studio.

## Authentication
To demonstrate a use case for different users, this sample is designed to display Tasks for the current user and (in a different list) tasks for others. Asp.Net MVC authentication however is *not the scope of this guide*, so we will use the old built-in WebForms-based UI for signing in and possibly create new users for testing purposes.

We will not make use of the Asp.Net *Identity* feature, because currently there is no Identity storage implemented for sensenet ECM (yet).

#### Modify the Login link
We need to change the default Login link in the header to redirect to the default sensenet ECM main page that contains a login control. To do that, please modify the *XXXXXXXXXXXX* view:

```cshtml
<sample>
```

## Create the Dashboard controller
## Create the Dashboard view
## Adding a new Task
## Editing a Task
## Deleting a Task

## What's next?