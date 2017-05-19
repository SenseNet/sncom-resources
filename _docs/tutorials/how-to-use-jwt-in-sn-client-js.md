---
title:  "JWT Authentication in sn-client-js"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-use-jwt-in-sn-client-js.md'
category: Tutorials
version: v7.0
tags: [sn7, sn-client-js, jwt, authentication, frontend]
---

# JWT Authentication in sn-client-js

With version 7.0 sensenet ECM has a powerful feature to authenticate users using [JSON Web Tokens](/docs/web-token-authentication), whitch is supported by [sn-client-js](https://www.npmjs.com/package/sn-client-js) an [sn-redux](https://www.npmjs.com/package/sn-redux) as well. 


> **What is a JSON Web Token?** JSON Web Token is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact, self-contained way for securely transmitting data between parties as a JSON object. The information can be verified and trusted because it's signed digitally The most common scenarios of JWT are *authentication* and *secure data exchange*.

## Backend prerequisites
In order to use JWT you need a preconfigured installation of **sense NET Services** backend.

You can start by creating a new ASP.NET Web Application. Grab the latest **[Sensenet.Services.Install](http://www.nuget.org/packages/SenseNet.Services.Install/)** package from NuGet and following the installation instructions.

In order to get JWT work you have to update your web.config, filling the *SymmetricKeySecret* variable with a 16-64 character length random string.

```xml
<sensenet>
...
   <tokenAuthentication>
     <add key="SymmetricKeySecret" value="<random secret string>" />
   </tokenAuthentication>
...
</sensenet>
```
```diff
JWT Authentication is available only with HTTPS connection. To continue with IIS Express, you can press F4 on the Web project to enable SSL and check the https URL.
```
## The Frontend

### Getting started
From version 2.0.0 *sn-client-js* and *sn-redux* have APIs to manage and check login states and handle authenticated requests easily. 
In this tutorial we will start with the official Aurelia skeleton with Typescript and Webpack, whitch you can clone from **[here](https://github.com/aurelia/skeleton-navigation)**.
Select the corresponding directory (it's **skeleton-typescript-webpack**) and install the project dependencies and sn-client-js from command line 
```bash
npm install
npm install sn-client-js --save
```

### Reaching the backend from a development server
To avoid CORS issues, we will redirect OData and Session Management requests from our frontend development server to our preinstalled sense NET site. To do that, we have to change our webpack.config.js. Let's extend our ``module.exports.devServer`` with some **proxy** options. Replace the ``target`` field with your backend site path.

```ts
  devServer: {
    // ...
    proxy: {
      "/odata.svc": {
          "target": "https://sn-local/",    // This should point to your sense NET ECM site. Please also note that is has to be use HTTPS
          "secure": false,
          "changeOrigin": true,
          "logLevel": "debug"        
      },
      "/sn-token": {
          "target": "https://sn-local/",    // Should point to the same as above
          "secure": false,
          "changeOrigin": true,
          "logLevel": "debug"        
      }
    }
    // ...
  },
```

### Using the Repository as an injectable a service

To interact with a sense NET ECM Repository, you have to use a *Repository* instance. There are predefined Repository configurations in the *sn-client-js* (like the default ``SnRepository`` that we will use, or ``Mocks.MockRepository`` for testing). If you want to write your components in a decoupled and testable way it's be a good idea to inject the *base* repository class, called ``Repository.BaseRepository`` into them.
Next we have to configure Aurelia's DI to inject the right Repository.BaseRepository implementation at runtime. Open ``./src/main.ts`` file, and insert the following code before ``aurelia.start()``

```ts
import { Repository } from "sn-client-js";
// ...
aurelia.container.registerSingleton(Repository.BaseRepository, () => new Repository.SnRepository());
```

> User session tracking is scoped to *Repository instances*, so it is possible to connect to multiple repositories with multiple sessions from one client app, however it is **strongly recommended to create only one Repository instance for a particular *sense NET repository* per application** in a separate singleton service or in a very top level *module / component* to avoid login state concurrency issues. In this example, Repository will act as a singleton and as we are working with only one repository in this tutorial, we can use Aurelia's *DI* framework to inject as a ``Repository.BaseRepository`` into particular components.

### Authenticate the routing and updating the navbar
We can continue with [authenticate our routing](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/securing-your-app/2). It's a common scenario to make frontend routes only available to registered users, and that's we're gonna do now. 
Our root component can be found at *./src/app.ts*, we will configure the routing there. We will make our existing **users** and **child-router** routes availale only for logged in users, create a Pipeline Step for checking login states and add a new route called **login**.

```ts
import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, PipelineStep, NavigationInstruction, Next, Redirect } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Repository, HttpProviders, Authentication } from 'sn-client-js';

const ROLE_LOGGED_IN: string = 'ROLE_LOGGED_IN';
const ROLE_VISITOR_ONLY: string = 'ROLE_VISITOR_ONLY';

@autoinject
export class App {
  router: Router;
  constructor(private snService: Repository.BaseRepository<any, any>) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'sense NET JWT Login Tutorial';
    config.addAuthorizeStep(SnClientAuthorizeStep);
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: PLATFORM.moduleName('./welcome'),     title: 'Welcome',      settings: { show: true, roles: [] },                 nav: true},
      { route: 'login',         name: 'login',        moduleId: PLATFORM.moduleName('./login'),       title: 'Log in',       settings: { show: true, roles: [ROLE_VISITOR_ONLY] },nav: true},
      { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('./users'),       title: 'Github Users', settings: { show: true, roles: [ROLE_LOGGED_IN] },   nav: true},
      { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('./child-router'),title: 'Child Router', settings: { show: true, roles: [] },   nav: true},
    ]);

    this.router = router;
  }

  attached(){
    this.snService.Authentication.State.subscribe(state => {
      this.router.routes.filter(route => route.settings.roles.indexOf(ROLE_LOGGED_IN) > -1)
        .forEach(route => {
          route.settings.show = state === Authentication.LoginState.Authenticated;
        });
      this.router.routes.filter(route => route.settings.roles.indexOf(ROLE_VISITOR_ONLY) > -1)
        .forEach(route => {
          route.settings.show = state === Authentication.LoginState.Unauthenticated;
        })
    })
  }
}

@autoinject
class SnClientAuthorizeStep implements PipelineStep {

  constructor(private snService: Repository.BaseRepository<any, any>) { }

  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    const instructions = navigationInstruction.getAllInstructions();
    const authenticationState = this.snService.Authentication.CurrentState;

    if (instructions.some(i => i.config.settings.roles.indexOf(ROLE_LOGGED_IN) !== -1)) {
      if (authenticationState !== Authentication.LoginState.Authenticated) {
        return next.cancel(new Redirect('login'));
      }
    }
    if (instructions.some(i=> i.config.settings.roles.indexOf(ROLE_VISITOR_ONLY) !== -1)){
      if (authenticationState !== Authentication.LoginState.Unauthenticated){
        return next.cancel();
      }
    }
    return next();
  }
}

```

As you can see, we've injected a ``Repository.BaseRepository`` service into our component and pipeline step and we've added an additional route for **login**, whitch will be a new component and extended the existing routes with a **settings** field, whitch contains a list of roles and a boolean value that indicates if the route has to be shown on the navigation bar.

We've added a new pipeline step called ``SnClientAuthorizeStep``, at the moment it works based on the current login state and a list of predefined *roles* that are specified per route. We check *ROLE_LOGGED_IN* and *ROLE_VISITOR_ONLY* routes for now.

We've also implemented the **attached** [lifecycle event](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/3), this will kick in right after the routes has been configured. There's a public API called ``Repository.Authenticatoin.State`` in *sn-client-js*, whitch is an [*RxJs Observable*](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html), that will be updated on each login state change. We will use it for hiding and showing the navbar menus as the login state changes. To do that, we have to extend the navbar list template in ``./src/nav-bar.html``

```html
      <ul class="nav navbar-nav">
        <li repeat.for="row of router.navigation" class="${row.isActive ? 'active' : ''} ${row.settings.show ? '' : 'hidden'}">
          <a data-toggle="collapse" data-target="#skeleton-navigation-navbar-collapse.in" href.bind="row.href">${row.title}</a>
        </li>
      </ul>
```


When we try to compile now, we will have an error in *./test/unit/app.spec.ts*, because we changed the constructor's signiture, and the unit test cannot create an App instance. To resolve that, you can pass a *Mock repository* from sn-client-js. Using *mocks* can be helpful if you want to test services or components that depends on a Repository instance.
```ts
import { Mocks } from "sn-client-js";

// ...
// at App.Module BeforeEach:
    sut = new App(new Mocks.MockRepository());

```

### The component
Next, we will create a Login component, to do that, create a new file called ``./src/login.ts`` and add the following class

```ts
import { autoinject } from 'aurelia-framework';
import { Repository } from "sn-client-js";
import { Router } from "aurelia-router";

@autoinject
export class Login {
    private readonly heading = "Login to sense NET ECM"
    private userName: string = '';
    private password: string = '';

    constructor(
        private snService: Repository.BaseRepository<any, any>,
        private router: Router
    ) { }

    public async Login() {
        const success = this.snService.Authentication.Login(this.userName, this.password)
            .subscribe(success => {
                if (success) {
                    this.router.navigate('/');
                }
            });
    }
}
```

For the template, create the file ``./src/login.html`` with the following content
```html
<template>
    <section class="au-animate">
        <h2>${heading}</h2>
        <form role="form" submit.delegate="Login()">
            <div class="form-group">
                <label for="fn">Username</label>
                <input type="text" value.bind="userName" class="form-control" id="fn" placeholder="username">
            </div>
            <div class="form-group">
                <label for="ln">Password</label>
                <input type="password" value.bind="password" class="form-control" id="ln" placeholder="password">
            </div>
            <button type="submit" class="btn btn-default">Log in</button>
        </form>
    </section>
</template>
```
This component will use a public API called ``Repository.Authentication.Login(userName, password)``, whitch will send the login request, takes care about storing the JWT tokens and updates the login state (so the navbar will be also updated).

After running ``npm run start`` your application should be available by default at [http://localhost:8081](http://localhost:8081) and you should be able to log in under the **Login** menu (The default username / password is *admin/admin*), after that you will see and can use the **GitHub Users** and **Child Router** routes. **Child Router** will be broken because of there isn't any *settings* defined, you can fix that in the ``./src/child-router.ts`` by defining the settings field with a role list

```ts
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: PLATFORM.moduleName('./welcome'),      settings: {roles: []}, nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('./users'),        settings: {roles: []}, nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('./child-router'), settings: {roles: []}, nav: true, title: 'Child Router' }
    ]);
    this.router = router;
  }
```

There's one thing left, we should be able to log out the user. Let's create a component for that, first the class file in ``./src/logout.ts``. This will be similar to the Login component, but it will only ask for logout confirmation and calls the ``Repository.Authentication.Logout()`` method.

```ts
import { autoinject } from 'aurelia-framework';
import { Repository } from "sn-client-js";
import { Router } from "aurelia-router";

@autoinject
export class Logout {
    
    heading = "Log out from sensenet ECM";
    confirmText = "Really log out?";
    constructor(
        private snService: Repository.BaseRepository<any, any>,
        private router: Router
    ) { }

    logout(){
        this.snService.Authentication.Logout().subscribe(success=>{
            this.router.navigate('/');
        });
    }

    goBack(){
        this.router.navigateBack();
    }
}
```

...and the template in the file ``./src/logout.html``
```html
<template>
    <section class="au-animate">
        <h2>${heading}</h2>
        <form role="form" submit.delegate="logout()">
            <div class="form-group">
                <p class="help-block">${confirmText}</p>            
            </div>
            <button type="submit" class="btn btn-default">Yes</button>
            <button click.delegate="goBack()" class="btn btn-default">No</button>
        </form>
    </section>
</template>
```

After that, we should append our route configuration in ``./src/app.ts`` with the following route

```ts
{ route: 'logout', name: 'logout', moduleId: PLATFORM.moduleName('./logout'), title: 'Log out', settings: { show: true, roles: [ROLE_LOGGED_IN] },nav: true},
```

Now, you have a sense NET powered Aurelia application with full Login / Logout functionality and some authorized frontend routes.


## What's next?

### The session lifetime

We use two token types: The **access token** and the **refresh token**. They both have their own expiration properties. Once the *access token* is expired, it has to be refreshed using the *refrehs token*, until the refresh token is valid. If both tokens are expired, the user must re-enter his credentials.

To make authenticated HTTP calls, a valid *access token payload info* has to be added to the requests's header. This is done by *sn-client-js* internally, if you use the appropriate *Repository* endpoint.

We have an expiration property on each token. Basically, the maximum session lifetime is the refresh token lifetime, whitch can [configured](/docs/web-token-authentication) in the web.config.
On the client, we can limit this interval to *user sessions*, whitch means that both tokens will be deleted, when the user closes the browser. This can be done during constructing a *Repository*, in our case, in *./src/main.ts*. The option is called **JwtTokenPersit** and the valid values are **expiration** (whitch refers to the refresh token expiration) and **session**.

```ts
aurelia.container.registerSingleton(Repository.BaseRepository, () => new Repository.SnRepository({
    JwtTokenPersist: 'session'
}));
```

> **Where will be the token stored?** By default, JWT tokens are stored in the *sessionStorage* or in the *localStorage*, based on the session expiration settings. If the stores are not available, it will fall back to cookies, the cookie expiration will be also set regarding your session expiration setting.

### Using the OData API
Once we're able log in, we can perform authenticated OData Requests through our *sn-client-js Repository*. In our injected ``BaseRepository`` instance, we have an API endpoint for that, called ``Repository.Content``. With that, we can do the basic **CRUD** operations, or you can simply load a *content* with ``Repository.Load``.

### Making custom authenticated Ajax calls
If you want to make an authenticated Ajax call to the backend (e.g. a custom WebApi call or some custom action), you can do that with ``Repository.Ajax()``

### Using with Redux
In the terms of Redux, you can take a look one of our **todo apps** (e.g.: the [Angular2 one](https://github.com/SenseNet/sn-angular2-redux-todo-app)) that are built on a top of [sn-redux](https://www.npmjs.com/package/sn-redux).

There are two major changes with Redux. The first is, when you create a Store, you have an optional property for injecting a ``Repository``. This repository will be used, when you dispatch any action on a Store.
```ts
const repository = new Repository.SnRepository({
    // ... my custom repository options
});
const store = Store.configureStore(myReducer, null, null, { }, repository);
```

The second key part is that you have to update your store state regarding your tokens on application init. To do that, simply call ``Actions.CheckLoginState()``, that will trigger a ``USER_LOGIN_FAILURE`` or a ``USER_LOGIN_SUCCESS`` action.
