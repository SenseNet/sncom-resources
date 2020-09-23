---

title: "Autumn happenings in sensenet frontend-ville"
author: [gallayl, herflis]
image: "../img/posts/frontend-ville.jpg"
tags: [javascript, typescript, frontend development, redux, roadmap]

---

Busy weeks behind us at the frontend division of the sensenet team. New features on the backend and our in-progress [DMS MVP](https://sn-react-dms.netlify.com/) generated tons of tasks and gave us many improvement points. But now we've released all these new stuff, so we can lay back a bit and sum up what's done. Join us in checking-out the latests and maybe you'll catch a bit about the upcomings.

---

## sn-client-js 3.0.0

[sn-client-js](https://github.com/SenseNet/sn-client-js) is the core - and a main entry point - of our client side packages. It contains logic about interacting with a Repository, authentication, querying and has the built-in content types bundled.

### Cleaning up the concepts of a Content Type

Typescript Content Types can be generated from the sensenet Backend and are useful if you want to write *strongly typed Typescript* code. In the previous releases, Content Types was inherited from the Content class (which is a rich domain model driven representation of a Content instance). For Example, the User inheritance looked like:

Content **&rarr;** GenericContent **&rarr;** User

Now we've extracted our *Content* (now *ContentInternal*) class from the inheritance chain and created a Type Alias called 'Content<T>' - this one is an Union Type of *ContentInternal* and the specified Type. There are some of the many benefits of this change
 - If you are using plain JavaScript, you don't even have to care about Content Types (except when creating a Content)
 - We could remove *all* logics from the generated Content Type Definitions. That means roughly 1000 lines of code :)
 - Using your own custom Content Types will be much easier. You only have to define a new Typescript class that implements IContent and you can use it

 ![Using a custom Content Type cannot be more simple](/img/posts/sn-client-300-custom-content-types.gif "Using a custom Content Type cannot be more simple")


### Repository bound schemas

ContentTypes and Schemas both describe content. At the moment Schemas are used for dynamic form generation and validation. Schemas - unlike ContentTypes - can change at runtime. Right after you change a Content Type Definition (e.g. add a new required field in the old Explore, or maybe in one of the future release of our admin GUI ;)) you will expect that the next content you create will pick up the change.
At the moment Schemas are generated as well, but from now on they are used only as *defaults*. Repository instances have their own *Schema stores* and their content can be *replaced*. We plan to add a live Schema reload feature in an upcoming release.

### Upload

We've added the chunked upload feature in version 2.5.0, now we improved it. We have three endpoints for Upload. With *repository.UploadFile()* you can upload a simple File object from a form or Drop event, with *repository.UploadTextAsFile()* you can save a string as a binary and finally *repository.UploadFromDropEvent()* lets you upload a whole file list or subtree with directories from a simple Drop event. Upload event works with *rx/js observables*, so it's easy to track the upload progress info based on the finished chunks.
Upload options has been extended with additional OData parameters in this release. They are useful if you want to specify fields to select or expand when the Upload finishes, so you don't have to reload the File content manually.

### Batch actions

Batch actions (copy, move and delete) have been improved on both back- and frontend. Now the client will receive a verbose response - per operation - and can trigger exactly the same repository events as for single operations. Let's take a look at the example *batch copy* operation response.
```json
{
   "d": {
       "__count": 3,
       "results": [
          { "Id": 101, "Path": "Root/Workspace/DocLib", "Name": "a" }
          { "Id": 102, "Path": "Root/Workspace/DocLib", "Name": "b" }
       ],
       "errors": [{
          "content": { "Id": 103, "Path": "Root/Workspace/DocLib", "Name": "C" },
          "error": {
              "code": "NotSpecified",
              "exceptiontype": "Exception",
              "message": {
                  "lang": "en-us",
                  "value": "Error message value"
              },
              "innererror": {
                  "trace": "InnerError Trace value"
              }
          }
       }]
     }
}
```
The operation above will fire two **repository.Events.OnContentCreated** events and an additional **repository.Events.OnContentCreateFailed** for a single HTTP request.

But what can you do with batch operations and [repository events](/api/sn-client-js/classes/repository.repositoryeventhub.html)?

Imagine some separate components (e.g. a *tree*, a *content list* and a *breadcrumbs*, like a file explorer) attached to the same repository and some batch move / delete / copy operations. Synchronizing content can be hard. You have to avoid additional web requests and component reinits but update them with the changes - that's where repository events come handy. You can load the component data once and *subscribe* to an event inside your component. Once it's done you can handle changes incrementally - without additional requests or reloads:

```typescript

// an array to store the actual subscriptions
private Subscriptions: Subscription[] = [];

// once the component is attached, load it's data once then update it incrementally
async attached(){
    await this.LoadInitialData();
    const events = this.Repository.Events;
    this.Subscriptions.push(this.events.OnContentCreated.subscribe(created => this.handleContentCreated(created)));
    this.Subscriptions.push(this.events.OnContentDeleted.subscribe(deleted => this.handleContentDeleted(deleted)));
    this.Subscriptions.push(this.events.OnContentModified.subscribe(modified => this.handleContentModified(modified)));
    this.Subscriptions.push(this.events.OnContentMoved.subscribe(move => this.handleContentMoved(move)));
}

// ...and don't forget to clean up :)
detached() {
    this.Subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
    this.Subscriptions = [];
}
```

