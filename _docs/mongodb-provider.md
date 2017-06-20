---
title: "MongoDB blob provider"
source_url: 'https://github.com/SenseNet/sensenet/docs/mongodb-provider.md'
category: Development
version: v6.5.5
tags: enterprise blob provider sn6 sn7
---

# MongoDB blob provider

By default **sensenet ECM** stores binaries (files) in the database. In enterprise environments it is not a suitable solution for various reasons (licensing and storage among them), so we offer an option to store binaries in an external [Blob provider](Blob_provider "wikilink") instead of the main [Content Repository](Content_Repository "wikilink") database. This article is about an external blob provider we offer for our *Enterprise* customers. It stores binaries in [MongoDB](https://www.mongodb.com) so that operators have more flexibility when installing and maintaining sensenet ECM. We deliver our Enterprise customer an *Enterprise Mongo Package* that contains all the binaries needed to make it work.

## Details
-
Although [MongoDB](https://www.mongodb.com) is capable of storing metadata (usually that is what it is used for), we decided to use it as our binary storage in this blob provider. We chose it because it is more scalable and reliable than a simple file system (SMB) solution and is able to work better in a distributed environment.

## Installation and maintenance

You should follow the instructions below to install and maintain this enterprise feature.

### MongoDB installation

We tested this component with MongoDB 3.2. You need to be familiar with this third party product to install, set up and administer it. You can learn more of this version at the [MongoDB 3.2 homepage](https://docs.mongodb.com/v3.2/).

### Configuration

You need to change the configuration file for your content repository and for tools as well in order to use MongoDB for blob storage.

For a first step, check the components. The following files must be copied from your Enterprise Mongo Driver package into \[yourwebsite\]\\bin and \[yourwebsite\]\\tools:

-   MongoDB.Bson.dll
-   MongoDB.Driver.Core.dll
-   MongoDB.Driver.dll
-   SenseNet.MongoDbBlobStorage.dll

> It is important that you keep all the configurations in sync for the different components in sensenet ECM - otherwise you won't be able to save or read binaries correctly.

#### sensenet web application

The following file is affected: web.config To configure the Repository, you must do: Configure the connectionstring. (Give a valid connectionstring like this: *mongodb://\[username:password@\]host1\[:port1\]\[,host2\[:port2\],...\[,hostN\[:portN\]\]\]\[/\[database\]\[?options\]\]* For further reading: <https://docs.mongodb.com/manual/reference/connection-string/>) The only further constraint on it that the database name is always mandatory.

``` xml
<connectionStrings>
   <add name="SenseNet.MongoDbBlobDatabase" connectionString="mongodb://[hostname]:[port]/[database name]" />
   ...
```

Configure the **BinaryChunkSize** that must be multiple of the **MongoDbBlobDatabaseChunkSize** (see below).

``` xml
<sensenet>
   <dataHandling>
      <add key="BinaryChunkSize" value="5160960" />
      ...
```

Configure the blob provider:

``` xml
<appSettings>
   <add key="BlobProvider" value="SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.MongoDbBlobProvider"/>|
   <add key="MinimumSizeForBlobProviderKB" value="10000"/>
   <add key="MongoDbBlobDatabaseChunkSize" value="516096"/>
   ...
```

Take care of the the **BinaryChunkSize** and **MongoDbBlobDatabaseChunkSize** values: **BinaryChunkSize** can be divided without a remainder with **MongoDbBlobDatabaseChunkSize**.
> **BinaryChunkSize must be multiple of MongoDbBlobDatabaseChunkSize otherwise an exception is thrown.**

#### Tools

Configure the tools if you use them. Modify all relevant configurations in the tools directory. The tool is relevant if the it reads or writes any repository content. The following files are affected: Import.exe.config, Export.exe.config, SyncPortal2AD.exe.config, SnAdminRuntime.exe.config. On each tool configuration file you must do as it was bid in the previous section.

### Sharding

The MongoDB Blob Provider can be used in sharded environment. Of course if you use sharding you have to add the host and port of a routing server (mongos) to the connection string instead of a single data server (mongod). On the first binary content operation the provider creates a collection named Blobs in the given database with a FileIdentifier guid field in it. FileIdentifier is a generated unique identifier, so it is strongly recommended to use it as the shard key. The MongoDB Blob Provider was tested in a MongoDB 3.2 sharded cluster environment with two distributed shards in it. For more about sharding please read the [vendor's documentation](https://docs.mongodb.com/manual/sharding/).

### Backup

### Migration

Currently there is no migration tool that moves existing binaries from the main database to MongoDB. However after you install this provider, the system will save new files to it and old files will also be moved as you save them.

-   [Blob provider migration](Blob_provider#Migration "wikilink")
 - [Back to blob provider](/_docs/blob-provider.md)
