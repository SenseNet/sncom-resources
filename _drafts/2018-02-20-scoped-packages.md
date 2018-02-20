---

title: "Scoped packages"
author: gallayl
image: "../img/posts/scoped-packages.jpg"
tags: [npm, node, typescript, javascript, client packages, odata, immutable]

---

We've started 2018 with a huge package refactor: we have divided our base *sn-client-js* package into several smaller ones and published them within a *@sensenet* scope. We've refactored a lot of code to simplify our API, improve working with immutable objects and also did a strict review on our dependencies. I will summarize the reasons, the improvements and what has been changed.

---

## Why?

The long story short: out all-in-one *sn-client-js* has started to grow too fast. The development started to getting slower and harder. The package contained some well-separable parts (like querying, default content types or repository events) that could be easily extracted into separate packages, it had some parts (like the Repository and Content API) that we had to think again and some parts (like internal modules or namespaces) that are no longer recommended to use.

### Immutable objects

Redux - as many other libraries nowdays - uses *shallow equality checking* for change detection and therefore it needs to work with [immutable data](https://redux.js.org/docs/faq/ImmutableData.html). Our Content and Repository API-s were not fully prepared to work with immutable objects: our rich-domain-inspired Content API had its own change detection mechanism. We had to rethink the concepts of the client side repository and content API implementation in terms of immutability.

### Internal modules and namespaces

We've packed a lot of things in **sn-client-js**: default content type and schema definitions, logics for querying on OData, authentication logics, etc... They were organized into *internal modules and namespaces*. This approach is less and less recommended, nowdays namespacing is even considered as [needless](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html) by Typescript. There were some modules (like the default Content Types) that was worth extracting into a separate package.

### The size of sn-client-js@^3.0.3 in numbers

Based on the generated Typedoc documentation, we have 205 classes, 13 enums, 7 interfaces in the 23 internal modules.

If you install sn-client-js into your NPM project, it will contain about 890 files and will take about 20MB of space.

If you clone and install the latest sn-client-js, you will have **275** folders in your *node_modules* folder and the whole package size is approx 160 MB.

The package contains about **~458** unit tests that isn't a problem itself: it takes less than roughly a second to complete. But with the full build process it takes **~20** seconds.

## The goals

We wanted to divide our overgrown client side packages - especially our *base* package, *sn-client-js* - into smaller, lightweight ones. NPM offers [package scoping](https://docs.npmjs.com/misc/scope), so we've decided to publish the new packages within a **@sensenet** scope.

We wanted some features - like repository events, mapping controls to schemas or even JWT authentication itself - to be fully optional.
We wanted to review if that we can switch to some native APIs from external NPM libraries - for example in terms of RxJs and native promises with fetch API.
We wanted to catch up with the industry standards in terms of immutability and standardize our linting settings.

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
It also contains some predefined security and versioning related actions, response models, interfaces and abstracts.

### [authentication-jwt](https://www.npmjs.com/package/@sensenet/authentication-jwt)

If you install the [@sensenet/client-core](https://www.npmjs.com/package/@sensenet/client-core) package, it bypasses authentication by default. That means if you need JWT authentication, you have to install this package as well and configure it on your *repository* instance.

### [authentication-google](https://www.npmjs.com/package/@sensenet/authentication-google)

It contains the Google Oauth authentication implementation. This package depends on JWT, but it's fully optional. 

### [control-mapper](https://www.npmjs.com/package/@sensenet/control-mapper)

It contains an utility that helps to map third party controls to generated sensenet schemas. It's optional, but used by our control packages.

### [repository-events](https://www.npmjs.com/package/@sensenet/repository-events)

If you want to listen to specific repository events - like a content change - you can use this package. This is also optional, but we use it in [@sensenet/controls-aurelia](https://www.npmjs.com/package/@sensenet/controls-aurelia)

### [@sensenet/controls-aurelia](https://www.npmjs.com/package/@sensenet/controls-aurelia)

Our Aurelia control package has been refactored. The main change here is that it uses packages from the @sensenet scope as dependencies.

## Concept changes

### Removed content API, cleaned up Repository API

The main change is that the Content API itself has been removed. Most of its responsibilities has been taken by the Repository - in the most cases this means that e.g. ``myContent.checkout();`` has been moved to ``repository.versioning.checkOut(myContent.Id);``.

One another breaking chage is that in the future content creation and updates will be possible only on *repository instances* via the exposed **post/patch/put** methods. That means that ``myContent.save()`` will be changed to ``repository.patch({idOrPath: myContent.Id, content: myContent})``.

### Promises, fetch and disposables

In sn-client-js we used RxJs observables for asynchronous operations. We've removed the whole RxJs library from our dependencies and switched to native ES6 promises and to the native **fetch** method. That means that you can use now the [async / await](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) syntax with sensenet calls.

There are a few observables like the current user, the login state or the repository events, they use our own simplified [observable](https://github.com/SenseNet/sn-client-utils) implementation. The difference is that these observables are also *disposables* so if you want to stop receiving updates, you have to ``dispose()`` them.

### Less transformation

We've reviewed and removed a lots of transformations in terms of odata requests, that means you will have access to the original json object and you can transform it afterwards.

## Package optimizations

One of the main goals was that our new packages should be small and lightweight. We've startedd with a strict dependency review that included the indirect dependencies as well. We've started to change our scripts to NPM scripts from Gulp tasks earlier and now we didn't have any dependency on Gulp. As I've mentioned earlier we've switched to native promises and we could remove our dependency on RxJs that is a huge package itself.
We've used an another package in our unit tests called *mocha-typescript* that enables unit test running with a nice decorator syntax - but it had [~59](http://npm.anvaka.com/#/view/2d/mocha-typescript) indirect dependencies, so we've also changed our unit tests to the plain mocha syntax.
Now most of our packages doesn't even have any external dependency that you *have to install*.

We've continued with reviewing our processes: We use [Typedoc](http://typedoc.org/) for API Docs generation - this is a great tool however also adds about [60](http://npm.anvaka.com/#/view/2d/typedoc) package as indirect dependency. We also use commitizen for GIT commit message formatting, but it means about [134](http://npm.anvaka.com/#/view/2d/commitizen) indirect dependencies. These two tools play an important role in our internal processes but not during development - therefore we've decided to remove them even from our *devDependencies* and install them as global NPM packages.

We've started to optimize our NPM package sizes next. We've removed the coverage reports - you can still check them on [Codecov](https://codecov.io/) - and the generated API Docs. They will be published into our [community site](https://community.sensenet.com/docs/) soon.

As the last step we've separated our **build** and **build:test** processes - the test artifacts will be compiled into a *temporary folder* and will be excluded from the NPM package and the **dist** folder will contain only that artifacts that the package uses.

The results: If you are using the scoped packages in your NPM project, the current version - with JWT, Google Oauth, the Repository events and the control mapper will - take ~2MB of space (sn-client-js took nearly 20MB).
Most of our scoped packages **won't install any third party package**. The only exceptions will be that packages that will *rely* on a specific framework or library, like the *Aurelia-controls* or the Redux package.

If you are developing a scoped package and you install the *dev dependencies* as well it will take *less than a half of the size of sn-client-js* (~66 MB vs ~149 MB in size, ~7000 files vs ~20 000 files).
The full build and unit testing time has also been improved - from about ~20sec to ~5sec.

## Changes

As I mentioned earlier there are no internal namespaces in the scoped packages - therefore you can *import* exactly just that classes / methods that you will need. I've collected a some common examples.

### Creating a Repository

You can start installing the *core* package with the ``npm install @sensenet/client-core`` command and creating a repository:

```ts
import { Repository } from '@sensenet/client-core';

const repo = new Repository(
  {
    repositoryUrl: "https://my-sensenet7-instance.com",
  });
```

### Configuring JWT and Google OAuth

As JWT is an optional feature, you have to install the corresponding package with the ``npm install @sensenet/authentication-jwt`` and you have to configure it after repository creation in the following way:

```ts
import { JwtService } from "@sensenet/authentication-jwt"

const jwtService = new JwtService(repo);
```

Once you have JWT, you can set up Google Oauth easily after installing the package **@sensenet/authentication-jwt**:
```ts

import { addGoogleAuth, GoogleOauthProvider } from '@sensenet/authentication-google';

const googleAuthProvider: GoogleOauthProvider = addGoogleAuth(jwtService, {
    clientId: 'my-google-client-id',
})
```

### Loading a content

There are some major changes when it comes to content loading. The first one is that the packages uses *promises*, as mentioned above, so from now the operations can be *awaited*.
The second one is that we've eliminated a lot of unneccessary data transformations, so you can work with the plain serialized data object from the response itself. This also means that you cannot use "instanceof"-type checks on these object, you can use the "Type" property at runtime and *generics* in Typescript during development.

There are two methods - load and loadCollection - that can be used for loading single contents / one-to-one references and collections / on-to-many references.

```ts
const portalUsers = await repo.loadCollection<User>({
    path: "/Root/IMS/BuiltIn/Portal",
    oDataOptions: { /** additional options */ },
});
console.log("Count: ", portalUsers.d.__count);
console.log("Users: ", portalUsers.d.results);
```

### Updates

There are also some breaking changes with the content creating / updating API: The POST/PUT/PATCH methods are now available directly on repository instances. You can also use Typescript generics.

```ts
const response = await repository.patch<User>({
    idOrPath: "Root/Example/My_Content",
    content: {
        LoginName: "myNewLoginName",
    },
    oDataOptions: { /** additional options */ },
});
```

### Other actions

The bacth actions (copy, move and delete) are also available on repository instances and you can also find the *security* and *versioning* under the corresponding namespace.
If you have custom OData actions implemented, you can use the ``executeAction`` method as shown in the example above - or wrap them with strongly typed method calls like we did for the Security and Versioning related actions:

```ts
const response: Promise<TReturns> = repo.executeAction<TPostBody, TReturns>({
    name: "MyCustomAction",
    idOrPath: "Root/Example/Content",
    method: "POST", // or GET
    body: {
        { myCustomPostData: myCustomValue } as TPostBody,
    },
})
```

## Further goals

Although the scoped packages has been published, we have still some tasks remaining: We have to publish the API documentation to the community site and update our tutorials.

We've already started to update our Redux package, review its dependencies and improve the async operations - it will be also a scoped package. After that we can update our React controls package as well.

We also plan to update our command line tool to allow developers fetching their content types from CTDs but before we do that we want to improve the *client-side schema loading*.

We hope that sensenet ECM development will be simpler and more fun than ever with the new packages. If you have any questions or thoughts don't hesitate to share with us :)
