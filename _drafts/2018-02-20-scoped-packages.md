---

title: "Scoped packages"
author: gallayl
image: "../img/posts/getting-started-with-aurelia.jpg"
tags: [npm, node, typescript, javascript]

---

We've started 2018 with a huge NPM package refactor: we have divided our base *sn-client-js* package into several smaller ones and published them as *scoped* packages. We've refactored a lot of code to simplify our API, improve working with immutable objects and also did a strict review on our dependencies. As a result we've published 10 new packages into the [**@sensenet**](https://www.npmjs.com/search?q=%40sensenet) scope. I will summarize the reasons, the improvements and what changed.

---

## Why?

The long story short: *sn-client-js* has started to grow too fast. The development started to getting slower and harder. The package contained some well-separable parts (like querying, default content types or repository events) that could be easily extracted into separate packages, it had some parts (like the Repository and Content API) that we had to think again and some parts (like internal modules or namespaces) that are no longer recommended to use.

### Immutable objects

Redux - as many other libraries nowdays - uses *shallow equality checking* for change detection and therefore it needs to work with [immutable data](https://redux.js.org/docs/faq/ImmutableData.html). Our Content and Repository API-s were not fully prepared to work with immutable objects - our rich-domain-inspired Content API had its own change detection mechanism. We had to rethink the concepts of a repository and a content in terms of immutability.

### Internal modules and namespaces

We've packed a lot of things in **sn-client-js**: default content type and schema definitions, logics for querying on OData, authentication logics, etc... They were organized into *internal modules and namespaces*. This approach is less and less recommended, nowdays namespacing is considered as [needless](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html) by Typescript. There were some modules (like the default Content Types) that was worth extracting into a separate package.

### The size is sn-client-js@^3.0.3 in numbers

Based on the generated Typedoc documentation, we have 205 classes, 13 enums, 7 interfaces in the 23 internal modules.

If you install sn-client-js into your NPM project, it will contain about 890 files and will take about 20MB of space.

If you clone and install the latest sn-client-js, you will have **275** folders in your *node_modules* folder and the whole package size is approx 160 MB.

The package contains about **~458** unit tests that isn't a problem itself: it takes less than roughly a second to complete. But with the full build process it takes **~20** seconds.

## The goals

We wanted to organize our whole client-side ecosystem into smaller, lightweight packages into one large monolithic all-in-one package. NPM offers [package scoping](https://docs.npmjs.com/misc/scope), so we've decided to publish the new packages within a **@sensenet** scope.

We wanted some features - like observing repository events, mapping controls to schemas or even JWT authentication itself - to be optional, we wanted to exclude them as well. 

We wanted to review if that we can switch to some native APIs from external NPM libraries - especially in terms of RxJs and native promises and fetch API.
We wanted to catch up with the industry standards in terms of immutability. We've also wanted to use more strict linting rules.

We also wanted to take a look on our build, test and publish processes and - last but not least - the content of our NPM packages.


## The new packages
 - ToDo: dependency graph

### [client-utils](https://www.npmjs.com/package/@sensenet/client-utils)

This package contains some generic utilities - like helpers for disposable objects, a retrier, a method tracer and a simple value observer implementation - and *without and sensenet ECM dependency*, so they can be used in any project.

### [query](https://www.npmjs.com/package/@sensenet/query)

If you want to create type safe content queries you can do that with this package. It has a fluent API to create a query from a generic type argument.

### [default-content-types](https://www.npmjs.com/package/@sensenet/default-content-types)

We store the default generated content types, schema definitions, enums, etc... in this package. This package exceptionally doesn't contain any unit tests as it doesn't contain application logic - it can be used as a content type / schema library.

### [client-core](https://www.npmjs.com/package/@sensenet/client-core)

The *core* logic sits in this package, if you want to interact with sensenet ECM its a good starting point to install this package.
It contains the refactored *Repository* object itself, you can load / modify / delete content and execute custom action from there.
It also contains some predefined security and versioning related actions.

### [authentication-jwt](https://www.npmjs.com/package/@sensenet/authentication-jwt)

If you install the [@sensenet/client-core](https://www.npmjs.com/package/@sensenet/client-core) package, it bypasses authentication by default. That means if you need JWT authentication, you have to install this package as well and configure it on your *repository* instance.

### [authentication-google](https://www.npmjs.com/package/@sensenet/authentication-google)

It contains the Google Oauth authentication implementation. This package depends on JWT, but it's fully optional. 

### [control-mapper](https://www.npmjs.com/package/@sensenet/control-mapper)

It contains an utility that helps to map 3rd party controls to generated sensenet schemas. It's optional, but used by our control packages.

### [repository-events](https://www.npmjs.com/package/@sensenet/repository-events)

If you want to listen to specific repository events - like a content change - you can use this package. This is also optional, but we use it in [@sensenet/controls-aurelia](https://www.npmjs.com/package/@sensenet/controls-aurelia)

### [@sensenet/controls-aurelia](https://www.npmjs.com/package/@sensenet/controls-aurelia)

Our Aurelia control package has been refactored. The main change here is that it uses packages from the @sensenet scope as dependencies.

## Concept changes

### Removed content API, cleaned up Repository API

The main change is that the Content API itself has been removed. Most of its responsibilities has been moved to the Repository instance level - in the most cases this means that e.g. ``myContent.checkout();`` has been moved to ``repository.checkout(myContent);``.

One another breaking chage is that in the future content creation and updates will be possible only on *repository instances* via the exposed **post/patch/put** methods. That means that ``myContent.save()`` will be changed to ``repository.patch({idOrPath: myContent.Id, content: myContent})``

### Simplified and improved generics



### Es6 Promises and native fetch instead of RxJs and observables

In sn-client-js we used RxJs observables for asynchronous operations

### Less transformation
 - load, get requests - access to metadata, etc...

## Package optimizations
 - Dependency review
   - removed rxjs
   - removed mocha-typescript
 - Commitizen and Typedoc as global package
 - Separated build and test process and artifacts
 - Generated documentation and coverage reports are excluded form NPM packages

## API changes
 - Installing and testing
 - Creating a Repository
 - Configuring JWT
 - Load / Save / Update / etc...


## What's next?
 - TypeDocs on the community site
 - Review Redux dependencies and async operations
 - Dynamic schema loading and CLI update