---
title: "Install sensenet in Azure"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/install-to-azure.md'
category: Guides
version: v7.0
tags: [install, cloud, azure, app service, sn7]
description: This article is for developers about installing sensenet in an Azure App Service project.
---

# Install sensenet in Azure

In this article we provide a step-by-step description of installing sensenet in an [App Service](https://docs.microsoft.com/en-us/azure/app-service/) project in Microsoft Azure.

## Install sensenet locally
As a prerequisite please install sensenet in Visual Studio using our NuGet packages.

- [Install sensenet](install-sn-from-nuget)

In the following sections we will go through the steps necessary to move this installation to the cloud. In a nutshell we will move the following components to Azure:

- database
- index
- messaging

## Deploy the database to the cloud
We will deploy the database to an **Azure SQL Database**. The easiest way to do that is the following:

1. open SQL Management Studio
2. right click on the local database
3. Tasks > **Deploy database to Microsoft Azure SQL Database...**

After connecting to your Azure SQL Server, you'll be able to start the migration process. Depending on the size of your initial database and the network bandwidth to Azure it should finish in a few minutes.

To learn more about the topic, visit [this article](https://docs.microsoft.com/hu-hu/azure/sql-database/sql-database-migrate-your-sql-server-database).

## Install a virtual machine for the Search service
In a cloud environment sensenet needs a central index (instead of individual local indexes on all app domains). Because the characteristics of the **Lucene search engine** that sensenet uses this requires a **file system storage**, so it needs to be on a virtual machine as of now.

We assume you already have a VM in Azure or you can install a new one at this point dedicated for this search service (which is a good practice).

> In the future we plan to provide easier ways for this (e.g. a pre-configured VM image), but currently you have to install the service manually.

## Deploy the local index to the VM
### Install the Search service
First you need to [install the Search service](https://github.com/SenseNet/sn-search-lucene29/blob/master/docs/search-service.md) on the VM. It is a Windows Service that can be deployed anywhere on the machine, it only writes files under its own directory.

On the link above you'll find instructions on how to install the currently available search service built on **Lucene 2.9**. In the future there may be other built-in search service implementations.

> The instructions above also contain information about a NuGet package to install in your web application in Visual Studio and configuring the providers - you may do that later (see the sections below).

Do not attempt to start the service yet - we will have to configure a few things before that.

### Copy the index directory
Please copy the new index directory from your new local sensenet installation to the service directory on the VM:

- from *[local web]\App_Data\LocalIndex*
- to *[virtualmachine]\[service folder]\App_Data\LocalIndex*

> Make sure that the copied directory does not contain a `write.lock` file among the index files because that will prevent the service from starting correctly.

## Register a messaging service
To work in the cloud sensenet needs a messaging infrastructure. This is necessary for app domains to communicate with each other.

> Currently we offer a messaging implementation for [RabbitMQ](https://www.rabbitmq.com), but it is easy to write a custom message provider for any of the well-known technologies.

To have a RabbitMQ service you may register one at their site (for smaller projects) or install RabbitMQ in your own environment for real enterprise projects.

To use RabbitMQ configuration elements in sensenet, please do not forget to register the appropriate config section in your web.config file.

```xml
  <configSections>
    <sectionGroup name="sensenet">
        ...
        <section name="rabbitmq" type="System.Configuration.NameValueFileSectionHandler" />
        ...
    </sectionGroup>
  </configSections>  
```

## Install and configure cloud packages
It is time to connect all the separate components. In this section we will install the necessary NuGet packages and configure the providers and endpoints on both the web app and the search service.

### Centralized search engine
Please follow the steps in the above mentioned [search service article](https://github.com/SenseNet/sn-search-lucene29/blob/master/docs/search-service.md) to install the necessary NuGet package in your web application. 

The NuGet package will insert the required entries into your web.config file, but please validate them nonetheless - and provide your own RabbitMQ service endpoint of course.

> Please note that in this case the main message provider and the security message provider we install is different - we will use RabbitMQ for messaging, see below.

> **Important**: please make sure you configure the *WCF* binding in your config files correctly regarding security. For details please check the official documentation:
> - [Security config](https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/file-schema/wcf/security-of-nettcpbinding)
> - [Securing Services and Clients](https://docs.microsoft.com/en-us/dotnet/framework/wcf/feature-details/securing-services-and-clients)

For **development purposes** you may switch off security check temporarily for your binding:

```xml
<binding name="NetTcpBinding_ISearchServiceContract" >
    <security mode="None" />
</binding>
```

### Messaging
To let web app domains communicate with each other and the service be notified about security changes, we have to configure the cloud-compatible messaging providers (both *main* and *security*).

- [Main RabbitMQ messaging provider](https://github.com/SenseNet/sn-messaging-rabbitmq/blob/master/docs/messaging-rabbitmq.md) *(only in web.config, NOT the search service)*
- [Security message provider for RabbitMQ](https://github.com/SenseNet/sn-security/blob/master/docs/security-messaging-rabbitmq.md) *(both web.config and search service config)*

> **Important**: after installing the security provider package above, you will need to **copy the provider dll** (*SenseNet.Security.Messaging.RabbitMQ.dll*) to the service folder in your VM, so that the search service can load the configured security provider.

### Logging
The default logger in sensenet currently writes to the Windows *Event Log*. This is correct in a local environment but in the cloud we need a more modern approach.

Although there is a built-in logger that can write log entries to the file system, it is advisable to use an Azure-friendly logger that can write to [Application Insights](https://docs.microsoft.com/en-us/azure/application-insights/). Please install and configure the package described here:

- [Azure Application Insights logger](https://github.com/SenseNet/sn-logging-applicationinsights)

## Connection strings
Please review all the connection strings: they have to point to the **new cloud database** we deployed earlier.

- the *web.config* of your application
- the *SnAdminRuntime.exe.config* in the `web\Tools` folder of your application
- the config file (*SenseNet.Search.Lucene29.Centralized.Service.exe*) of the search service on the VM.

## Start the Search Service
Please make sure you configured the following elements correctly in the service's config file:

- service endpoint: url and port number
- open port: the service will listen on a TCP port (by default), please make sure that it is accessible from outside
- database connection string (*SecurityStorage*)
- messaging service url

At this point everything is configured on the service's side, you should be able to start it.

## Publish the application
The last step is to publish your application to Azure. You can do that in Visual Studio if you follow the instructions here:

- [Publish a Web app to Azure App Service](https://docs.microsoft.com/en-us/visualstudio/deployment/quickstart-deploy-to-azure?view=vs-2017)

## Scaling and monitoring
After your application has started correctly, you can use the usual Azure features to work with it: 

- you may increase the number of app domains (*Scale out* menu item on the App Service page)
- you can monitor events and trace messages using *Application Insights*
- you can even debug the app service in Visual Studio and monitor events there

## Maintenance
When we [release a patch](https://community.sensenet.com/blog/2018/02/14/install-patch) for one of the sensenet packages, in most cases you do not have to do anything unusual: just update the NuGet package(s) and you can re-publish your application.

There are cases however when the patch contains **content or database changes** that need to be performed before you can use the new code. In these cases you have **stop your Azure application** entirely and execute the patch you downloaded from the components release page on GitHub. This is necessary because database changes during patching may interfere with your live site, this is why these patches need to be executed when the site is down.

> In some cases there are even more [complex patches](https://community.sensenet.com/blog/2018/03/05/complex-patch), but that happens very rarely.

You can also use [SnAdmin](https://community.sensenet.com/docs/snadmin/) the same way as in case of a local application (e.g. execute [SnAdmin tools](https://community.sensenet.com/docs/snadmin-tools/)), just make sure your `web\Tools\SnAdminRuntime.exe.config` file contains the same connection string, provider and service endpoint configuration as your web.config.

## Troubleshooting
If you experience a really slow app start for the first time and an application timeout happens, please consider the following:

- Check that the search service is running (Windows Services dialog).
- Check that the service endpoint is accessible from outside (e.g. the port is open).
- Check the log in the search service's `App_Data\DetailedLog` folder. If you see a constant activity there during startup, you may try to reindex the repository. If you configured your `SnAdminRuntime` tool correctly, you can simply perform an indexing operation by executing the `snadmin index` command from the command line (but make sure you switch OFF your Azure App Service before you do that).
- Try to raise the search service timeout and message size values in your web.config (look for the `readerQuotas` and `maxBufferSize` keywords in the *WCF* binding documentation).