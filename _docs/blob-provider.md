---
title: "Blob provider"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/blob-provider.md'
category: Development
version: v7.0.0
tags: enterprise blob storage provider sn7
description: This article describes the concept of our blob storage and the customization options.
---

# Blob provider

In **sensenet ECM** all files are stored in the main [Content Repository](Content_Repository "wikilink") database by default. All binaries, along with their metadata. In larger projects this can lead to a *huge database*, which requires a *large data storage* and sometimes additional *server licences*. sensenet allows you to store binaries outside of the database, in an external storage. This article describes the concept of our blob storage and the customization options. Available blob providers for the *Enterprise Edition*:

-   [MongoDB blob provider](/_docs/mongodb-provider.md) *(soon to be released)*
-   [Azure blob provider](/_docs/azureblob-provider.md) *(soon to be released)*

## Blob storage concept

Sensenet ECM is a lot more than a simple document storage. We offer a rich set of additional features like storing different metadata for different types of content and indexing binaries to aid field-specific or full-text search. All this additional data will have to remain in the main database (and in our index), but wanted to let customers have the option to store their binaries outside of the database. The sensenet **blob storage** has a very simple purpose: storing binary data that can be linked to our records in the main database. No additional, high-level features, no custom metadata, only raw binaries, so that we can keep 3rd party implementations **simple**.

## Blob providers

A blob provider is the component in sensenet that is responsible for all binary operations. The **built-in blob provider** stores binaries in the database. We offer a simple interface for developers to implement external blob providers. These providers may store binaries in a completely different environment - e.g. in a file system or in a nosql solution (like MongoDB).

Currently there is a simple **selector algorithm** for choosing the appropriate provider when saving a file: if the size of the file is smaller than a certain amount, the default built-in provider will store it into the database. If it is bigger and there is an external blob provider configured, it will use that. This means that currently the system can work with a single external blob provider. Later this selector algorithm will be able to decide using a more complex and customizable algorithm.

Upper layers do not know anything about the underlying storage: the Content binary API is unified, regardless of the blob provider currently in use.

### Migration

By default everything is stored in the database. When you create a custom external blob provider (and define it in the configuration), from than on *new files* will be saved into that external storage. If you want your old files to be moved to the new storage, you either have to wait for them to be migrated when their binary is saved again, or you'll have to create a tool that iterates through the files and saves them programmatically.

### Backup

Backup strategy depends on the characteristics of the custom external provider, but it is advisable to create a backup mechanism that synchronizes the backup of the index, the main database and the blob storage so that everything remains in sync.

### Writing chunks

One of the few important capabilities of blob providers is that they have to support **writing binaries in chunks**. This means it is possible to write a huge file in chunks into the storage in **random order, even in parallel** requests to speed up the process.

### Multiple web servers

An external blob provider has to support **NLB** environments, when multiple web servers are accessing the same storage at the same time for read and write operations.

### Accessing binaries

The blob storage should not allow read and write operations outside of the sensenet API. All modifications should be performed through the **blob storage API** that we publish (e.g. users must not modify files stored in the file system *manually*).

If you are working in the context of the sensenet Content Repository, you do not have to think about binaries, we handle that in the background (e.g. when you create a File from code). But in case of external tools (e.g. a custom importer or synchronizer tool) developers may use the blob storage API to read and write binaries directly, without having to send them through the REST API of the portal. For details please check the following article:

-   [How to access the blob storage directly](How_to_access_the_blob_storage_directly "wikilink")

## Built-in blob provider

The built-in blob provider will always be there as a fallback. Currently it supports storing files in the database either in a regular *varbinary* column or in a [FILESTREAM](filestream "How to enable FILESTREAM in sensenet ECM") column.

## Custom blob provider

To create a custom blob provider, you have to

-   reference these dlls from your solution:

  
- SenseNet.Common.dll *(current version)*

- SenseNet.BlobStorage.dll *(current version)*

- SenseNet.Tools.dll *(current version)*

- Newtonsoft.Json.dll *(v9.0)*

-   implement the following interface

### Blob provider interface

Implement this to create an external blob provider that stores binaries outside of the Content Repository (e.g. in the file system).

``` csharp
public interface IBlobProvider
{
    /// <summary>
    /// Allocates a place in the blob storage for the bytes to be stored
    /// (e.g. creates a folder in the file system for file chunks). It should
    /// fill the BlobProviderData property of the context with the data
    /// that is necessary to access the binaries later (e.g. the name of
    /// the folder).
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    void Allocate(BlobStorageContext context);
    /// <summary>
    /// Writes a set of bytes into the blob storage. The offset must point to the
    /// start of one of the internal chunks. The buffer may contain bytes
    /// for multiple internal chunks.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    /// <param name="offset">Start position in the full stream where the buffer will be written.</param>
    /// <param name="buffer">The set of bytes to be written to the blob storage.</param>
    void Write(BlobStorageContext context, long offset, byte[] buffer);
    /// <summary>
    /// Writes a set of bytes into the blob storage. The offset must point to the
    /// start of one of the internal chunks. The buffer may contain bytes
    /// for multiple internal chunks.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    /// <param name="offset">Start position in the full stream where the buffer will be written.</param>
    /// <param name="buffer">The set of bytes to be written to the blob storage.</param>
    Task WriteAsync(BlobStorageContext context, long offset, byte[] buffer);
    /// <summary>
    /// Deletes a binary from the storage related to a binary record in the database.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    void Delete(BlobStorageContext context);
    /// <summary>
    /// Returns a stream that serves bytes from the blob storage. This stream cannot be used to
    /// write bytes to the storage, it is a readonly stream, but it supports Seek.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    Stream GetStreamForRead(BlobStorageContext context);
    /// <summary>
    /// Returns a stream that can be used to write bytes to the blob storage. This is 
    /// a write-only, forward-only stream that does not support Read and Seek.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    Stream GetStreamForWrite(BlobStorageContext context);
    /// <summary>
    /// Creates an in-memory clone of an existing stream object. It does not copy binary data,
    /// it only creates a similar stream object that points to the same binary in the storage.
    /// </summary>
    /// <param name="context">A context object that holds information about the binary data.</param>
    /// <param name="stream">An existing stream that should be one of the known stream types
    /// that the provider works with (e.g. a chunked file stream in case of a file storage provider).</param>
    Stream CloneStream(BlobStorageContext context, Stream stream);
    /// <summary>
    /// Parses a provider-specific provider data from a string.
    /// </summary>
    /// <param name="providerData">String representation (usually in JSON format) of the provider data.</param>
    /// <returns>An object specific to this blob provider that contains information for connecting
    /// the record in the Files table with the binary stored in the external storage
    /// (e.g. the name of the folder in the file system where the bytes are stored).</returns>
    object ParseData(string providerData);
}
```

For a sample implementation (a local file storage provider) check the following article:

-   [How to create an external blob provider](How_to_create_an_external_blob_provider "wikilink")

### Configuration

When defining a custom provider you have to provide two values in the configuration:

``` xml
<add key="BlobProvider" value="MyProject.Data.CustomBlobProvider"/>
<add key="MinimumSizeForBlobProviderKB" value="1024"/>
```

The *BlobProvider* value defines the single external provider that is used when the file size is bigger than the value defined as the *MinimumSizeForBlobProviderKB*. The default minimum size is 500 kbytes.
