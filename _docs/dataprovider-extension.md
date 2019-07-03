---
title: "Data provider extension"
source_url: 'https://github.com/SenseNet/sensenet.github.io/blob/master/_docs/dataprovider-extension.md'
category: Development
version: v7.0
tags: [dataprovider, extension, storage, sn7]
description: In this article developers can learn about extending the data layer of sensenet.
---

# Data provider extension
The built-in storage layer provides the api for the most common database operations performed on content items and also other well-known database operations related to logging or indexing. Custom features however may need their own storage elements like custom tables that does not belong to the common data layer. The data provider extension feature lets developers design a **custom storage layer** for their feature and handle data operations in a unified way using the built-in api elements.

> For example the [Access token](/docs/accesstoken) feature has its own data provider extension (defined by the interface `IAccessTokenDataProviderExtension`) that is responsible for saving or loading token records from the database.

This way the core data layer does not contain feature-specific api elements while developers may design a **replaceable data layer** for their feature.

### Creating a data provider extension
Extensions are defined by an _interface_ and must have at least one implementation for the data platform chosen by the developer. Developers have to mark their extension interface by the built-in marker interface `IDataProviderExtension` so that the system recognizes the extension.

This interface should contain the specific data operations necessary for the feature:

```csharp
public interface ICustomDataProviderExtension : IDataProviderExtension
{
   Record[] LoadRecords();
   void SaveRecord(Record data);
}
```

The platform-specific implementation (for example `SqlCustomDataProviderExtension`) will contain the SQL operations for managing data for the feature.

### Setting the extension
For the system to know about the extension, developers may want to provide an extension method for setting the db extension at system start. This is optional, but makes the extension usage a lot easier for 3rd party developers.

```csharp
public static class MyExtensions
{
    public static IRepositoryBuilder UseMyCustomDataProviderExtension(this IRepositoryBuilder builder, ICustomDataProviderExtension provider)
    {
        DataProvider.Instance.SetExtension(typeof(ICustomDataProviderExtension), provider);
        return builder;
    }
}
```

The method above will let developers inject the extension instance at system start when using the [RepositoryBuilder](/docs/build-repository) api.

```csharp
protected override void BuildRepository(IRepositoryBuilder repositoryBuilder)
{
    base.BuildRepository(repositoryBuilder);
    repositoryBuilder.UseMyCustomDataProviderExtension(new SqlCustomDataProviderExtension());
}
```

### Using the extension
The business logic that requires the data will need to load the configured instance for storage operations:

```csharp
private static ICustomDataProviderExtension Storage => DataProvider.GetExtension<ICustomDataProviderExtension>();

public static Record[] LoadAllRecords(int userId)
{
    return Storage.LoadRecords(userId);
}
```

> Please note that the code above does not know about the platform-specific implementation: it loads the extension by its defining interface. This makes the whole structure flexible: the storage implementation can be replaced by the application developer.