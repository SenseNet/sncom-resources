---

title: "Starting out with sensenet ECM using Aurelia Framework"
author: gallayl
image: "../img/posts/sensenetecm-react-redux.png"
tags: [aurelia, typescript, es6, javascript, typescript, getting started]

---

heading - todo

---

# Prerequisites

First or all, you'll need [sensenet Services](https://community.sensenet.com/docs/install-sn-from-nuget/) installed and configured [JWT Authentication](https://community.sensenet.com/docs/web-token-authentication/). [Webpages installation](https://community.sensenet.com/docs/install-webpages-from-nuget/) is not a requirement but also recommended.

You'll also have to deal with the [CORS](https://community.sensenet.com/docs/cors/) settings. You have to allow CORS for *localhost* origin. Add the following setting to your *Portal.settings* file that can be found in */Root/System/Settings/Portal.settings* (You can use the Content Explorer, or re-import the modified file) :

```json
...
"AllowedOriginDomains": [
    "localhost"
  ]
...
```

# Creating the application skeleton with aurelia-cli

## Installing CLI

```
npm install -g aurelia-cli
```

## Creating an application

You can set up and create a new Aurelia application with the following CLI command:
```
au new
```

Create your project using the *custom settings*, my setup looks like the following:
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

Once the setup is done, you'll can install the dependencies (or do it later with the ```npm install`` command).

You can run your Aurelia app with the following command
```
cd my-sensenet-app
au run
```
After a quick build process you can open up your browser and check the default *Hello World!* message at [http://localhost:8080](http://localhost:8080)

# Getting started with sn-client-js

## Install 

To work with sensenet ECM, the first thing you have to do is to install the [sn-client-js](https://www.npmjs.com/package/sn-client-js) package with the following command:

```
npm install sn-client-js
```

## Configuring dependency injection

In this example we will use the a *Repository* from sn-client-js as a main entry point to interact with sensenet ECM. In order to inject a preconfigured *repository* as a singleton, we have to configure Aurelia's main *DI container*.

Open **./src/main.ts** and add the following import

```ts
import { Repository } from 'sn-client-js';
```

and before the aurelia.start()... statement:
```ts
  aurelia.container.registerSingleton(Repository.SnRepository, () => new Repository.SnRepository(
    {
      JwtTokenPersist: 'expiration',
      RepositoryUrl: 'https://sensenet7-local',
    })
  );
```

## Creating a custom element

Now we will create a *custom element* called **sn-login**. This will have similar functionality as the *LoginPortlet*, it will display a simple login form for unauthenticated users and a welcome message with a Logout button if you are logged in. We can create the element with the following CLI command:

```
au generate element
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

To display our new element we have to edit the main application template that can be found in **./src/app.html**. Let's remove the static *Hello World!* header and add an sn-login *custom element*:

```html
<template>
  <sn-login></sn-login>
</template>
```

## Working with authentication

**./src/resources/elements/sn-login.ts**

remove the default bindable *value* and its *valueChanged* method

injecting *SnRepository*

create *subscriptions* array
add *attached method*

add a bindable *loginState*
subscribe to login state
modify template

```html
<template>
  <p>
    The login state is <strong>${loginState}</strong>
  </p>
</template>
```html

add a bindable *user*
subscribe to user changes
modify template

```html
<template>
  <p>
    Hello <strong>${currentUser.DisplayName}</strong> <br />
    The login state is <strong>${loginState}</strong>
  </p>
</template>
```html

## Creating a basic login and logout form

modify template
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

add bindable values to loginUserName and loginPassword

```ts

  @bindable
  loginUserName: string;
  @bindable
  loginPassword: string;

```

implement login() and logout() methods

```ts
login(){
  this.repository.Authentication.Login(this.loginUserName, this.loginPassword);
  this.loginUserName = this.loginPassword = "";
}

logout(){
  this.repository.Authentication.Logout();
}
```


