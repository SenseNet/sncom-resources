---
title: "Install sensenet in Azure"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/install-to-azure.md'
category: Guides
version: v7.0
tags: [install, azure, services, sn7]
description: This article is for developers about installing sensenet as part of an App Service in Azure.
---

# Install sensenet in Azure

In this article we provide a step-by-step description of installing sensenet in an [App Service](https://docs.microsoft.com/en-us/azure/app-service/) project in Microsoft Azure.

## Install sensenet locally
As a prerequisite please install sensenet in Visual Studio into your application using our NuGet packages.

- [Install sensenet](install-sn-from-nuget)

In the following sections we will go through the steps necessary to move this installation to the cloud. In a nutshell we will move the following components to Azure:

- database
- index
- messaging

## Deploy the database to the cloud
We will deploy the database to an Azure SQL Server instance. The easiest way to do that is the following:

1. open SQL Management Studio
2. right click on the local database
3. Tasks > **Deploy database to Microsoft Azure SQL Database...**

After connecting to your Azure SQL Server, you'll be able to start the migration process. Depending on the size of your initial database and the network bandwidth to Azure it should finish in a few minutes.

To learn more about the topic, visit [this article](https://docs.microsoft.com/hu-hu/azure/sql-database/sql-database-migrate-your-sql-server-database).

## Deploy a virtual machine for the Search service
In a cloud environment sensenet needs a central index (instead of individual local indexes on all app domains). Because the characteristics of the **Lucene search engine** that sensenet uses this requires a **local file system storage**, so it needs to be on a virtual machine as of now.

We assume you already have a VM in Azure or you can install a new one at this point dedicated for this search service (which is a good practice).

> In the future we plan to provide a pre-configured VM image for this purpose, but currently you have to install the service manually.

## Deploy the local index to the VM
### Install the Search service
First you need to [install the Search service](https://github.com/SenseNet/sn-search-lucene29/blob/master/docs/search-service.md) on the VM. It is a Windows Service that can be deployed anywhere on the machine, it only writes files under its own directory.

On the link above you'll find instructions on how to install the currently available search service built on **Lucene 2.9**. In the future there may be other built-in search service implementations.

> The instructions above also contain information about a NuGet package to install in your web application in Visual Studio and configuring the providers - you may do that later (see the sections below).

### Copy index directory
Please copy the new index directory from your new local sensenet installation to the service directory on the VM:

- from *[local web]\App_Data\LocalIndex*
- to *[virtualmachine]\[service folder]\App_Data\LocalIndex*

> Make sure that the copied directory does not contain a `write.lock` file among the index files because that will prevent the service from starting correctly.

## Register a RabbitMQ service
To work in the cloud sensenet needs a messaging infrastructure. This is necessary for app domains to communicate with each other.

> Currently we offer a messaging implementation for RabbitMQ, but it is easy to write a custom message provider for any of the well-known technologies.

To have a [RabbitMQ service](https://www.rabbitmq.com) you may register one at their site (for smaller projects) or install RabbitMQ in your own environment for real enterprise projects.

## Install and configure cloud packages

### Centralized search engine
### Messaging

- [Main RabbitMQ messaging provider](https://github.com/SenseNet/sn-messaging-rabbitmq/blob/master/docs/messaging-rabbitmq.md)
- [Security message provider for RabbitMQ](https://github.com/SenseNet/sn-security/blob/master/docs/security-messaging-rabbitmq.md)