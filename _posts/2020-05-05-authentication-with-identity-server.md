---

title: "Authentication to sensenet with IdentityServer4"
author: [zoltanbedi]
image: "../img/posts/lock-is.jpg"
tags: [authentication]

---

We have changed to authentication for sensenet 7 to IdentityServer4. 
Here are 5 things you need to know when you migrate to the new authentication.

---

## What is IdentityServer4?

IdentityServer4 is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core 3.0. Come again? What does that even mean? What is OpenID Connect and OAuth 2.0? 

Quoting from [https://oauth.net/2/](https://oauth.net/2/)
> OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices. This specification and its extensions are being developed within the [IETF OAuth Working Group](https://www.ietf.org/mailman/listinfo/oauth).

Quoting from [https://openid.net/connect/](https://openid.net/connect/)
> OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.




Photo by [Maxim Zhgulev](https://unsplash.com/@jemjoyrussia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/lock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)