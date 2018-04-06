---
title: "MongoDB blob provider"
source_url: 'https://github.com/SenseNet/sn-blob-mongodb/blob/master/docs/mongodb-provider.md'
category: Development
version: v6.5.5
tags: [enterprise blob provider sn6 sn7]
description: This article is about an external blob provider for MongoDB.
---

# MongoDB blob provider

By default **sensenet** stores binaries (files) in the database. In enterprise environments it is not a suitable solution for various reasons (licensing and storage among them), so we offer an option to store binaries in an external [Blob provider](https://community.sensenet.com/docs/blob-provider/) instead of the main [Content Repository](https://community.sensenet.com/docs/content-repository) database. This article is about an external blob provider that stores binaries in [MongoDB](https://www.mongodb.com) so that operators have more flexibility when installing and maintaining sensenet. 

Although [MongoDB](https://www.mongodb.com) is capable of storing metadata (usually that is what it is used for), we decided to use it as our binary storage in this blob provider. We chose it because it is more scalable and reliable than a simple file system (SMB) solution and is able to work better in a distributed environment.

## Installation and maintenance

You should follow the instructions below to install and maintain this enterprise feature.

### MongoDB installation

We tested this component with MongoDB 3.2. You need to be familiar with this third party product to install, set up and administer it. You can learn more of this version at the [MongoDB 3.2 homepage](https://docs.mongodb.com/v3.2/).

### MongoDB Blob Storage Provider NuGet package

Please install the following NuGet package in order to use the provider in your project:

[![NuGet](https://img.shields.io/nuget/v/SenseNet.MongoDbBlobStorage.svg)](https://www.nuget.org/packages/SenseNet.MongoDbBlobStorage)

### Configuration

You need to change the configuration file for your Content Repository and for tools as well in order to use MongoDB for blob storage.

> It is important that you keep all the configurations in sync for the different components in sensenet - otherwise you won't be able to save or read binaries correctly.

#### sensenet web application

The following file is affected: `Web.config`

Please configure the sensenet MongoDB Blob Storage **connectionstring** (provide a valid connectionstring like this: `mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]` 

For details please follow this link: [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/).

> The only further constraint on it that the **database name is mandatory**.

```xml
<connectionStrings>
   <add name="SenseNet.MongoDbBlobDatabase" connectionString="mongodb://[hostname]:[port]/[database name]" />
   ...
```

Configure the **BinaryChunkSize** that must be multiple of the **MongoDbBlobDatabaseChunkSize** (see below).

```xml
<sensenet>
   <blobstorage>
      <add key="BinaryChunkSize" value="5160960" />
      ...
```

Configure the blob provider and the threshold for storing files in the separate blob storage:

```xml
<sensenet>
   <blobstorage>
      <add key="BlobProvider" value="SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.MongoDbBlobProvider"/>|
      <add key="MinimumSizeForBlobProviderKB" value="500"/>
```

Configure the size of binary chunks stored in MongoDB:

```xml
<appSettings>
   <add key="MongoDbBlobDatabaseChunkSize" value="516096"/>
   ...
```

> **Important**: *BinaryChunkSize* must be a multiple of *MongoDbBlobDatabaseChunkSize* (in other words it should be possible to divide BinaryChunkSize with MongoDbBlobDatabaseChunkSize without a remainder) otherwise an exception is thrown.

#### Tools

Configure all the command line tools that connect to the Content Repository the same way. Most importantly modify the *SnAdminRuntime.exe* configuration in the *web\Tools* directory.

### Sharding

The MongoDB Blob Provider can be used in a sharded environment. Of course if you use sharding you have to add the host and port of a routing server (*mongos*) to the connection string instead of a single data server (*mongod*). On the first binary content operation the provider creates a collection named `Blobs` in the given database with a `FileIdentifier` guid field in it. FileIdentifier is a generated unique identifier, so it is strongly recommended to use it as the **shard key**. The MongoDB Blob Provider was tested in a MongoDB 3.2 sharded cluster environment with two distributed shards in it. For more about sharding please read the [vendor's documentation](https://docs.mongodb.com/manual/sharding/).

### Migration

Currently there is no migration tool that moves existing binaries from the main database to MongoDB. However after you install this provider, the system will save new files to it and old files will also be moved as you save them. If you want your old files to be moved to the new storage, you either have to wait for them to be migrated when their binary is saved next time, or you'll have to create a tool that iterates through the files and saves them programmatically.
