---
title:  "How to use JWT Authentication in sn-client-js"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-use-jwt-in-sn-client-js.md'
category: Tutorials
version: v7.0
tags: [sn7, sn-client-js, jwt, authentication, frontend]
---

# How to use JWT Authentication from sn-client-js

From version 7.0, sensenet ECM has a powerful feature to authenticate users using [JSON Web Tokens](/docs/tutorials/web-token-authentication.md), whitch is supported by [sn-client-js](https://www.npmjs.com/package/sn-client-js) an [sn-redux](https://www.npmjs.com/package/sn-redux) as well.


> **What is a JSON Web Token?** JSON Web Token is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact, self-contained way for securely transmitting data between parties as a JSON object. The information can be verified and trusted because it's signed digitally The most common scenarios of JWT are *authentication* and *secure data exchange*.

## The backend
In order to use JWT, you need an installation of sense NET Services backend, configured to use JWT authentication.

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
Please note that JWT Authentication works only with HTTPS connection. To continue with IIS Express, you can press F4 on the Web project to enable SSL and check the https URL.
```
## Frontend

### Authentication states
 - Pending - The Token Store has not initialized yet, or there is a login / token refresh in progress
 - Authenticated
 - Unauthenticated

### Configure

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


```