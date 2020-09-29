---
title: "Configuration reference"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/config-reference.md'
category: Development
version: v7.0.0
tags: [configuration, sn7]
description: This article contains a list of all configuration values available in sensenet.
---

# sensenet configuration reference

This article aims to be a complete list of config values available in all sensenet components. If you need to know more about the features they belong to, please follow the details links next to descriptions if available.

## **appSettings** section
### ChunkSize
[sn-preview / SenseNet.Preview.AsposePreviewGenerator.Configuration](https://github.com/SenseNet/sn-preview/blob/master/src/Aspose/AsposePreviewGenerator/Configuration.cs "See on github")

**Default value:** 10485760

----
### DistributableSecurityActivityMaxSize
[sn-security / SenseNet.Security.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security/Configuration.cs "See on github")

**Default value:** 200000

----
### MessageProcessorThreadCount
[sn-security / SenseNet.Security.Messaging.Msmq.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security.Messaging.Msmq/Configuration.cs "See on github")

**Default value:** 3

----
### MessageProcessorThreadMaxMessages
[sn-security / SenseNet.Security.Messaging.Msmq.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security.Messaging.Msmq/Configuration.cs "See on github")

**Default value:** 100

----
### MessageRetentionTime
[sn-security / SenseNet.Security.Messaging.Msmq.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security.Messaging.Msmq/Configuration.cs "See on github")

**Default value:** 10

**Minimum value:** 2

----
### MongoDbBlobDatabaseChunkSize
[sn-blob-mongodb / SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.Configuration](https://github.com/SenseNet/sn-blob-mongodb/blob/master/src/MongoDbBlobStorage/Configuration.cs "See on github")

**Default value:** 1024 * 8

----
### MsmqReconnectDelay
[sn-security / SenseNet.Security.Messaging.Msmq.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security.Messaging.Msmq/Configuration.cs "See on github")

**Default value:** 30

----
### ODataServiceToken
[sn-preview / SenseNet.Preview.AsposePreviewGenerator.Configuration](https://github.com/SenseNet/sn-preview/blob/master/src/Aspose/AsposePreviewGenerator/Configuration.cs "See on github")

**Default value:** odata.svc

----
### PackageDirectory
[sensenet / SenseNet.Tools.SnAdmin.Testability.PhysicalDisk](https://github.com/SenseNet/sensenet/blob/master/src/Tools/SnAdminRuntime/testability/Disk.cs "See on github")

**Default value:** ?

----
### PreviewResolution
[sn-preview / SenseNet.Preview.AsposePreviewGenerator.Configuration](https://github.com/SenseNet/sn-preview/blob/master/src/Aspose/AsposePreviewGenerator/Configuration.cs "See on github")

**Default value:** 300

----
### SecurityMessageProvider
[sn-security / SenseNet.Security.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security/Configuration.cs "See on github")

**Default value:** SenseNet.Security.Messaging.DefaultMessageProvider

----
### SecurityMsmqChannelQueueName
[sn-security / SenseNet.Security.Messaging.Msmq.Configuration](https://github.com/SenseNet/sn-security/blob/master/src/SenseNet.Security.Messaging.Msmq/Configuration.cs "See on github")

----
### TargetDirectory
[sensenet / SenseNet.Tools.SnAdmin.Testability.PhysicalDisk](https://github.com/SenseNet/sensenet/blob/master/src/Tools/SnAdminRuntime/testability/Disk.cs "See on github")

**Default value:** ?

----
### TaskExecutionTimeoutInSeconds
[sn-taskmanagement / SenseNet.TaskManagement.Web.Configuration](https://github.com/SenseNet/sn-taskmanagement/blob/master/src/TaskManagementWeb/Configuration.cs "See on github")

**Default value:** 30

----
## **connectionStrings** section
### SecurityStorage
[sensenet / SenseNet.Configuration.ConnectionStrings](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/ConnectionStrings.cs "See on github")

**Default value:** connectionStrings/SnCrMsSql

----
### SenseNet.MongoDbBlobDatabase
[sn-blob-mongodb / SenseNet.ContentRepository.Storage.Data.MongoDbBlobStorage.Configuration](https://github.com/SenseNet/sn-blob-mongodb/blob/master/src/MongoDbBlobStorage/Configuration.cs "See on github")

**Default value:** mongodb://localhost/SenseNetBlobStorage

----
### SignalRDatabase
[sensenet / SenseNet.Configuration.ConnectionStrings](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/ConnectionStrings.cs "See on github")

**Default value:** connectionStrings/SnCrMsSql

----
### SnCrMsSql
[sensenet / SenseNet.Configuration.ConnectionStrings](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/ConnectionStrings.cs "See on github")

**Default value:** Persist Security Info=False;Initial Catalog=SenseNetContentRepository;Data Source=MySenseNetContentRepositoryDatasource;User ID=SenseNetContentRepository;password=SenseNetContentRepository

----
### TaskDatabase
[sn-taskmanagement / SenseNet.TaskManagement.Web.Configuration](https://github.com/SenseNet/sn-taskmanagement/blob/master/src/TaskManagementWeb/Configuration.cs "See on github")

**Default value:** connectionStrings/SnCrMsSql

----
## **sensenet/actions** section
### DefaultActionType
[sensenet / SenseNet.Configuration.Actions](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/Actions.cs "See on github")

If the developer did not provide a custom action type name for an application, the default action will be instantiated.
[Details](https://community.sensenet.com/docs/tutorials/how-to-create-a-custom-action/ "See detailed information.")

**Default value:** UrlAction

----
## **sensenet/blobstorage** section
### BinaryBufferSize
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

When serving files from the database or the file system, our stream implementation caches part of the stream in an in-memory buffer to serve requests faster and to reduce the number of SQL connections. This configuration value determines the size (in bytes) of this binary buffer.

**Default value:** 1048576

**Minimum value:** 524288

**Maximum value:** 104857600

----
### BinaryChunkSize
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

Size of chunks in bytes that are sent to the server by the upload client code. A smaller number means shorter and faster requests but the number of upload requests will be higher obviously.

**Default value:** 1048576

**Minimum value:** 524288

**Maximum value:** 104857600

----
### BinaryCacheSize
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

Maximum file size (in bytes) that should be cached after loading a binary value. Smaller files will by placed into the cache, larger files will always be served from the blob storage directly.

**Default value:** 1048576

**Minimum value:** 102400

**Maximum value:** 104857600

----
### BlobProvider
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

Class name of an optional external blob storage provider.


----
### MinimumSizeForBlobProviderKB
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

Minimum size limit (in bytes) for binary data to be stored in the external blob storage. Files under this size will be stored in the database. If you set this to 0, all files will go to the external storage. In case of a huge value everything will remain in the db.

**Default value:** 500

----
### MinimumSizeForFileStreamKB
[sensenet / SenseNet.Configuration.BlobStorage](https://github.com/SenseNet/sensenet/blob/master/src/BlobStorage/Configuration/BlobStorage.cs "See on github")

Minimum size limit (in bytes) for binary data to be stored in a SQL FileStream column. Files smaller or equal this size will be stored in the database. Bigger files will go to a FileStream column if the feature is enabled in the database. If you set this to 0, all files will go to the filestream column. In case of a huge value everything will remain in the db.

**Default value:** 500

----
## **sensenet/cache** section
### AbsoluteExpirationSeconds
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 120

----
### AdminGroupPathsForLoggedInUserCache
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** /Root/IMS/BuiltIn/Portal/Administrators

----
### CacheContentAfterSaveMode
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** All

----
### NodeIdDependencyEventPartitions
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 50

----
### NodeTypeDependencyEventPartitions
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 50

----
### PathDependencyEventPartitions
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 50

----
### PortletDependencyEventPartitions
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 50

----
### ResizedImagesCacheFolder
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** /ResizedImages

----
### SlidingExpirationSeconds
[sensenet / SenseNet.Configuration.Cache](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cache.cs "See on github")

**Default value:** 0

----
## **sensenet/contentNaming** section
### InvalidNameCharsPattern
[sensenet / SenseNet.Configuration.ContentNaming](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/ContentNaming.cs "See on github")

Invalid name chars regex pattern formatted for client side JS code (some special characters escaped) [Details](https://community.sensenet.com/docs/content-naming/ "See detailed information.")

**Default value:** [\\$&\\+\\\\,/:;=?@\"<>\\#%{}|^~\\[\\u005D'’`\\*\t\r\n]

----
### ReplacementChar
[sensenet / SenseNet.Configuration.ContentNaming](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/ContentNaming.cs "See on github")

Defines the character used to replace invalid characters..
[Details](https://community.sensenet.com/docs/content-naming/ "See detailed information.")

**Default value:** - (minus character).

----
## **sensenet/cryptography** section
### CertificateThumbprint
[sensenet / SenseNet.Configuration.Cryptography](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Cryptography.cs "See on github")

Thumbprint value of the matched webserver certificate.

----
## **sensenet/data** section
### SqlCommandTimeout
[sensenet / SenseNet.Configuration.Data](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/Data.cs "See on github")

Sql command timeout value in seconds.

**Default value:** 120

**Minimum value:** 5

----
### TransactionTimeout
[sensenet / SenseNet.Configuration.Data](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/Data.cs "See on github")

Maximum execution time of transactions.

**Default value:** The value of the SqlCommandTimeout.

**Minimum value:** The value of the SqlCommandTimeout.

----
### LongTransactionTimeout
[sensenet / SenseNet.Configuration.Data](https://github.com/SenseNet/sensenet/blob/master/src/Common/Configuration/Data.cs "See on github")

Maximum execution time of long-running transactions. Use this in exceptional cases, e.g. when copying a huge stream or performing a batch db operation.

**Default value:** The value of the TransactionTimeout.

**Minimum value:** The value of the TransactionTimeout.

----
### ODataServiceToken
[sensenet / SenseNet.Configuration.Services](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/Services.cs "See on github")

**Default value:** odata.svc

----
## **sensenet/detailedLogger** section
These keys also work in the configuration/detailedLogger section due to compatibility reasons but this duality will be stopped in the future and only the "sensenet/detailedLogger" section will stay.

### BufferSize
[sn-tools / SenseNet.Diagnostics.SnTrace](https://github.com/SenseNet/sn-tools/blob/master/src/SenseNet.Tools/Diagnostics/SnTrace.cs "See on github")

Size of the allocated line buffer.

**Default value:** 10000

----
### LinesPerTrace
[sn-tools / SenseNet.Diagnostics.SnTrace](https://github.com/SenseNet/sn-tools/blob/master/src/SenseNet.Tools/Diagnostics/SnTrace.cs "See on github")

Frequency of writing information about the state of the detailed logger to the log.

**Default value:** 1000

----
### MaxWritesInOneFile
[sn-tools / SenseNet.Diagnostics.SnTrace](https://github.com/SenseNet/sn-tools/blob/master/src/SenseNet.Tools/Diagnostics/SnTrace.cs "See on github")

Number of writes into a single file. If the writer reaches this value, a new log file will be created.

**Default value:** 100

----
### WriteToFileDelay
[sn-tools / SenseNet.Diagnostics.SnTrace](https://github.com/SenseNet/sn-tools/blob/master/src/SenseNet.Tools/Diagnostics/SnTrace.cs "See on github")

Time between end of previous and start of next writing in milliseconds.

**Default value:** 1000

----
## **sensenet/exceptionStatusCodes** section
Here you can specify which HTTP status and substatus codes belong to which type of exception. As the key you can set the full name of the exception (for instance: System.Security.SecurityException) or you can set an Exception-family as well (for example: System.Exception.SystemException). In the second case all the exceptions belong to SystemException will be handled. As the value you can set the three digit HTTP status code or, in case of using IIS, use the XXX.X format to specify substatus codes as well.

----
## **sensenet/identityManagement** section
### DefaultDomain
[sensenet / SenseNet.Configuration.IdentityManagement](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/IdentityManagement.cs "See on github")

**Default value:** BuiltIn

----
### UserProfilesEnabled
[sensenet / SenseNet.Configuration.IdentityManagement](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/IdentityManagement.cs "See on github")

When you created a User a User Profile is also created with it, if this key value is true.

**Default value:** false

----
## **sensenet/indexing** section
### CommitDelayInSeconds
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 2

----
### DelayedCommitCycleMaxCount
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 10

----
### EnableOuterSearchEngine
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** true

----
### IndexDirectoryPath
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** App_Data\\LocalIndex

----
### IndexDirectoryPath
[sn-search-lucene29 / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Indexing.cs "See on github")

**Default value:** App_Data\LocalIndex

----
### IndexHealthMonitorRunningPeriod
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 60

**Minimum value:** 1

----
### IndexHistoryItemLimit
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 1000000

----
### IndexingActivityQueueMaxLength
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 500

----
### IndexingActivityTimeoutInSeconds
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 120

----
### IndexingPausedTimeout
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 60

----
### TextExtractTimeout
[sensenet / SenseNet.Configuration.Indexing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Indexing.cs "See on github")

**Default value:** 300

----
## **sensenet/logging** section
### AuditEnabled
[sensenet / SenseNet.Configuration.Logging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Logging.cs "See on github")

**Default value:** true

----
### CustomPerformanceCounters
[sensenet / SenseNet.Configuration.Logging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Logging.cs "See on github")

You can define your custom counters with a semicolon separated counter-name list.

----
### PerformanceCountersEnabled
[sensenet / SenseNet.Configuration.Logging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Logging.cs "See on github")

Switches on or off all built-in and custom performance counters.

**Default value:** false

----
### DownloadCounterEnabled
[sensenet / SenseNet.Configuration.Logging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Logging.cs "See on github")

**Default value:** false

----
### PerformanceCountersEnabled
[sensenet / SenseNet.Configuration.Logging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Logging.cs "See on github")

**Default value:** false

----
## **sensenet/lucene29** section
### DefaultTopAndGrowth
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** 100,1000,10000,0

----
### IndexingEngine
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** SenseNet.Search.Lucene29.Lucene29LocalIndexingEngine

----
### IndexLockFileRemovedNotificationEmail
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

----
### IndexLockFileWaitForRemovedTimeout
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** 120

----
### LuceneLockDeleteRetryInterval
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** 60

----
### LuceneMaxMergeDocs
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** int.MaxValue

----
### LuceneMergeFactor
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** 10

----
### LuceneRAMBufferSizeMB
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** 16.0

----
### QueryEngine
[sn-search-lucene29 / SenseNet.Configuration.Lucene29](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29/Configuration/Lucene29.cs "See on github")

**Default value:** SenseNet.Search.Lucene29.Lucene29LocalQueryEngine

----
## **sensenet/messaging** section
### ClusterChannelMonitorInterval
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Cluster channel monitor heartbeat interval in seconds.

**Default value:** 60

**Minimum value:** 10

----
### ClusterChannelMonitorTimeout
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Timeout limit for receiving response for channel monitor test messages in seconds.

**Default value:** 10

**Minimum value:** 1

----
### DelayRequestsOnHighMessageCountLowerLimit
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Number of unprocessed incoming messages that re-enable incoming request handling if it was delayed due to high unprocessed message count.

**Default value:** 500

----
### DelayRequestsOnHighMessageCountUpperLimit
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Number of unprocessed incoming messages that trigger a delay of incoming request handling.

**Default value:** 1000

----
### MessageProcessorThreadCount
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Number of threads processing/executing tasks of incoming messages.

**Default value:** 5

----
### MessageProcessorThreadMaxMessages
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Number of messages one processor thread is allowed to process in a row.

**Default value:** 100

----
### MessageRetentionTime
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Message retention time in seconds. Every message has a retention time: if it expires, the message is deleted from the queue, thus ensuring that the channel cannot get filled.

**Default value:** 10

**Minimum value:** 2

----
### MsmqChannelQueueName
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Message queue paths for every web node and tool that will connect to the Content Repository. First queue path should be local incoming queue, consecutive queue names are paths of outgoing queues. Queue paths are separated with ';'.

----
### MsmqIndexDocumentSizeLimit
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Size of index documents that can be sent over MSMQ. Larger index documents will be retrieved from database.

**Default value:** 200000

----
### MsmqReconnectDelay
[sensenet / SenseNet.Configuration.Messaging](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Messaging.cs "See on github")

Defines the time interval between closing and starting the channels (in seconds).

**Default value:** 1

----
## **sensenet/notification** section
### Daily
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** 01:00

----
### DefaultEmailSender
[sensenet / SenseNet.Configuration.Notification](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Notification.cs "See on github")

**Default value:** mailservice@example.com

----
### GroupNotificationsByUser
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** true

----
### Immediately
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** never

----
### MasterSwitch
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** ON

----
### MessageEncoding
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** UTF8

----
### Monthly
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** Every 1. 01:00

----
### NotificationSenderAddress
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** noreply@example.com

----
### RetryCount
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** 3

----
### RetryDelay
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** 2000

----
### TakeCount
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** 20

----
### TimerInterval
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** 5.0

----
### Weekly
[sn-notification / SenseNet.Notification.Configuration](https://github.com/SenseNet/sn-notification/blob/master/src/Notification/Configuration.cs "See on github")

**Default value:** Monday 23:00

----
## **sensenet/packaging** section
### NetworkTargets
[sensenet / SenseNet.Configuration.Packaging](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/Packaging.cs "See on github")

----
### TargetDirectory
[sensenet / SenseNet.Configuration.Packaging](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/Packaging.cs "See on github")

----
## **sensenet/portlets** section
### ContentAddNewPortletTemplate
[sn-webpages / SenseNet.Configuration.Portlets](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Portlets.cs "See on github")

**Default value:** /Root/System/SystemPlugins/Portlets/ContentAddNew/ContentAddNewUserControl.ascx

----
## **sensenet/providers** section
### AccessProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.ContentRepository.Security.UserAccessProvider

----
### Cache
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.ContentRepository.Storage.Caching.AspNetCache

----
### ClusterChannelProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Communication.Messaging.VoidChannel

----
### ContentNamingProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

----
### DataProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.ContentRepository.Storage.Data.SqlClient.SqlProvider

----
### DirectoryProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

----
### DocumentPreviewProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Preview.DefaultDocumentPreviewProvider

----
### ElevatedModificationVisibilityRuleProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.ContentRepository.SnElevatedModificationVisibilityRule

----
### MembershipExtender
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

Fully qualified class name of the customized MembershipExtenderBase for extending a users's membership.

**Default value:** SenseNet.ContentRepository.Storage.Security.DefaultMembershipExtender

----
### OutdatedPasswordHashProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

Fully qualified name of the old PasswordHashProvider that allows the old-way password checking only in the migration period.

**Default value:** SenseNet.ContentRepository.Storage.Security.Sha256PasswordHashProviderWithoutSalt

----
### PasswordHashProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

Fully qualified name of the PasswordHashProvider if it is not the default.

**Default value:** SenseNet.ContentRepository.Storage.Security.SenseNetPasswordHashProvider

----
### RepositoryPathProviderEnabled
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** true

----
### SearchEngine
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Search.Lucene29.Lucene29SearchEngine

----
### SecurityDataProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Security.EF6SecurityStore.EF6SecurityDataProvider

----
### SecurityDataProvider
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Providers](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Security.EF6SecurityStore.EF6SecurityDataProvider

----
### SecurityMessageProvider
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Security.Messaging.DefaultMessageProvider

----
### SecurityMessageProvider
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Providers](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Security.Messaging.DefaultMessageProvider

----
### SkinManager
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

**Default value:** SenseNet.Portal.SkinManager

----
### TaskManager
[sensenet / SenseNet.Configuration.Providers](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Providers.cs "See on github")

----
## **sensenet/repositoryEnvironment** section
### BackwardCompatibilityDefaultValues
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** false

----
### BackwardCompatibilityXmlNamespaces
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** false

----
### DefaultLockTimeout
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** 10000000

----
### DisabledNodeObservers
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

----
### FallbackCulture
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** en

----
### SkipBinaryImportIfFileDoesNotExist
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** false

----
### SkipImportingMissingReferences
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** false

----
### SpecialWorkingMode
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

----
### XsltRenderingWithContentSerialization
[sensenet / SenseNet.Configuration.RepositoryEnvironment](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/RepositoryEnvironment.cs "See on github")

**Default value:** true

----
## **sensenet/repositoryStructure** section
### CellTemplatesPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** $skin/celltemplates

----
### ContentTemplateFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/ContentTemplates

----
### ContentViewFolderName
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** $skin/contentviews

----
### ContentViewGlobalFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/Global/contentviews

----
### FieldControlTemplatesPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** $skin/fieldcontroltemplates

----
### IMSFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/IMS

----
### PageTemplateFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/Global/pagetemplates

----
### ResourceFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/Localization

----
### SkinGlobalFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/Global

----
### SkinRootFolderPath
[sensenet / SenseNet.Configuration.RepositoryStructure](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/RepositoryStructure.cs "See on github")

**Default value:** /Root/Skins

----
## **sensenet/security** section
### DefaultUltimateLogout
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** false

----
### EnablePasswordHashMigration
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

Master switch of the password hash migration.

**Default value:** false

----
### PasswordHistoryFieldMaxLength
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** 10

----
### SecuritActivityLifetimeInMinutes
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** 25 * 60

----
### SecuritActivityTimeoutInSeconds
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** 120

----
### SecurityActivityLifetimeInMinutes
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Security](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Security.cs "See on github")

**Default value:** 25 * 60

----
### SecurityActivityTimeoutInSeconds
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Security](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Security.cs "See on github")

**Default value:** 120

----
### SecurityDatabaseCommandTimeoutInSeconds
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** Data.SqlCommandTimeout

----
### SecurityDatabaseCommandTimeoutInSeconds
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Security](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Security.cs "See on github")

**Default value:** Data.SqlCommandTimeout

----
### SecurityMonitorPeriodInSeconds
[sensenet / SenseNet.Configuration.Security](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Security.cs "See on github")

**Default value:** 30

----
### SecurityMonitorPeriodInSeconds
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Security](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Security.cs "See on github")

**Default value:** 30

----
## **sensenet/skin** section
### DefaultIcon
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** _default

----
### DefaultSkinName
[sensenet / SenseNet.Portal.SkinConfig](https://github.com/SenseNet/sensenet/blob/master/src/Services/SkinManagerBase.cs "See on github")

**Default value:** sensenet

----
### DefaultSkinName
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** sensenet

----
### IconsCssPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/styles/icons.css

----
### jQueryCustomUICssPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/styles/jqueryui/jquery-ui.css

----
### jQueryGridCSSPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/plugins/grid/themes/ui.jqgrid.css

----
### jQueryGridPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/plugins/grid/jquery.jqGrid.min.js

----
### jQueryPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/jquery.js

----
### jQueryTreeCheckboxPluginPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/plugins/jquery.tree.checkbox.js

----
### jQueryTreePath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/plugins/tree/jquery.tree.js

----
### jQueryTreeThemePath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jquery/plugins/tree/themes/default/style.css

----
### jQueryUIPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/jqueryui/minified/jquery-ui.min.js

----
### jQueryUIWidgetCSSPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/styles/widgets/jqueryui/jquery-ui.css

----
### MSAjaxPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/msajax/Start.debug.js

----
### OverlayPrefix
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** overlay-

----
### RelativeIconPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/images/icons

----
### SNBinaryFieldControlPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.BinaryFieldControl.js

----
### SNListGridPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.ListGrid.js

----
### SNPickerPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.Picker.js

----
### SNPortalRemoteControlPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.PortalRemoteControl.Application.js

----
### SNReferenceGridPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.ReferenceGrid.js

----
### SNUtilsPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.Util.js

----
### SNWebdavPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/sn/SN.WebDav.js

----
### SNWidgetsCss
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/styles/widgets.css

----
### TinyMCEPath
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** $skin/scripts/tinymce/tiny_mce.js

----
### UseScriptDependencyCache
[sn-webpages / SenseNet.Configuration.Skin](https://github.com/SenseNet/sn-webpages/blob/master/src/WebPages/Configuration/Skin.cs "See on github")

**Default value:** true

----
## **sensenet/systemStart** section
### WarmupControlQueryFilter
[sensenet / SenseNet.Configuration.SystemStart](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/SystemStart.cs "See on github")

----
### WarmupEnabled
[sensenet / SenseNet.Configuration.SystemStart](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/SystemStart.cs "See on github")

**Default value:** true

----
## **sensenet/tokenAuthentication** section
### AccessLifeTimeInMinutes
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** 5

----
### Audience
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** client

----
### ClockSkewInMinutes
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** 1

----
### EncriptionAlgorithm
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** HS512

----
### Issuer
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** sensenet-token-service

----
### RefreshLifeTimeInMinutes
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** 1440

----
### Subject
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

**Default value:** sensenet

----
### SymmetricKeySecret
[sensenet / SenseNet.Configuration.TokenAuthentication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/TokenAuthentication.cs "See on github")

----
## **sensenet/tracing** section
### StartupTraceCategories
[sensenet / SenseNet.Configuration.Tracing](https://github.com/SenseNet/sensenet/blob/master/src/Storage/Configuration/Tracing.cs "See on github")

----
### TraceCategories
[sn-search-lucene29 / SenseNet.Search.Lucene29.Centralized.Index.Configuration.Tracing](https://github.com/SenseNet/sn-search-lucene29/blob/master/src/SenseNet.Search.Lucene29.Centralized.Index/Configuration/Tracing.cs "See on github")

----
## **sensenet/versioning** section
### CheckInComments
[sensenet / SenseNet.Configuration.Versioning](https://github.com/SenseNet/sensenet/blob/master/src/ContentRepository/Configuration/Versioning.cs "See on github")

**Default value:** Recommended

----
## **sensenet/webApplication** section
### AllowCssBundling
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** true

----
### AllowJsBundling
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** true

----
### CacheFolderFileSystemPath
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

----
### CssBundlingBlacklist
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

----
### DefaultAuthenticationMode
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** Forms

----
### DenyCrossSiteAccessEnabled
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** true

----
### DiskFSSupportMode
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** Fallback

----
### EditSourceExtensions
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** .ascx, .asmx, .eml, .config, .css, .js, .xml, .xaml, .html, .htm, .aspx, .template, .xslt, .txt, .ashx, .settings, .cshtml, .json, .vbhtml

----
### GlobaFieldControlTemplateEnabled
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** true

----
### JsBundlingBlacklist
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** /Root/Global/scripts/tinymce/, /Root/Global/scripts/jquery/plugins/tree/

----
### ProxyIP
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

----
### PurgeUrlDelayInSeconds
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** 0

----
### ScriptMode
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** Release

----
### ShowErrorDetails
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** false

----
### SignalRSqlEnabled
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** false

----
### SNPickerRowNum
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** 20

----
### SNReferenceGridRowNum
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** 5

----
### WebContentNameList
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** WebContent

----
### WebRootFiles
[sensenet / SenseNet.Configuration.WebApplication](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/WebApplication.cs "See on github")

**Default value:** binaryhandler.ashx, Explore.html, ExploreFrame.html, ExploreTree.aspx, picker.aspx, portlet-preview.aspx, prc.ascx, tinyproxy.ashx, UploadProxy.ashx, vsshandler.ashx

----
## **sensenet/webdav** section
### AutoCheckoutFiles
[sensenet / SenseNet.Configuration.Webdav](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/Webdav.cs "See on github")

**Default value:** false

----
### MockExistingFiles
[sensenet / SenseNet.Configuration.Webdav](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/Webdav.cs "See on github")

**Default value:** desktop.ini, Thumbs.db, wdmaud.drv, foo, MSGRHU32.ini

----
### WebdavEditExtensions
[sensenet / SenseNet.Configuration.Webdav](https://github.com/SenseNet/sensenet/blob/master/src/Services/Configuration/Webdav.cs "See on github")

**Default value:** .doc, .docx, .xls, .xlsx, .xlsm, .xltx, .ods, .odt, .odp, .ppt, .pptx, .ppd, .pps, .ppsx, .rtf, .mpp

----
## **sensenet/workflow** section
### NativeWorkflowNamespace
[sn-workflow / SenseNet.Configuration.Workflow](https://github.com/SenseNet/sn-workflow/blob/master/src/Workflow/Configuration/Workflow.cs "See on github")

----
### TimerInterval
[sn-workflow / SenseNet.Configuration.Workflow](https://github.com/SenseNet/sn-workflow/blob/master/src/Workflow/Configuration/Workflow.cs "See on github")

**Default value:** 10.0

----
