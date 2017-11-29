---

title: "First OAuth implementation in sensenet"
author: [tusmester, gallayl, herflis]
image: "../img/posts/travel.jpeg"
tags: [authentication, oauth, google, javascript, redux]

---

[OAuth 2.0](https://oauth.net/2/) is the industry-standard protocol for authorization. In [sensenet ECM](https://github.com/SenseNet/sensenet) we use it as an extension to our [web token authentication](https://community.sensenet.com/docs/web-token-authentication) to let users authenticate using well-known services (such as Google or Facebook). The benefit is that users are able to sign in to a sensenet ECM application with a single click, without manual registration. Following post gives you an insight on how OAuth is implemented on the server side, shows how the sensenet client libraries support it and quickly demonstrates how you can build it into your app.

---

## Server side

When new users come to the site, they will be able to sign in by clicking the Google or Facebook button (or a similar custom experience implemented by the developer). The workflow is the following:

- User signs in to the 3rd party service.
- User authorizes the application with the service (e.g. let the application access basic user data like name and email). This is usually a click of a button in the Google or Facebook popup window.
- The client receives a token from the service.
- The client sends the token to the sensenet ECM server, where the appropriate OAuth provider verifies the token.
- If the token has been verified, we load or create the corresponding User content in the Content Repository. User content items are connected to the 3rd party service by storing the unique user identifier in a provider-specific separate field (e.g. GoogleUserId).
- sensenet ECM asssembles a JWT token for the client and consideres the user as correctly signed in.

From that point on the user will be able to use the application as a regular user.

### Configuration

You can specify where new users are created and their content type using the OAuth settings content in the usual global *Settings* folder.

```json
{
   UserType: "User",
   Domain: "Public"
}
```

New users are created under the domain above separated into organizational units named by the provider.

### 'Built-in' providers

A sensenet ECM OAuth provider is a small plugin that is designed to verify a token using a particular service. Out of the box we offer now only the [Google OAuth provider](https://github.com/SenseNet/sn-oauth-google) for sensenet ECM. This provider is available as nuget package on the server side.

### Custom provider

The OAuth provider feature is extendable by design, so developers may create a custom provider for any 3rd party service by implementing a simple api.

```csharp
public class CustomOAuthProvider : OAuthProvider
{
    public override string IdentifierFieldName { get; } = "CustomUserId";
    public override string ProviderName { get; } = "myservicename";

    public override IOAuthIdentity GetUserData(object tokenData)
    {
        return tokenData as OAuthIdentity;
    }

    public override string VerifyToken(HttpRequestBase request, out object tokenData)
    {
        dynamic userData;

        try
        {
            userData = GetUserDataFromToken(request);
        }
        catch (Exception)
        {
            throw new InvalidOperationException("OAuth error: cannot parse user data from the request.");
        }

        tokenData = new OAuthIdentity
        {
            Identifier = userData.sub,
            Email = userData.email,
            Username = userData.sub,
            FullName = userData.name
        };

        return userData.sub;
    }

    private static dynamic GetUserDataFromToken(HttpRequestBase request)
    {
        string body;
        using (var reader = new StreamReader(request.InputStream))
        {
            body = reader.ReadToEnd();
        }

        dynamic requestBody = JsonConvert.DeserializeObject(body);
        string token = requestBody.token;

        //TODO: verify token and extract basic user data
        // return userData        
    }
}
``` 

The example above assumes that there is a field on the User content type called CustomUserId. Registering this field is the responsibility of the provider install process.

To start using your custom provider you only have to add a reference to your provider library and sensenet ECM will automatically discover and register your class.

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

## known issues, missing features
## feedback is needed