---
title:  "How to authenticate with a sensenet repository from a .Net client"
category: Tutorials
index: 0
version: v7.0
tags: [dotnet, getting started, client]
description: This tutorial shows you how to make authenticated calls to sensenet using the .Net client API.
---

# How to authenticate with a sensenet repository from a .Net client
Unless you are working with publicly available content - like blog posts - it is necessary to make **athenticated** calls to the sensenet repository to access content items. In this article you'll see how to achieve that in a .Net application.

> To learn more about the sensenet authentication flow and components, please visit [this article]().
>
> If you do not have a repository yet, please head over to [www.sensenet.com](https://www.sensenet.com) to get one.
>
> You will need a **secret** (similar to an API key) to complete this article. To get the necessary secret for your content repository, please visit [www.sensenet.com](https://www.sensenet.com) and log in to your profile.

## Create a new console application
Create a new .Net Core console application either in command line (`dotnet new`), Visual Studio or VS Code.

Install the following NuGet packages:

```
SenseNet.Client
Microsoft.Extensions.DependencyInjection
Microsoft.Extensions.Logging.Console
```

Add the following namespace registrations to the beginning of your `Program.cs` file:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SenseNet.Client;
using SenseNet.Client.Authentication;
using SenseNet.Extensions.DependencyInjection;
```

## Register and load a token store service
In an Asp.Net Core web application registering services is more straightforward, but in a console application you'll have to do some manual work to achieve the same result:

```csharp
// assemble a service container and register the sensenet token store
var provider = new ServiceCollection()
    .AddSenseNetClientTokenStore()
    .AddLogging(logging => logging.AddConsole())
    .BuildServiceProvider();

// load the token store service
var tokenStore = provider.GetService<TokenStore>();
```

## Set up the connection to the sensenet service
Create a server object and provide your sensenet service url and authentication token. The token is received from our auth server (which uses **IdentityServer 4** to manage tokens). 

```csharp
// define sensenet service url
var server = new ServerContext
{
    Url = "https://example.sensenet.cloud"
};

// request and set the access token
server.Authentication.AccessToken = await tokenStore.GetTokenAsync(server, "secret");

ClientContext.Current.AddServer(server);
```

From now on you'll be able to send authenticated requests to the server. The permission level of the request is determined by the **secret** you provide here: it represents a user in the content repository.