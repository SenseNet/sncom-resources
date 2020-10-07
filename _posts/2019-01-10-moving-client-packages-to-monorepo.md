---
title: 'Moving sensenet client packages to monorepo'
author: zoltanbedi
image: '../img/posts/monorepo/colorful-stack.jpg'
tags: [monorepo, refactor, JavaScript, client packages]
redirect_to: https://www.sensenet.com/blog/2019-01-10-moving-client-packages-to-monorepo
---

_Juggling a multimodule project over multiple repos is like trying to teach a newborn baby how to ride a bike._ [Babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md#why-is-babel-a-monorepo)

---

## TL;DR
*We moved all our javascript packages to [one repository](https://github.com/SenseNet/sn-client).*

## Some history about our client packages

At first, we started with one package [sn-client-js](https://github.com/SenseNet/sn-client-js). As time went by it grew bigger and we felt like we need to do something.

> We’ve started 2018 with a huge package refactor: we have divided our base sn-client-js package into several smaller ones and published them within a @sensenet scope.

You can read more about that in another blog post ➡️ [Scoped packages](/blog/2018/02/21/scoped-packages 'Scoped packages')

## The problem

Managing features that span many repositories started to be difficult after the decoupling. Staying on the same version of typescript, using the same rules in the tsconfig. We had to do all those things in every repository.

For example, we have a package called [@sensenet/client-utils](https://www.npmjs.com/package/@sensenet/client-utils) and I want to add a new helper function there.
Let's say a debounce that I will use in another package.

### The workflow is the following for this:

1.  Create a branch from develop in the client-utils package
2.  Create the debounce function
3.  Create a pull request and wait for the code review
4.  Merge back to develop
5.  Do a release
6.  Do a package upgrade in the package I want to use the util function
7.  Notice a bug in the debounce function and start a process again

I know, there shouldn't be a bug in the code that have been reviewed. Also we could just copy the built code to the package node_modules folder to use that instead of the package from npm but that felt like a pain in the long run. There must be an easier way for this.

## Monorepo to the rescue

> In revision control systems, a monorepo (syllabic abbreviation of monolithic repository) is a software development strategy where code for many projects are stored in the same repository.

**In a monorepo the whole workflow can be simplified like this:**

1.  Create a branch from develop
2.  Create the function
3.  Build, test
4.  Merge back when done

So much easier and cleaner than before. No need to copy anything, anywhere. No need to release a dev alpha or a minor version. You can see your changes in all the packages once you modified something. It not only made our life simpler but it gave us a productivity boost as well. Let's see how the transition went.

![Patrick](/img/posts/monorepo/patrick-meme.jpg 'Get all the packages we extracted from one repository and put them together in a new one')

## Moving sensenet client packages to monorepo

First thing first, we need a new repository. We could also use one of the repos and put everything there, but it felt cleaner to start a new one. I have created a todo list in this [pull request](https://github.com/SenseNet/sn-client/pull/1) to track the progress and to see what is left. 

We moved all the packages to the packages folder with Lerna. _[Lerna](https://lernajs.io/) is a tool that optimizes the workflow around managing multi-package repositories with git and npm._ This way we could see the commit history in the new repository as well. We had to make sure that every package is able to build itself. We faced some problems here. Not every package was configured correctly. Some was missing dependencies that were needed for it to be able to build.

After that we run the tests to make sure we didn't break anything. Because the repositories were not consistent in their configs, it failed. We had to temporarily suspend the linting to see the test results. With that said we realized that we should make all repositories consistent. Fortunately there were no big errors.

This is the list that we did to make the packages unified:
  - Styling - Added .editorconfig, prettier and precommit hook with [lint-staged](https://github.com/okonet/lint-staged)
  - Linting - Pointed the tslint.json files to the root tslint file and fixed the errors
  - Build - Pointed the tsconfig.json files to the base tsconfig file
  - Updated the package.json files to reflect the new changes (issue link, git url), removed common devdependencies
  - Removed files that are not needed anymore in all the repositories (travis.yml, contributing.md, .vscode folder)

When we finished with all this we had to make the ci work again, update the readmes, archive the old repositories and move all the issues to the new repository. The last step was to do a minor release from the packages. It was a piece of cake with the help of Lerna.

### After all here are the benefits we gained:

- **It is easier to coordinate changes across modules** - Because every package that depends on another is linked together, you can see the changes in no time.
- **Dependencies are now unified** - In a multiple repository environment where multiple projects depend on a third-party dependency, that dependency might be downloaded or built multiple times. In a monorepo the build can be easily optimized, as referenced dependencies all exist in the same codebase.
- **Single lint, build, test and release process** - Monorepos can share their configs from top to bottom creating a consistent developer experience.

## Conclusion

I think that moving to a monorepo will help us in the long run. Getting everything configured took time but it was only necessary for the future.
