---
title:  "How to create an external blob provider"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/tutorials/how-to-create-an-external-blob-provider.md'
category: Tutorials
version: v7.0
tags: [blob, storage, provider, database, sn7]
description: This article describes the way for developers to create a custom blob storage provider.
---

This article provides an example for creating a custom blob storage provider. This means creating a _c# class_ that implements the _IBlobProvider_ interface. This particular implementation (_LocalDiskChunkBlobProvider_) saves binary data to files of predefined size inside a folder in the file system, each file containing one chunk. 

> Please note that an optimal chunk size has not been tested for and the optimal size may very well depend on the particular system and its resources. 

As a context is saved for every binary stream in the Files table, it is very well possible to set an individual chunk size for every stream. So, one could come up with varying chunk sizes for different size ranges if deemed necessary. Consequently, it is also possible to adjust the chunk size any time after deployment.

This particular implementation is not an enterprise level solution and comes as-is with no warranty whatsoever.

The 10-byte chunk size is merely for testing purposes, it is highly recommended to have it changed to at least several magnitudes higher (e.g., 64000 for ~64kB or 1000000 for ~1MB).

## Local disk blob storage provider
The following sample implementation stores binary data as chunks in the file system.

<script src="https://gist.github.com/tusmester/af62e7be1d29320542c3948ef6512ee2.js"></script>

### Chunk reader stream
This sample reader stream helps serving chunks as a single stream from the file system.

<script src="https://gist.github.com/tusmester/3ef183679975d15709935a08634a2fd8.js"></script>

### Chunk writer stream
This sample writer stream helps writing chunks to the file system.

<script src="https://gist.github.com/tusmester/65bcbc430cf449fd7c7092e170c493c9.js"></script>