---

title: "In-memory testing in sensenet ECM"
author: tusmester
image: "../img/posts/inmemory_testing.png"
tags: [test, database]

---

## Testing a complete ECM platform in memory
In the previous version of sensenet ECM we had many tests, 1400+. They covered most of the codebase, but unfortunately only some of them were real unit tests. Most of them were integration tests, involving multiple layers of the product, and as such, in many cases they required a fully installed sensenet ECM database in place.

That is not how a modern test environment should work, because of many reasons: speed, maintainability, flexibility.

> So we started over.

In the core repository (that contains the main component, [sensenet Services](https://github.com/SenseNet/sensenet)) we started small. Added a few real unit tests (and moved some from the old test project) that covered only a certain class or method and did not require the whole repository to run.

After that we started investigating the possibility of writing new unit tests for modules that needed the repository - but without actually starting it. We realised that it would require a thremendous amount of refactoring to make the codebase 100% unit test friendly with classes that support dependency injection in a natural way. It would take too much time and break so many existing apis that it was not a option.

## A whole database in memory
In sensenet ECM you cannot load a content or execute a query without a running index and an accessible database - and this is somewhat important in case of a system that is designed around content and queries :).

> Even if an API does not indicate a content operation, it may involve accessing and modifying data in the background.

We started to experiment with simulating the database in memory and implementing load and save operations on top of that. It turned out that @kavics was able to construct an in-memory db in just a few days. The trick was that it was not a fully operational data provider - he just implemented the parts that were essential for covering the test scenarios we needed.

## Providers, providers, providers
In case of sensenet ECM practically everything happens in the context of a "running repository". You cannot do much before all the managers, services and providers are started properly. So the next problem to solve was to be able to replace these real-life providers with mock ones so that the tests can concentrate on a single feature. Luckily most of these providers were already replaceable, it was just hidden in many different parts of the api.

We created a *Providers* API for bringing all these replaceable parts together. This is a gradual process, we will bring old and new features under this umbrella as needed. We also extended the **repository start process** by letting developers **inject** their own provider implementations instead of using the configured ones.

[repo start sample here]

## What's next?
