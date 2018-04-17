---

title: "In-memory testing in sensenet"
author: tusmester
image: "../img/posts/inmemory_testing.jpg"
tags: [test, database]

---

In the previous version of sensenet we had many tests, 1400+. They covered most of the codebase, but unfortunately only some of them were real unit tests. Most of them were integration tests, involving multiple layers of the product, and as such, in many cases they required a fully installed sensenet database in place.

---

That is not how a modern test environment should work because of many reasons, mainly speed, maintainability, flexibility.

> So we started over.

In the core repository (that contains the main component, [sensenet Services](https://github.com/SenseNet/sensenet)) we started small. Added a few real unit tests (and moved some from the old test project) that covered only a certain class or method and did not require the whole repository to run.

After that we started investigating the possibility of writing new unit tests for modules that needed the repository - but without actually starting it. We realised that it would require a thremendous amount of refactoring to make the codebase 100% unit test friendly with classes that support dependency injection in a natural way. It would take too much time and break so many existing apis that it was not an option.

![Testing an ECM product](/img/posts/inmemory_database.jpg)

## A whole database in memory
In sensenet you cannot load a content or execute a query without a running index and an accessible database - and this is somewhat important in case of a system that is designed around content and queries :).

> Even if an API does not indicate a content operation, it may involve accessing and modifying data in the background.

We started to experiment with simulating the database in memory and implementing load and save operations on top of that. It turned out that [@kavics](https://github.com/kavics) was able to construct an in-memory db in just a few days. The trick was that it was not a fully operational data provider - he just implemented the parts that were essential for covering the test scenarios we needed.

## Providers, providers, providers
In case of sensenet practically everything happens in the context of a "running repository". You cannot do much before all the managers, services and providers are started properly. So the next problem to solve was to be able to replace these real-life providers with mock ones so that the tests can concentrate on a single feature. Luckily most of these providers were already replaceable, it was just hidden in many different parts of the api.

We created a *Providers* API for bringing all these replaceable parts together. This is a gradual process, we will bring old and new features under this umbrella as needed. We also extended the **repository start process** by letting developers **inject** their own provider implementations instead of using the configured ones.

```csharp
var dbProvider = new InMemoryDataProvider();
var securityDbProvider = new MemoryDataProvider(DatabaseStorage.CreateEmpty());
var searchEngine = new InMemorySearchEngine();
var accessProvider = new DesktopAccessProvider();

var repoBuilder = new RepositoryBuilder()
    .UseDataProvider(dbProvider)
    .UseSecurityDataProvider(securityDbProvider)
    .UseSearchEngine(searchEngine)
    .UseAccessProvider(accessProvider)
    .StartWorkflowEngine(false);

using (var repo = Repository.Start(repoBuilder))
{
    // Load and save content here - then check the results.
}
```

The sample above is taken from one of the test methods. Many of them start a repository instance of their own and make changes in those sandboxes instead of a real database. This makes initialization and execution *100 times faster* than before. It also clears the way for future improvements.

## What's next?
Currently you cannot do *everything* using this method, for example binary handling is not implemented yet in the in-memory db. When during testing we encounter such a blocker issue, we will add the missing providers to this api gradually.

The current architecture still has some *static* elements that prevent us from running tests *in parallel* - so they are executed sequentially for now, otherwise tests would interfere in each others' environment. We plan to make every provider and module accessible through *instances* that can co-exist, so we can execute tests in multiple independent environments.
