---

title: "Authentication to sensenet with IdentityServer4"
author: [zoltanbedi]
image: "../img/posts/lock-is.jpg"
tags: [authentication]

---

We have changed to authentication for sensenet 7 to IdentityServer4. 
Here are the things you need to know when you use it in an single page application.

---

## What is IdentityServer4?

IdentityServer4 is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core 3.0. Come again? What does that even mean? What is OpenID Connect and OAuth 2.0? 

Quoting from [https://oauth.net/2/](https://oauth.net/2/)
> OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices. This specification and its extensions are being developed within the [IETF OAuth Working Group](https://www.ietf.org/mailman/listinfo/oauth).

Quoting from [https://openid.net/connect/](https://openid.net/connect/)
> OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.

Ok, so IdentityServer4 is implementing the industry-standard protocol for authorization. That sounds awesome. We don't have to implement hacky/non-standard ways to implement authorization, IdentityServer4 handles that for us.

## How can I authenticate to sensenet from your SPA then?

The easiest way is to use our newly created React component library for handling authentication through a provider ([@sensenet/authentication-oidc-react](https://www.npmjs.com/package/@sensenet/authentication-oidc-react)). It uses [oidc-client](https://www.npmjs.com/package/oidc-client) under the hood. If you are using another framework or just vanilla js, your best bet is this lib.

- Add @sensenet/authentication-oidc-react to your react app either with `yarn add @sensenet/authentication-oidc-react` or with `npm install @sensenet/authentication-oidc-react`
- Add a configuration file like this 

```typescript
import { UserManagerSettings } from '@sensenet/authentication-oidc-react'

export const repositoryUrl = 'https://my-service.sensenet.com/' // This is the repository you want to log in to

export const configuration: UserManagerSettings = {
  automaticSilentRenew: true, // Access tokens only valid for a period of time with this set to true it will be renewed 1 minute before expiration
  client_id: 'spa', // For SPA's use the client_id 'spa'
  redirect_uri: `${window.location.origin}/authentication/callback`, // This is the url it will return with the access token
  response_type: 'code', // This value tells OAuth2 what should be in the response, we want the access token
  post_logout_redirect_uri: `${window.location.origin}/`, // This is the url the server will redirect after logout
  scope: 'openid profile sensenet', // The scopes we want access to, don't forget to add sensenet!
  authority: 'https://is.test.sensenet.com/', // The identity server that will talk with our repository
  silent_redirect_uri: `${window.location.origin}/authentication/silent_callback`, // This url is going to be called for silent login
  extraQueryParams: { snrepo: repositoryUrl }, // This is an important bit, we need to set snrepo to our repositoryUrl so IdentityServer will know who should it talk to for authorization
}
```

- Wrap your app with a provider like this

```typescript
import { AuthenticationProvider, useOidcAuthentication, UserManagerSettings } from '@sensenet/authentication-oidc-react'
import { Repository } from '@sensenet/client-core'
import { RepositoryContext } from '@sensenet/hooks-react'
import React, { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useHistory } from 'react-router-dom'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)

export function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RepositoryProvider>{children}</RepositoryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const history = useHistory()

  return (
    <AuthenticationProvider configuration={configuration} history={history}>
      {children}
    </AuthenticationProvider>
  )
}

export const RepositoryProvider = ({ children }: PropsWithChildren<{}>) => {
  const { oidcUser } = useOidcAuthentication()

  if (!oidcUser) {
    return <LoginForm />
  }

  return (
    <RepositoryContext.Provider value={new Repository({ repositoryUrl, token: oidcUser.access_token })}>
      {children}
    </RepositoryContext.Provider>
  )
}
```

- That is it! 🎉 You can now authenticate with your user.


### What if I don't know the authority url in the configuration?

You can get the authority and client_id config from the service with this action `https://my-service.sensenet.com/odata.svc/('Root')/GetClientRequestParameters?clientType=adminui`

Photo by [Maxim Zhgulev](https://unsplash.com/@jemjoyrussia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/lock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)