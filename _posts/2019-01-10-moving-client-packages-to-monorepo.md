---
title: 'Moving sensenet client packages to monorepo'
author: B3zo0
image: '../img/posts/monorepo/colorful-stack.jpg'
tags: [monorepo, refactor, JavaScript, client packages]
---

_Juggling a multimodule project over multiple repos is like trying to teach a newborn baby how to ride a bike. _

[Babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md#why-is-babel-a-monorepo)

---

## TL;DR
*We moved all our javascript packages to [one reposity](https://github.com/SenseNet/sn-client).*

## Some history about our client packages

At first, we started with one package it was [sn-client-js](https://github.com/SenseNet/sn-client-js). As time goes by it grow bigger and we felt like we need to do something.

> We’ve started 2018 with a huge package refactor: we have divided our base sn-client-js package into several smaller ones and published them within a @sensenet scope.

You can read more about that in another blog post ➡️ [Scoped packages](/blog/2018/02/21/scoped-packages 'Scoped packages')

## The problem

Managing features that span many repositories started to be difficult after the decoupling.
Staying on the same version of typescript, tslint etc.
Using the same rules in the tsconfig and also in tslint.

For example, we have a package called [@sensenet/client-utils](https://www.npmjs.com/package/@sensenet/client-utils) and I want to add a new helper function there.
Let's say a debounce that I will use in another package.

### The workflow is the following for this:

1.  Create a branch from develop in the client-utils package
2.  Create the debounce function
3.  Review the code
4.  Merge back to develop
5.  Do a release
6.  Do a package upgrade in the package I want to use the util function
7.  Notice a bug in the debounce function and start a process again

I know, there shouldn't be a bug in the code that have been reviewed. Also we could just copy the built code to the package node_modules folder to use that instead of the package from npm but that felt like a pain in the long run. There must be an easier way for this.

## Monorepo to the rescue

> In revision control systems, a monorepo (syllabic abbreviation of monolithic repository) is a software development strategy where code for many projects are stored in the same repository.

### The whole workflow can be simplified like this:

1.  Create a branch from develop
2.  Create the function
3.  Build, test
4.  Merge back when done

So much easier and cleaner than before. No need copy anything, anywhere. No need to release a dev alpha or a minor version. You can see your changes in all the packages once you modified something. It not only made our life simpler but it gave us a productivity boost as well. Let's see how the transition went.

![Patrick](/img/posts/monorepo/patrick-meme.jpg 'Get all the packages we extracted from one repository and put them together in a new one')

## Moving sensenet client packages to monorepo

[PR](https://github.com/SenseNet/sn-client/pull/1)


### Here are the benefits we gained:

- **It is easier to coordinate changes across modules** - Because every package that depends on another linked together, you can see the changes in no time.
- **Dependencies are now unified** - In a multiple repository environment where multiple projects depend on a third-party dependency, that dependency might be downloaded or built multiple times. In a monorepo the build can be easily optimized, as referenced dependencies all exist in the same codebase.
- **Single lint, build, test and release process** - Monorepo can share their configs from top to bottom creating a consistent developer experience.

## Conclusion
