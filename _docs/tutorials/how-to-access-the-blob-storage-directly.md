---
title:  "How to access the blob storage directly"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-access-the-blob-storage-directly.md'
category: Tutorials
version: v7.0
tags: [blob, storage, provider, database, sn7]
description: This article describes the way for developers to access the blob storage directly.
---

Sensenet offers several different options for storing binaries. By default everything is stored in the database, but it is also possible to store binaries in an **external blob storage**. About the concept and basics on how to configure or create custom blob providers, please visit the main article:

* [Blob provider](/docs/blob-provider)

This article is for developers about how to read or write binaries that are stored in an external blob storage **directly, without having to send them through the portal's REST API**.

The idea is that you want to access the blob storage (e.g. read or write files) but without putting too much pressure on the web servers. In this solution you will still have to send a few requests to the portal, but direct binary access (loading or writing the bits) will go through a local blob storage API. In case of creating a new file the workflow is the following:

1. Send an initial request to the portal for a _token_.
2. Write the binary using the token.
3. Send a finalize request to the portal.

The start and finish requests are necessary because we still have to write to the metadata storage when working with binaries. This method takes _part of the load_ off the web server by writing the bits directly to the blob storage.

> If you use the [.Net Client library](https://github.com/SenseNet/sn-client-dotnet) for these operations (as we recommend) you would not even have to send the requests above manually: it will take a single method call to write a file to the blob storage. See an example below.

## Blob storage component usage
Currently these are packages that you have to install if you want to work with the blob storage directly in your external tool (for example a console application that imports files through our REST API).

* SenseNet.BlobStorage [![NuGet](https://img.shields.io/nuget/v/SenseNet.BlobStorage.svg)](https://www.nuget.org/packages/SenseNet.BlobStorage)
* SenseNet.Client [![NuGet](https://img.shields.io/nuget/v/SenseNet.Client.svg)](https://www.nuget.org/packages/SenseNet.Client)

In case you need _transactionality_ in your tool - for example because you decided to use the _FILESTREAM_ feature of SQL Server or you you have another blob provider that requires this - you will have to inject a _transaction factory_ at the start of your application:

```csharp
CommonComponents.TransactionFactory = new SqlTransactionFactory();
```

This is not necessary in most cases, e.g. when you work with the default SQL storage configuration.

### Configuration
It is important to know that blob storage configuration in the external tool have to be the **same as on the portal** to make this component work correctly. Please review the necessary configuration values in the main [Blob provider](/docs/blob-provider) article.

You will also have to make sure that the usual **platform-specific configurations** (e.g. the _connection string_ for the blob storage server) are also set in the tool's config file.

## Examples
The following examples are written using the Client library API that connects to the portal through the REST API.

### Saving a file
Saving a file through the blob storage:

```csharp
await Content.UploadBlobAsync(parentId, fileName, fileLength, async (contentId, versionId, uploadToken) =>
{
    // load a stream from the file system
    using (var localStream = File.OpenRead(filePath))
    {
        // write it directly to the blob storage
        await BlobStorageClient.CopyFromStreamAsync(versionId, uploadToken, localStream);
    }
});
```

You have to provide the necessary environment values (parent folder id, content name, length) and an action to perform when writing to the blob storage directly. You may use this place to log or take other steps, but generally you can use the code above as is, without changes. The client api hides the start and finalize requests from you, so you will not have to bother with those requests manually.

Take a look at the other methods of the _BlobStorageClient_ class (that is the entry point for client blob operations) for other possibilities like writing chunks or loading readonly streams.

### Loading a readonly stream

```csharp
// get the blob token first from the portal
var token = await Content.GetBlobToken(fileId);
using (var stream = BlobStorageClient.GetStreamForRead(token))
{
    // process the stream...
    await stream.CopyToAsync(target);
}
```