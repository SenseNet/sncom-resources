---
title: "Azure Blob Storage blob provider"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/azureblob-provider.md'
category: Development
version: v7.0.0
tags: enterprise blob azure storage provider sn7
description: Azure Blob Storage-based external blob provider for the sensenet platform.
---

# Azure Blob Storage blob provider

By default **sensenet** stores binaries (files) in its main database. If you want to store binaries in an external [Blob provider](blob-provider.md "sensenet blob provider") instead of the main [Content Repository](content-repository.md "Content Repository") database, we let you store binaries in [Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/) so that operators have more flexibility when installing and maintaining sensenet.

Azure Blob Storage is a great choice for Enterprise solutions as a binary storage. It is reliable and easy to adapt to.

## Installation and maintenance

We tested this component with the `Microsoft.Azure.Storage.Blob` v9.4.2 client library. You can learn more of Azure Blob Storage at the [Azure Blob Storage home page](https://azure.microsoft.com/en-gb/services/storage/blobs/). You should follow the instructions below to install and maintain this enterprise feature.

> **Multiple blob providers**: you cannot write to multiple blob providers at the same time, but you can change to another blob provider at any time: as long as all the necessary blob provider libraries are present in the application folder, old binaries written into a previous blob provider will still be accessible. This makes it possible to migrate to a new blob provider gradually, without a long app downtime.

### Azure Blob Storage provider installation

To get started install the following NuGet package:

[![NuGet](https://img.shields.io/nuget/v/SenseNet.AzureBlobStorage.svg)](https://www.nuget.org/packages/SenseNet.AzureBlobStorage)

### Configuration
In order to use Azure for blob storage you have to configure the new Azure blob provider. 

#### Connection string
Azure blob provider needs a connection string that points to the appropriate Azure storage. The place of this connection string is up to you, the following is only a best practice:

``` xml
<connectionStrings>
   <add name="SenseNet.AzureBlobStorage" connectionString="DefaultEndpointsProtocol=https;AccountName=[azure account name];AccountKey=[azure account key];EndpointSuffix=core.windows.net" />
   ...
```

#### Configure the provider
We have to tell the system to use the Azure blob provider as the appointed external blob storage. To do that add the following code to your application global class:

```csharp
protected override void BuildRepository(IRepositoryBuilder repositoryBuilder)
{
    repositoryBuilder.UseAzureBlobStorage(
        ConfigurationManager.ConnectionStrings["SenseNet.AzureBlobStorage"].ConnectionString,
        BlobStorage.BinaryChunkSize);

    base.BuildRepository(repositoryBuilder);
}
```

> **Please note** that the chunk size for this provider has to be **the same value** as the system-wide binary chunk size, otherwise writing operations will fail.

### Backup

If you intend to implement a backup policy, take a look at the following article to see the different options for that.

- [Azure Block Blob Storage Backup](https://azure.microsoft.com/en-us/blog/microsoft-azure-block-blob-storage-backup/)

### Migration
Currently there is no migration tool that moves existing binaries from the main Content Repository database (or from another blob provider) to Azure Blob Storage. However after you install this provider, the system will save new files to it and old files will also be moved as you save them.

- [Blob provider migration](blob-provider.md#Migration "Migration")