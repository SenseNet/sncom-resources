---

title: "First OAuth implementation in sensenet"
author: [tusmester, gallayl, herflis]
image: "../img/posts/travel.jpeg"
tags: [authentication, oauth, google, javascript, redux]

---

Identifying users is one of the most important features in an ECM solution. In [sensenet ECM](https://github.com/SenseNet/sensenet) we try to support a wide range of possibilities in this field, this is why we made this a lot easier by extending our [web token authentication](https://community.sensenet.com/docs/web-token-authentication): from now on it is possible to integrate a 3rd party authentication service, for example [Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in) into your sensenet ECM solution.

---

[OAuth 2.0](https://oauth.net/2/) is the industry-standard protocol for authorization. In sensenet ECM we use it as an extension to our JWT authentication to let users **authenticate** using well-known services (such as Google or Facebook). The benefit is that users are able to sign in to a sensenet ECM application with a single click, **without manual registration**. This post gives you an insight on how OAuth is implemented on the server side, shows how the sensenet client libraries support it and quickly demonstrates how you can build it into your app.

> In the first iteration we only implemented *Google Sing-in*, but you can add other services (like Facebook) if you follow the steps and links in this post. If you do that, please consider sharing it with the [community](https://community.sensenet.com/) so that others can use it too!

## How it works

When new users come to the site, they will be able to sign in by clicking the Google button (or a similar custom experience implemented by the developer). The workflow is the following:

1. The user signs in to the 3rd party service.
2. The user authorizes the application with the service (e.g. lets the application access basic user data like name and email). This is usually a click of a button in the Google or Facebook popup window.
3. The client receives a **token** from the service.
4. The client sends the token to the sensenet ECM server, where the appropriate OAuth provider **verifies** the token (note that this way it is not possible to send an invalid or expired token, because it is verified with the 3rd party service).
5. If the token has been verified, we **load or create** the corresponding User content in the Content Repository. User content items are connected to the 3rd party service by storing the unique user identifier in a provider-specific separate field (e.g. *GoogleUserId*).
6. sensenet ECM asssembles a JWT token for the client and considers the user as correctly signed in.

From that point on the user will be able to use the application as a regular user and there is no further connection with the 3rd party service or its token. We use our own JWT token to identify the user in subsequent requests.

## Server-side providers

A sensenet ECM OAuth provider is a small .Net plugin that is designed to verify a token using a particular service. Out of the box we offer only the [Google OAuth provider](https://github.com/SenseNet/sn-oauth-google) which is available as a NuGet package.

[![NuGet](https://img.shields.io/nuget/v/SenseNet.OAuth.Google.svg)](https://www.nuget.org/packages/SenseNet.OAuth.Google)

> In the future we will add more options (like Facebook Login), but you can also [integrate any 3rd party service](https://community.sensenet.com/docs/oauth/).

## Client-side

If you are using [sn-client-js](https://github.com/SenseNet/sn-client-js) and/or [sn-redux](https://github.com/SenseNet/sn-redux), you do not have to deal with sending OAuth tokens to the server, they will do it for you.

### sn-client-js

We've added OAuth provider support for the JWT Authentication service. This means that you can implement and add your own OAuth provider - just like we did it in [sn-client-auth-google](https://github.com/SenseNet/sn-client-auth-google) 

### sn-client-auth-google 1.0.0

This package is our first official client-side OAuth provider. It requires sensenet ^7.0.0 with an installed SN7 [OAuth provider](https://github.com/SenseNet/sn-oauth-google) and a [Google API Console project](https://developers.google.com/identity/sign-in/web/devconsole-project). You can use it with or without the official [Google Platform Library](https://developers.google.com/identity/sign-in/web/sign-in) or any third party component that can retrieve an *id_token*.

We've focused on keeping this library straightforward and easy-to-use, hopefully you can integrate it within a few minutes - after checking an example in the [readme](https://github.com/SenseNet/sn-client-auth-google).

### sn-redux

Since the needed provider was ready both on the backend and in [sn-client-js](https://github.com/SenseNet/sn-client-js) it was a must to add an action to handle login (and registration) with Google account in sn-redux too. However the after-login process is the same a new epic called ```userLoginGoogleEpic``` is created. This new epic is subscribed to the new login request action but if it was responded successfully or if it was failed it dispatches the same actions that are used in the simple login process. 

### demo

Let us demonstrate how easy you can add the above to your app through the steps that were made adding Google authentication to our DMS Demo.

1.  Install [sn-client-auth-google](https://github.com/SenseNet/sn-client-auth-google) with npm and import ```AddGoogleAuth```

    ```
    npm i --save-dev sn-client-auth-google
    ```

    ```typescript
    import { AddGoogleAuth } from 'sn-client-auth-google'; 
    ```

2. Activate Google authentication on your repository object with your app's/site's ```ClientId```

    ```typescript
        ...
        AddGoogleAuth(repository, {
            ClientId: 'yourclientid'
        })
        ...
    ```

3. Create your custom button or link component, import ```Actions``` from [sn-redux](https://github.com/SenseNet/sn-redux) and now you're able to reach the ```UserLoginGoogle``` and you can dispatch it in the event handler where it is neeeded.

    ```ts
        ...
        import { Actions } from 'sn-redux'
        ...

        class myButton extends React.Component<{login: Function},{}>{
            ...
            handleButtonClick(e){
                this.props.login
            }
            ...
            render(){
                return <div onClick={e => this.handleButtonClick(e)}>Sign in with Google</div>
            }
        }
        ...

        export default connect({}, {
            login: Actions.UserLoginGoogle
        })(myButton)
    ```

## Next steps

As this is only the first iteration, we deliberately made this release very small. For example:

- we do not sync custom properties, like user avatar
- the Google provider on the server verifies the token using the public *http Google API*, which means the server has to have access to that API. In the future this may be changed to local token verification using the Google SDK.
- Facebook, Microsoft and GitHub login options are not available yet

Do you feel the power to help the [community](https://community.sensenet.com/) with extending the platform with your ideas? Please [contact us](https://community.sensenet.com/contact/), participate in the conversation and help us make tools for the benefit of other developers!