![A batch move example with a tree and a list](/img/posts/sn-client-300-batchmove.gif "A batch move example with a tree and a list")

### OAuth

We've added OAuth provider support for the JWT Authentication service. This means that you can implement and add your own OAuth provider - just like we did it in [sn-client-auth-google](https://github.com/SenseNet/sn-client-auth-google) 

## sn-client-auth-google 1.0.0

This package is our first official client-side OAuth provider. It requires sensenet ^7.0.0 with an installed SN7 [OAuth provider](https://github.com/SenseNet/sn-oauth-google) and a [Google API Console project](https://developers.google.com/identity/sign-in/web/devconsole-project). You can use it with or without the official [Google Platform Library](https://developers.google.com/identity/sign-in/web/sign-in) or any third party component that can retrieve an *id_token*.

We've focused on keeping this library straightforward and easy-to-use, hopefully you can integrate it within a few minutes - after checking an example in the [readme](https://github.com/SenseNet/sn-client-auth-google).
![Simple and straightforward OAuth login with sensenet and Google](/img/posts/sn-client-300-google-oauth2.gif "Simple and straightforward OAuth login with sensenet and Google")


## sn-redux 3.4.0

[sn-redux](https://github.com/SenseNet/sn-redux) always keeps an eye on [sn-client-js](https://github.com/SenseNet/sn-client-js), we're working mostly in parallel and this is how it happened this time. Learn how the new features were added and what and how you can achieve with them.

### Upload

There're three new actions to handle the upload related stuff. One for an upload request (can only handle one file at once), one for handling if a file was uploaded successfully and one for the upload failure. The upload functionality is implemented in the related reducers too, so if a new file was uploaded, its id is added to the ```ids``` array and the ```entities``` object will contain the new content. Of course there's a new [redux-observable](https://redux-observable.js.org/) epic handling the ajax request in the background, so to have the upload functionality you simply have to call the upload action:

```typescript
Actions.UploadRequest(content, file)
```

Param ```content``` is the parent content object and ```file``` is the file that should be uploaded.

Learn more about upload in sn-redux in the [API references](https://www.sensenet.com/Root/Sites/sensenet.com/documentation/sn-redux/modules/_actions_.actions.html#uploadrequest). 

### Batch actions

From now on batch operations are also supported in [sn-redux](https://github.com/SenseNet/sn-redux) with three new actions apiece for handling requests, operation successes and failures. Because batch operations' responses could be mixed (some content could be uploaded and some could not) a new reducer called ```batchResponses``` is added to hold the custom response and the error. At the background three new epics handle the processes. 

Learn more about the batch operations in [sn-redux](https://github.com/SenseNet/sn-redux) in the [API references](https://www.sensenet.com/Root/Sites/sensenet.com/documentation/sn-redux/index.html). 

### OAuth

Since the needed provider was ready both on the backend and in sn-client-js it was a must to add an action to handle login (and registration) with Google account in sn-redux too. However the after-login process is the same a new epic called ```userLoginGoogleEpic``` is created. This new epic is subscribed to the new login request action but if it was responded successfully or if it was failed it dispatches the same actions that are used in the simple login process. 

## What's next?

![Got stuff to do, can't talk now](/img/posts/busy.gif)

Let's see in a few words what is in our backlog for the winter:

#### Scoped npm packages
As [sn-client-js](https://github.com/SenseNet/sn-client-js) started to grow too fast it will be a good idea to divide it into multiple packages. We should change our naming conventions with our NPM packages and introduce package scoping for @sensenet specific packages just like [@Material](https://github.com/material), [@angular](https://github.com/angular), [@aurelia](https://github.com/aurelia) or [@ReactiveX](https://github.com/reactivex) did it.
#### ContentTypes vs. Schemas
Since ```ContentTypes``` and ```Schemas``` as auto-generated classes are bundled together and tightly coupled with the ```Repository``` object, we cannot extend or add content types from different packages (sensenet Services, Webpages, etc). So we should distribute ContentTypes in a separate package in the future to allow adding Content types and Schemas without changing [sn-client-js](https://github.com/SenseNet/sn-client-js).
#### CTD improvements 
Sensenet's Content Type Definitions are awesome but they need a facelift from time to time. This time it means some major improvements like adding solutions for field grouping, ordering and some changes around Icon property to handle font-icon libraries like [Material icons](https://material.io/icons/) or [Font awesome](http://fontawesome.io/)
#### Localization
String resources were enable on the client-side through sensenet's built-in bundling and dependency handling mechanism. Since we build separate applications with communicating through OData We have to figure out how localized string resources can be distributed from sensenet to the client.
