---
title:  "Getting started with sensenet and the .Net Core client"
category: Tutorials
index: 0
version: v7.0
tags: [dotnet, getting started, client]
description: This tutorial shows you how to start using sensenet with the .Net client API.
---

# Getting started with sensenet and the .Net client
In this tutorial we will export a folder structure containing subfolders and files to the file system, using the .Net Client library for sensenet.

You'll find the full source code at the end of this article.

## Create a new console application
Create a new .Net Core console application either in command line (`dotnet new`), Visual Studio or VS Code.

Install the following NuGet package:

SenseNet.Client [![NuGet](https://img.shields.io/nuget/v/SenseNet.Client.svg)](https://www.nuget.org/packages/SenseNet.Client)

Add the following namespace registration to the beginning of your `Program.cs` file:

```csharp
using SenseNet.Client;
```

## Set up the connection to the sensenet service
Create a server object and provide your sensenet service url.

> If you do not have a repository yet, please head over to [www.sensenet.com](https://www.sensenet.com) to get one.

```csharp
static async Task Main(string[] args)
{
    // define sensenet service url
    var server = new ServerContext
    {
        Url = "https://example.sensenet.cloud"
    };

    ClientContext.Current.AddServer(server);
}
```

> **Important**: In this tutorial we assume that all the content items you are working with are **public** (accessible for visitors). You can make content (for example files or whole folders) public on the admin UI: on the **Set permissions** page hit the Make content public button.
>
> To access private content, please check out how to add [authentication](how-to-authenticate-dotnet) to your client application.

## Load and iterate through a content collection
First we want to load all child items in an existing folder.

```csharp
var children = await Content.LoadCollectionAsync(repositoryPath);
```

Iterate through the collection. Please note that here we treat child items as `dynamic` objects. This makes accessing properties easier and simpler.

```csharp
foreach (dynamic child in children)
{
    var contentType = (string) child.Type;

    // If child is a file: save it to the file system.
    // If it is a folder, iterate through its children recursively.
}
```

## Save files to the file system
The following code fragment shows the easiest way to save binary streams from the repository to the file system.

```csharp
using var fs = File.OpenWrite(localPath);
await RESTCaller.GetStreamResponseAsync((int) child.Id, message =>
{
    // save file (currently this has to be synchronous)
    message.Content.CopyToAsync(fs).GetAwaiter().GetResult();
}, CancellationToken.None);
```

## Put it all together
We assembled all the fragments above to a separate method that can be called recursively on subfolders. This is how the whole source code looks like.

If you execute it, it will export folders and files from the `/Root/Content/Folder` container from the repository to the `C:\temp\export` folder in the file system.

```csharp
class Program
{
    static async Task Main(string[] args)
    {
        // define sensenet service url
        var server = new ServerContext
        {
            Url = "https://example.sensenet.cloud"
        };

        ClientContext.Current.AddServer(server);

        await ExportFolderAsync("/Root/Content/Folder", "C:\\temp\\export");
    }

    private static async Task ExportFolderAsync(string repositoryPath, string targetPath)
    {
        var children = await Content.LoadCollectionAsync(repositoryPath);

        foreach (dynamic child in children)
        {
            var contentType = (string) child.Type;
            var localPath = Path.Combine(targetPath, child.Name);

            switch (contentType)
            {
                case "Folder":
                {
                    // create folder in file system
                    Directory.CreateDirectory(localPath);

                    // export subfolders recursively
                    await ExportFolderAsync((string) child.Path, localPath);
                    break;
                }
                case "File":
                {
                    // export file
                    using var fs = File.OpenWrite(localPath);
                    await RESTCaller.GetStreamResponseAsync((int) child.Id, message =>
                    {
                        // save file (currently this has to be synchronous)
                        message.Content.CopyToAsync(fs).GetAwaiter().GetResult();
                    }, CancellationToken.None);
                    break;
                }
            }
        }
    }
}
```