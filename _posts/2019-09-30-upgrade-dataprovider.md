---

title: "Introducing the new data provider"
author: [tusmester]
image: "../img/posts/upgrade-dataprovider.png"
tags: [data provider, upgrade, patch, sn7]
redirect_to: https://www.sensenet.com/blog/2019-09-30-upgrade-dataprovider

---

The data structure of sensenet has been more or less the same for many years. We added more and more features and the API became huge and was very hard to maintain, not to mention custom implementations for other data platforms.

---

We decided to refactor our data layer to make it simpler and extendable at the same time. The goal is to make it possible for 3rd party developers to create custom implementations for any platform and let us use modern development approaches - like asynchronous data handling.

## Do I need to deal with the upgrade?
If you create a new project or work in a development environment where you re-build your database frequently, you do not have to deal with the upgrade: just get the latest sensenet packages from nuget, install the new db and you're done.

If you have a working live db, you'll need to execute an **upgrade patch**. This is similar to the usual SnAdmin patch, but as it modifies the database structure **it may run for some time**, depending on the size of the database.

There are a few changes in the API that may cause build errors but there are not many of them. 

> **Existing provider implementations**
> 
> The only exceptions are low-level providers for database, indexing and messaging. We could not keep the old APIs because that would mean duplicated implementations in some cases. As these APIs have changed significantly, if you created one of those and experience API issues after upgrading, please contact us for support.

## What has changed?
We cannot list all the small changes here, but there are a few major themes that are important.

### High level APIs
The good news is that there are no significant changes on the `Content` and `Node` layers. This was an under-the-hood data layer refactor project, so most of your code will remain unchanged.

### The new DataStore API
Apart from the usual Content CRUD operations sometimes developers need to access the data layer directly. The new entry point for that is the `DataStore` class that holds the public interface for these operations. If you experience a build error after updating to the new package, please look for database operations on this new API, or use the `DataStore.DataProvider` property directly if necessary.

### Async API
One of the main features of the new API is that all data access methods became _asynchronous_. This means they return a `Task` that you can `await` for making the application a lot more resource-friendly and its throughput _a lot_ higher.

### Custom data providers
It has become a lot easier to port sensenet to another data platform. The data provider API is simpler than before and there are built-in base classes that you can inherit from, no need to start from scratch. For example:

- **MsSqlDataProvider**: use this base class if you want to remain on the MS SQL platform, but need to change part of the functionality - e.g. you want to store properties in a different way than we do.
- **RelationalDataProviderBase**: this is a good start for implementing sensenet on a relational db platform different from the built-in MS SQL implementation - for example MySql. The scripts and algorithms are reusable, you may need to change only a few things.

If you want to port sensenet to a totally new kind of platform (e.g. a NoSql solution) then you have the `DataProvider` base class to inherit from.

### Data provider extensions
Previously the data provider API contained data access methods for many features. This means custom db provider developers needed to implement all these methods, regardless of whether they needed those features or not.

From now on we will add new feature-specific data access functionality as [data provider extensions](https://community.sensenet.com/docs/dataprovider-extension). These extensions are new interfaces and classes marked with the `IDataProviderExtension` interface. The platform-specific class contains the implementation of the feature for that platform. For example the `ISharedLockDataProviderExtension` interface defines the required methods for the shared lock feature. The `MsSqlSharedLockDataProvider` contains the MS SQL implementation for the methods. 3rd party data provider developers need to implement those methods on their platform (e.g. MySql or MongoDb) _only if they need the feature_. The advantage of this approach is that we can keep the core data provider API relatively narrow.

Photo by [Andrea Cau](https://unsplash.com/@andreacau?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/images/travel/new-york?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
