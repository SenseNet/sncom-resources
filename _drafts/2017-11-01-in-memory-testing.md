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

## A whole repository in memory


## What's next?
