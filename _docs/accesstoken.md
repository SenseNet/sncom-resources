---
title: "Access token"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/accesstoken.md'
category: Development
version: v7.0
tags: [access token, token, security, authentication, sn7]
description: In this article developers can learn about securing a custom feature by tokens.
---

# Access token
The Access token feature lets developers secure a specific feature. Access tokens are strings that represent a user and optionally a feature and a related content. Every token is generated for a single user and expires after a configured time. These tokens may be sent to the client and when the client sends it back to the server, the feature may use it to identify the user (and possibly a related content) represented by the token.

> For example the _Edit documents in the browser_ feature uses access tokens to let users open documents through the external _Office Online Server_ securely.

This developer feature has a server-side C# api that is able to generate, validate and manage access tokens. Tokens are stored using a dedicated [data provider extension](/docs/dataprovider-extension), which makes token storage customizable.

> The access token **life cycle** is managed by the system: developers may rely on the built-in mechanism to clean up expired tokens, or tokens generated for users or related content items that are deleted.

### Access token API
All token operations are made through the `AccessTokenVault` class and its methods.

##### Create token
Creates a new token for the provided user with the specified timeout. The token can be content- or feature-specific. This depends on the business needs of the feature where the token API is called from.

```csharp
var token = AccessTokenVault.CreateToken(userId, timeout, contentId, feature);
```

##### Get or add token
Loads an existing token or creates a new one for the given user with the specified timeout.
If there is an existing token that expires in less then 5 minutes, this method issues a new one.

```csharp
var token = AccessTokenVault.GetOrAddToken(userId, timeout, contentId, feature);
```

##### Get token
Returns the token by the specified value and filters if exists. The 'contentId' or 'feature' parameters are necessary if the original token was emitted by these.

```csharp
var token = AccessTokenVault.GetToken(tokenString, contentId, feature);
```

##### Get all tokens
Returns all tokens of the User.

```csharp
var tokens = AccessTokenVault.GetAllTokens(userId);
```

##### Token exists
Returns true if the specified token value exists and has not yet expired. The 'contentId' or 'feature' parameters are necessary if the original token was emitted by these.

```csharp
var tokenExists = AccessTokenVault.TokenExists(tokenString);
```

##### Assert tokenExists
Assumes the token value existence. Missing or expired token causes `InvalidAccessTokenException`.

```csharp
AccessTokenVault.AssertTokenExists(tokenString);
```

##### Update token
Updates the expiration date of the specified token value. Missing or expired token causes `InvalidAccessTokenException`.

```csharp
AccessTokenVault.UpdateToken(tokenString, DateTime.UtcNow.AddMinutes(30.0d));
```

##### Delete token
Deletes the specified token regardless of its expiration date.

```csharp
AccessTokenVault.DeleteToken(tokenString);
```

##### Delete tokens by user
Deletes all tokens of the provided user regardless of their expiration date.

```csharp
AccessTokenVault.DeleteTokensByUser(userId);
```

##### Delete tokens by content
Deletes the tokens related to the specified contentId regardless of expiration date.

```csharp
AccessTokenVault.DeleteTokensByContent(contentId);
```

##### Delete all access tokens
Deletes all AccessTokens even if they are still valid.

```csharp
AccessTokenVault.DeleteAllAccessTokens();
```