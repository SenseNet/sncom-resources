---
title:  "How to use JWT Authentication in sn-client-js"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-use-jwt-in-sn-client-js.md'
category: Tutorials
version: v7.0
tags: [sn7, sn-client-js, jwt, authentication, frontend]
---

# How to use JWT Authentication from sn-client-js

With version 7.0 sensenet ECM has a powerful feature to authenticate users using [JSON Web Tokens](/docs/tutorials/web-token-authentication.md), whitch is supported by [sn-client-js](https://www.npmjs.com/package/sn-client-js) an [sn-redux](https://www.npmjs.com/package/sn-redux) as well. 


> **What is a JSON Web Token?** JSON Web Token is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact, self-contained way for securely transmitting data between parties as a JSON object. The information can be verified and trusted because it's signed digitally The most common scenarios of JWT are *authentication* and *secure data exchange*.

## The backend
In order to use JWT you need an installation of **sense NET Services** backend, configured to use JWT authentication.

You can start by creating a new ASP.NET Web Application and adding the latest [*Sensenet.Services.Install*](http://www.nuget.org/packages/SenseNet.Services.Install/) package from NuGet and following the installation instructions.

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
JWT Authentication is available only with HTTPS connection. To continue with IIS Express, you can press F4 on the Web project to enable SSL and check the **https URL**.
```
## Frontend

### Getting started
From version 2.0.0 *sn-client-js* and *sn-redux* have APIs to manage and check login states and handle authenticated requests easily. In this tutorial, it will be demonstrated using an example Aurelia app with Typescript, whitch you can create in a few minutes using the [Aurelia CLI](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli). After creating the application skeleton with the ``au new`` CLI command, you can install **sn-client-js** with NPM with the command ``npm i sn-client-js --save ``.

### Reaching the backend from a development server
To avoid CORS issues, we will use a Http Proxy middleware to redirect OData and Session Management requests from our development server to our preinstalled sense NET site. To do that, we have to install an another NPM package called *http-proxy-middleware*. Install it with the ``npm i http-proxy-middleware --save-dev`` command.

We'll have to extend our Run task a bit, it's located in *./aurelia-project/tasks/run.ts*. Add this code to the top of the file:

```ts
import * as proxyMiddleware from 'http-proxy-middleware';

var proxy = proxyMiddleware(['/odata.svc', 'sn-token'], {
    target: 'https://sn-local', //Chage this to your sense NET Backend URL
    changeOrigin: true
});
```
And extend the Middleware collection under the browserSync / server:
```ts
middleware: [
          proxy,
          historyApiFallback(), function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }]
```

### The Service

As Aurelia services are represented as regular Typescript classes, we can create a new Typescript file in *./src/sn-reppository.service.ts*.
To interact with a sense NET ECM Repository, you have to create a *Repository* instance. In this case, we will create it inside our Service class.

```ts
import { Repository } from 'sn-client-js';

export class SnRepositoryService{

    public readonly Repository: Repository.SnRepository;

    constructor() {
        this.Repository = new Repository.SnRepository();
    }
}
```
> User session tracking is scoped to *Repository instances*, so it is possible to connect to multiple repositories with multiple sessions from one client app, however it is **strongly recommended to create only one Repository instance for a particular *sense NET repository* per application** in a separate singleton service or in a very top level *module / component* to avoid login state concurrency issues. In Aurelia, services acts like singletons by default, and as we are working with only one repository in this tutorial, we can use Aurelia's *DI* framework to inject our Repository component to particular components after wrapping the Repository instance in a service.


### The Components
we will create 3 Aurelia components whitch will use our service. Components can be generated using the CLI:
```bash
au generate component login authentication
au generate component logout authentication
au generate component authentication authentication
```

----

On the Authentitcation Service instance, you can access the followings:

 **State** It is an *Observable<LoginState>*, you can subscribe to it to receive all login state changes
 ```ts
repository.Authentication.State.subscribe(newState => {
    console.log('Login state changed:', Authentication.LoginState[newState])
});
 ```
**CurrentState** It's the current value of your *LoginState*
**Login(username: string, password: string)** Sends a Login request, and returns an Observable whitch will be updated once the request is completed (with a boolean value that tells if the login succeeded).
**Logout()** Invalidates your tokens and logs you out

### Authentication states and authenticated requests
Currently we use the following 
 - **Pending** - The Token Store has not initialized yet, or there is a login / token refresh in progress
 - **Authenticated**
 - **Unauthenticated**

### Configure
#### Session Expiration
You can specify the expiration type when creating a Repository instance with the **JwtTokenPersist** option. It can be **session** or **expiration**

#### Token template
**JwtTokenKeyTemplate**

> **Where will be the token stored?** By default, JWT tokens are stored in the *sessionStorage* or in the *localStorage*, based on the session expiration settings. If the stores are not available, it will fall back to cookies, the expiration date will be also set regarding your session expiration setting.

### Using sn-client-js

#### Initializing a Repository

```ts
import { Repository } from 'sn-client-js';

const repository = new Repository.SnRepository();
```

#### Login, logout

Once you've created a repository instance, you can log in and log your session state
```ts
repository.Authentication.State.subscribe(newState => {
    console.log('Login state changed:', Authentication.LoginState[newState])
});
repository.Authentication.Login('user', 'password');
```

### Using sn-redux

```ts
import { Repository } from 'sn-client-js';
import { Store, Reducers } from 'sn-redux';

// ...

const repository = new Repository.SnRepository();
const store = Store.configureStore(myReducer, null, null, { }, repository);

this.ngRedux.dispatch(Actions.CheckLoginState());

```