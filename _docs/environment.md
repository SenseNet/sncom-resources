---
title: "Preparation of benchmark environment"
source_url: 'https://github.com/SenseNet/sn-benchmark/blob/master/docs/environment.md'
category: Benchmark
version: v7.0.0
tags: [benchmark, preparation, environment, sn7, mongo, azure]
description: This paper describes how to prepare an environment for the sensenet Benchmark Tool with alternative BLOB storages in an NLB environment.
---

# Preparation of sensenet benchmark environment

This paper describes how to prepare an environment for the sensenet Benchmark Tool with alternative BLOB storages in an NLB environment.
## Using MS SQL Server with external MongoDb BLOB storage


#### Prerequisites:  
 - [sensenet Service 7.0.0 NuGet package](https://www.nuget.org/packages/SenseNet.Services/7.0.0-beta2 "SenseNet.Services")  
 - [Enterprise Mongo Package](http://community.sensenet.com/docs/mongodb-provider "MongoDB blob provider")

After having installed the above packages, your sensenet is able to use a MongoDb database to store BLOBs.

### Preparing BLOB database
Start Powershell
Start the mongo console (from  C:\Program Files\MongoDB\Server\3.4\bin):  
```
    .\mongo.exe  
```  
Execute these steps:  
```
    use <mongo db name>  
    db.createCollection("Blobs")  
    db.Blobs.createIndex( { FileIdentifier: 1, ChunkIndex: 1 }, { name: "FileIdentifier_ChunkIndex" })
```
Check DB existence:
```
    show dbs
```
```
    <mongo db name>    0.000GB
    admin     0.000GB
    local     0.000GB
```
### Creating the first website
 - Create a folder for the website (from now on it is \[site folder 1\])
and copy your site file structure into the newly made \[site folder 1\]:  
 - Edit config files:  
	insert the following into web.config:  
```xml
	<connectionStrings>
		<add name="SnCrMsSql" connectionString="Data Source=[sql server 1];Initial Catalog=[sql db name];Integrated Security=True" providerName="System.Data.SqlClient" />
		<add name="SenseNet.MongoDbBlobDatabase" connectionString="mongodb://[mongo server name]/[mongo db name]" />
		   ...
	</connectionStrings>
	...
	<appSettings>
		<add key="BlobProvider" value="SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.MongoDbBlobProvider" />
		<add key="MinimumSizeForBlobProviderKB" value="10" />
		<add key="MongoDbBlobDatabaseChunkSize" value="516096" />
		<add key="SecurityMsmqChannelQueueName" value=".\private$\security;FormatName:DIRECT=TCP:<web server 1 ip>\private$\security" />
		...
	</appSettings>
	<sensenet>
		<packaging>
			<add key="NetworkTargets" value="\\[web server 2]\Web\[site 2 name];...;\\[web server N]\Web\[site N name]" />
			...
		</packaging>
		<messaging>
			<add key="MsmqChannelQueueName" value=".\private$\web;FormatName:DIRECT=TCP:[web server 1 ip]\private$\web" />
		</messaging>
```  
	insert the following into SnAdminRuntime.exe.config:
```xml
	<connectionStrings>
		<add name="SnCrMsSql" connectionString="Data Source=[sql server name];Initial Catalog=[sql db name];Integrated Security=True" providerName="System.Data.SqlClient" />
		<add name="SenseNet.MongoDbBlobDatabase" connectionString="mongodb://[mongo server name]/[mongo db name]" />
		   ...
	</connectionStrings>
	...
	<appSettings>
		<add key="BlobProvider" value="SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.MongoDbBlobProvider" />
		<add key="MinimumSizeForBlobProviderKB" value="10" />
		<add key="MongoDbBlobDatabaseChunkSize" value="516096" />
		...
	</appSettings>
	...
	<sensenet>
		<packaging>
			<add key="NetworkTargets" value="\\[web server 2]\Web\[site 2 name];...;\\[web server N]\Web\[site N name]" />
			...
		</packaging>
```
- Install your custom contents you want to use in benchmark read operations:  
	Start Powershell, and execute the following commands:  
	```text
	cd C:\...\[site folder 1]\Admin\bin
	.\SnAdmin.exe [custom package] initialCatalog:[sql db name] dataSource:[sql server name]
	```
  - Check the database:  
	In Management Studio connect to the \[sql db name\] database and execute the following SQL command:
	```SQL
	SELECT COUNT(1) FROM [sql db name].[dbo].[Nodes]
	```
    The resulting number helps assuring, you have all you need in its place.

## Using MS SQL Server with external Azure BLOB storage


#### Prerequisites:  
 - [sensenet Service 7.0.0 NuGet package](https://www.nuget.org/packages/SenseNet.Services/7.0.0-beta2 "SenseNet.Services")  
 - [Enterprise Azure Blob Package](http://community.sensenet.com/docs/azureblob-provider/ "Azure blob provider")

After having installed the above packages, your sensenet is able to use Azure to store BLOBs.

### Creating the first website
 - Create a folder for the website (from now on it is \[site folder 1\])
and copy your site file structure into the newly made \[site folder 1\]:  
 - Edit config files:  
	insert the following into web.config:  
```xml
	<connectionStrings>
		<add name="SnCrMsSql" connectionString="Data Source=[sql server];Initial Catalog=[sql db name];Integrated Security=True" providerName="System.Data.SqlClient" />
       <add name="SenseNet.AzureBlobStorage" connectionString="DefaultEndpointsProtocol=https;AccountName=[azure account name];AccountKey=[azure account key];EndpointSuffix=core.windows.net" />
		   ...
	</connectionStrings>
	...
	<appSettings>
		<add key="SecurityMsmqChannelQueueName" value=".\private$\security;FormatName:DIRECT=TCP:[web server 1 ip]\private$\security" />
		...
	</appSettings>
    <sensenet>
    <blobStorage>
      <add key="BlobProvider" value="SenseNet.AzureBlobStorage.AzureBlobProvider" />
      <add key="MinimumSizeForBlobProviderKB" value="10" />
    </blobStorage>
      ...
    <sensenet>
	<packaging>
		<add key="NetworkTargets" value="\\[web server 2]\Web\[site 2 name];...;\\[web server N]\Web\[site N name]" />
	    ...
	</packaging>
		<messaging>
			<add key="MsmqChannelQueueName" value=".\private$\web;FormatName:DIRECT=TCP:[web server 1 ip]\private$\web" />
		</messaging>
```  
	insert the following into SnAdminRuntime.exe.config:
```xml
	<connectionStrings>
		<add name="SnCrMsSql" connectionString="Data Source=[sql server name];Initial Catalog=[sql db name]>;Integrated Security=True" providerName="System.Data.SqlClient" />
       <add name="SenseNet.AzureBlobStorage" connectionString="DefaultEndpointsProtocol=https;AccountName=[azure account name];AccountKey=[azure account key];EndpointSuffix=core.windows.net" />
		   ...
	</connectionStrings>
	...
    <sensenet>
        <blobStorage>
          <add key="BlobProvider" value="SenseNet.AzureBlobStorage.AzureBlobProvider" />
          <add key="MinimumSizeForBlobProviderKB" value="10" />
        </blobStorage>
          ...
        <packaging>
            <add key="NetworkTargets" value="\\[web server 2]\Web\[site 2 name];...;\\[web server N]\Web\[site N name]" />
			...
        </packaging>
```
- Install your custom contents you want to use in benchmark read operations:  
	Start Powershell, and execute the following commands:  
	```text
	cd C:\...\[site folder 1]\Admin\bin
	.\SnAdmin.exe [custom package] initialCatalog:[sql db name] dataSource:[sql server name]
	```
  - Check the database:  
	In Management Studio connect to the \[sql db name\] database and execute the following SQL command:
	```SQL
	SELECT COUNT(1) FROM [<sql db name>].[dbo].[Nodes]
	```
    The resulting number helps assuring, you have all you need in its place.
## Creating further websites
As you want to create more than one website to work together in NLB, you need to set up the others as well. In the following steps the current server related values were labeled with an N to tell from the first one:
 - Create a folder for the website (from now on it is \[site folder N\])
 - Copy the site file structure from the first site's folder into the newly made \[site folder N\]  
 - Editing config files:  
Editing web.config:  
Change the following values:  
	- from \[web server 1\] to \[web server N\]
	- from \[web server 1 ip\] to \[web server N ip\]  
	- from \[site 1 name\] to \[site N name\]  
  In the sensenet\packaging section you should make sure that every other than the current website exists in NetworkTargets.


