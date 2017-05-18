---
title: "Azure Blob Storage blob provider"
source_url: 'https://github.com/SenseNet/sensenet/docs/azureblob-provider.md'
category: Development
version: v7.0.0
tags: enterprise blob azure storage provider sn7
---

# Azure Blob Storage blob provider

By default **sensenet ECM** stores binaries (files) in its SQL database. If you want to store binaries in an external [Blob provider](blob-provider.md "sensenet blob provider") instead of the main [Content Repository](Content_Repository "wikilink") database, we offer a feature for our *Enterprise* customers that can store binaries in [Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/) so that operators have more flexibility when installing and maintaining sensenet ECM. We deliver our Enterprise customer an *Enterprise Azure Blob Package* that contains all the binaries needed to make it work.

## Details

[Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/) is a great choice for Enterprise solutions as binary storage. It is reliable and easy to adapt to.

## Installation and maintenance

You should follow the instructions below to install and maintain this enterprise feature.

### Azure Blob Storage provider installation

We tested this component with Microsoft's WindowsAzure.Storage v8.1.1 client library. You can learn more of Azure Blob Storage at the [Azure Blob Storage home page](https://azure.microsoft.com/en-gb/services/storage/blobs/).

### Configuration

You need to change the configuration file for your content repository and for tools as well in order to use Azure for blob storage.

For a first step, check the components. The following files must be copied from your Enterprise Azure Blob package into \[yourwebsite\]\\bin and \[yourwebsite\]\\tools:

-   Microsoft.WindowsAzure.Storage.dll
-   Microsoft.Data.Services.Client.dll
-   Microsoft.Data.OData.dll
-   Microsoft.Data.Edm.dll
-   Microsoft.Azure.KeyVault.Core.dll
-   SenseNet.AzureBlobStorage.dll

> It is important that you keep all the configurations in sync for the different components in sensenet ECM - otherwise you won't be able to save or read binaries correctly.

#### sensenet web application

The following file is affected: web.config To configure the Repository, you must do: Configure the connectionstring.

``` xml
<connectionStrings>
   <add name="SenseNet.AzureBlobStorage" connectionString="DefaultEndpointsProtocol=https;AccountName=[azure account name];AccountKey=[azure account key];EndpointSuffix=core.windows.net" />
   ...
```

Configure the blob provider:

``` xml
<sensenet>
    <blobStorage>
      <add key="BlobProvider" value="SenseNet.AzureBlobStorage.AzureBlobProvider" />
      <add key="MinimumSizeForBlobProviderKB" value="1" />
    </blobStorage>
      ...
```

#### Tools

Configure the tools if you use them. Modify all relevant configurations in the tools directory. The tool is relevant if the it reads or writes any repository content. The following files are affected: Import.exe.config, Export.exe.config, SyncPortal2AD.exe.config, SnAdminRuntime.exe.config. On each tool configuration file you must do as it was bid in the previous section.

### Backup

If you intend to implement a backup policy, you can do it easily with the use of [asynchronous copy blob](https://blogs.msdn.microsoft.com/windowsazurestorage/2012/06/12/introducing-asynchronous-cross-account-copy-blob/), that is a built-in feature of Azure:


### Migration

Currently there is no migration tool that moves existing binaries from the SQL database to Azure Blob Storage. However after you install this provider, the system will save new files to it and old files will also be moved as you save them.

-   [Blob provider migration](blob-provider.md#Migration "Migration")
