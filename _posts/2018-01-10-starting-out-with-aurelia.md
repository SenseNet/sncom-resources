---

title: "Getting started with sensenet using Aurelia Framework"
author: gallayl
image: "../img/posts/getting-started-with-aurelia.jpg"
tags: [aurelia, typescript, authentication, sn-client-js, getting started]

---

There was a lot of development in the frontent frameworks ecosystem over the last couple of years - and you can use a wide range of them with the latest version of *sensenet*. The following step by step tutorial will guide you how to put it all together - this time with [Aurelia](http://aurelia.io/) and [Typescript](https://www.typescriptlang.org/).

---

## Prerequisites

First of all, you'll need [sensenet Services](https://community.sensenet.com/docs/install-sn-from-nuget/) installed and configured [JWT Authentication](https://community.sensenet.com/docs/web-token-authentication/). [Webpages installation](https://community.sensenet.com/docs/install-webpages-from-nuget/) is not a requirement but also recommended.

You'll also have to deal with the [CORS](https://community.sensenet.com/docs/cors/) settings. You have to allow CORS for **localhost** origin. Add the following setting to your **Portal.settings** file that can be found in **/Root/System/Settings/Portal.settings** (You can use the *Content Explorer* if you have WebPages installed, or just re-import the modified file) :

```json
...
"AllowedOriginDomains": [
    "localhost"
  ]
...
```

## Creating the app with aurelia-cli

Aurelia has a great CLI tool that allows us to create custom elements, value converters or even an entire preconfigured Aurelia project with simple commands. You can install it globally from NPM:

```
npm install -g aurelia-cli
```

You can set up and create a new Aurelia application with the following CLI command:
```
au new
```

Create your project choosing the **custom settings**, my setup looks like the following:
 - Name: **my-sensenet-app**
 - Platform: **Web**
 - Bundler: **Webpack**
 - Loader: **None**
 - Transpiler: **TypeScript**
 - Markup Processor: **None**
 - CSS Processor: **Sass**
 - Unit Test Runner: **Jest**
 - Integration Test Runner: **Protractor**
 - Editor: **Visual Studio Code**

You can change the CSS preprocessor or test runners, we won't use them for now.

Once the setup is done, you can install the dependencies (or do it later with the ```npm install``` command).

You can run your Aurelia app with the following command:

```
cd my-sensenet-app
au run
```
After a quick build process you will see the development server's URL on the console (it is [http://localhost:8080](http://localhost:8080) by default). Open it in your browser and check the default *Hello World!* message. 

## Getting started with sn-client-js

### Install 

To work with sensenet, the first thing you have to do is to install the [sn-client-js](https://www.npmjs.com/package/sn-client-js) package with the following command:

```
npm install sn-client-js
```

### Configuring dependency injection

In this example we will use the *Repository* from sn-client-js as a main entry point to interact with sensenet. In order to inject a preconfigured *repository* as a singleton, we have to configure Aurelia's main *DI container*.

Open **./src/main.ts** and add the following import:

```ts
import { Repository } from 'sn-client-js';
```

and before the aurelia.start()... statement:
```ts
  aurelia.container.registerSingleton(Repository.BaseRepository, () => new Repository.SnRepository(
    {
      RepositoryUrl: 'https://sensenet7-local', // Change this URL to your sensenet 7 Repository
    })
  );
```

## Login and Logout

### Creating a custom element with CLI

Now we will create a *custom element* called **sn-login**. This will have similar functionality as the *LoginPortlet*, it will display a simple login form for unauthenticated users and a welcome message with a Logout button if you are logged in. We can create the element with the following CLI command:

```
au generate element sn-login
```

The CLI will create a view-model and a HTML template in *./src/resources/*. To register our element as a *global resource* open **./src/resources/index.ts** and update:
```ts
import {FrameworkConfiguration, PLATFORM} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/sn-login')
  ]);
}
```

To display our new element we have to edit the main application template that can be found in **./src/app.html**. Let's remove the static *Hello World!* header and add our new sn-login *custom element*:

```html
<template>
  <sn-login></sn-login>
</template>
```

### Basic login/logout implementation

To edit *sn-login* element's view model, we have to open the generated **./src/resources/elements/sn-login.ts** file. We can remove the example bindable *value* and its *valueChanged* method.

First we will need an SnRepository instance. We will inject it using Aurelia's *autoInject* decorator.

```ts
import { bindable, autoinject } from 'aurelia-framework';
import { Repository, Content, ContentTypes, Authentication } from 'sn-client-js';
import { Subscription } from 'rxjs';

@autoinject
export class SnLogin {
  constructor(private repository: Repository.BaseRepository) {  }
}

```

From now on, we can use the *repository* in our custom element. We will use two [RxJs observables](http://reactivex.io/documentation/observable.html) in this component, one to track the login state and another one to track the current user.

We will create two *subscriptions* and store their current value in two *bindable properties*. We will subscribe in *attached* component event and unsubscribe in *detached*.

You can add the following code to your view-model:
```ts
  @bindable 
  currentUser: Content<ContentTypes.User>

  @bindable
  loginState: Authentication.LoginState

  subscriptions: Subscription[] = [];

  attached(){
    this.subscriptions.push(
      this.repository.Authentication.State.subscribe(state=>{
        this.loginState = state;
      }),
      this.repository.GetCurrentUser().subscribe(user => {
        this.currentUser = user;
      })
    )
  }
  detached(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }
```

Once the coding is done, we will modify the *template* that can be found in **./src/resources/elements/sn-login.html**. First, we can display the login state and the current user's DisplayName.

```html
<template>
  <p>
    Hello <strong>${currentUser.DisplayName}</strong> <br />
    The login state is <strong>${loginState}</strong>
  </p>
</template>
```

If you start the project now with ```au start``` and open the page, you will see a 'Hello **Visitor**!' message and the login state will be **Unauthenticated**.

### Creating a basic login and logout form

Now we know the user and the login state, we can improve the element template a bit. We will display the followings:
 - If the *loginState* is **Unauthenticated** the user will get a login form with username and password fields
 - If the state is **Authenticated**, a welcome message and a Logout button
 - If the login state is **Pending**, well... a message for now and you can replace it with your favourite loader later :)

 Now the template will look like this:
```html
<template>
  <form if.bind="loginState === 'Unauthenticated'" submit.delegate="login()">
    <input type='text' required name="username" value.bind='loginUserName' />
    <input type="password" required name="password" value.bind='loginPassword' />
    <input type='submit' />
  </form>
  <p if.bind="loginState === 'Authenticated'">
    Hello <strong>${currentUser.DisplayName}!</strong> <br />
    <button click.delegate="logout()">Log out</button>
  </p>
  <p if.bind="loginState === 'Pending'">
    Login in progress...
  </p>
  The login state is <strong>${loginState}</strong>  
</template>
```

We will add two properties into the view-model called *loginUserName* and *loginPassword*, the form values will be bound to these properties.

```ts
  @bindable
  loginUserName: string;
  @bindable
  loginPassword: string;
```

And we have to implement the actions for *login()* and *logout()* - they will simply call the corresponding endpoints on the Repository.

```ts
login(){
  this.repository.Authentication.Login(this.loginUserName, this.loginPassword);
  this.loginUserName = this.loginPassword = "";
}

logout(){
  this.repository.Authentication.Logout();
}
```

Once we've got it up and running we will be able to log in and out and display the user name.

 ![Login, logout with sn7 and Aurelia](/img/posts/getting-started-with-aurelia-login-logout.gif "Login, logout with sn7 and Aurelia")

## Content list component

### Creating and setting up the component

In the next example we will create another custom element that *list* content from the repository. To do that, we will create another custom element with the ```au generate element content-list``` command and add it as a global resource in **./src/resources/index.ts** just like the *sn-login* element.

We have to add it into our main *app* component, it will be available if the user is *authenticated*. 
Open **./src/app.html** and add the new component:
```html
<template>
  <sn-login></sn-login>
  <content-list if.bind="loginState === 'Authenticated'"></content-list>
</template>
```
Now open **./src/app.ts** and subscribe to the login state just like we did it in the Login component. At this time we don't need to *unsubscribe* because *app* is our main component - it will be attached right after Aurelia's bootstrap process and will be detached on window close.

Update the *app.ts* file with the followings:

```ts
import { Repository } from "sn-client-js";
import { LoginState } from "sn-client-js/dist/src/Authentication";
import { bindable, autoinject } from "aurelia-framework";

@autoinject
export class App {
  constructor(private repository: Repository.BaseRepository) {  }

  @bindable
  loginState: LoginState

  attached(){
    this.repository.Authentication.State.subscribe(state=>{
      this.loginState = state;
    });
  }
}
```

> If you have unit tests enabled the one that tests the app component will now fail because we've modified the constructor and it will have a required argument. You can disable unit testing for now or fix the failed test in *./test/unit/app.spec.ts* file.

### The view model

The component list will have two bindable properties:
 - ```currentContent: Content<GenericContent>``` will store the *current* tree level
 - ```children: Content<GenericContent>[]``` will store currentContent's children. These will be displayed in the current view.

 And will have the following methods:
 - ``currentContentChanged()`` is called by Aurelia when a new value is set to currentContent. We will load its children there.
 - ```navigate(content: Content<GenericContent>)``` will be called when clicking on a tree node (navigating a level below)
 - ```navigateUp()``` will set the current content to the current content's parent and navigating a level up
 - ```attached()``` will initialize the component and sets the current content to the *Portal Root*

```ts
import { bindable, autoinject } from 'aurelia-framework';
import { Content } from 'sn-client-js';
import { GenericContent } from 'sn-client-js/dist/src/ContentTypes';
import { BaseRepository } from 'sn-client-js/dist/src/Repository';

@autoinject
export class ContentList {
  constructor(private repository: BaseRepository) {  }

  attached(){
    this.repository.Load(2) // Get the PortalRoot by Id
    .subscribe(root=>{
      this.currentContent = root;
    });
  }
  
  @bindable
  currentContent: Content<GenericContent>;

  @bindable
  children: Content<GenericContent>[] = []

  currentContentChanged(newValue) {
    this.currentContent.Children().subscribe(c=>{
      this.children = c;
    })
  }

  navigate(content: Content){
    this.currentContent = content;
  }

  navigateUp(){
    this.repository.Load(this.currentContent.ParentPath)
      .subscribe(parent=>{
        this.currentContent = parent;
      });
  }
}

```

### The template
The template will be quite simple, we will have a read-only input that will show the current Path and an unordered list with the children.

```html
<template>
  <div>
    <input readonly value.bind="currentContent.Path" />
    <ul>
      <li>
        <a click.delegate="navigateUp()">[..]</a>
      </li>
      <li repeat.for="child of children">
        <a click.delegate='navigate(child)'>${child.DisplayName || child.Name}</a>
      </li>
    </ul>
  </div>
</template>
```
 
![Browsing with Aurelia](/img/posts/getting-started-with-aurelia-browser.gif "Browsing with Aurelia")

## Next steps

Now that you have an idea how to log in and load content you can find more examples about updating, deleting, querying at the [sn-client-js](https://github.com/SenseNet/sn-client-js) readme or you can take a look at our [Aurelia control library](https://github.com/SenseNet/sn-controls-aurelia).
And - as always - we are looking forward to your thoughts and feedback :).
