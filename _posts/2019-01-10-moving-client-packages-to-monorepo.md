---

title:  "Moving sensenet client packages to monorepo"
author: B3zo0
image: "../img/posts/monorepo/colorful-stack.jpg"
tags: [monorepo, refactor, JavaScript, client packages]

---
*Juggling a multimodule project over multiple repos is like trying to teach a newborn baby how to ride a bike. *
[Babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md#why-is-babel-a-monorepo)

---
## Some history about our client packages

At first, we started with one package it was [sn-client-js](https://github.com/SenseNet/sn-client-js). As time goes by it grow bigger and we felt like we need to do something.
> We’ve started 2018 with a huge package refactor: we have divided our base sn-client-js package into several smaller ones and published them within a @sensenet scope. 

You can read more about that in another blog post ➡️ [Scoped packages](/blog/2018/02/21/scoped-packages "Scoped packages")

## The problem

Managing features that span many repositories started to be difficult after the decoupling. 
Staying on the same version of typescript, tslint etc. 
Using the same rules in the tsconfig and also in tslint. 

For example, we have a package called [@sensenet/client-utils](https://www.npmjs.com/package/@sensenet/client-utils) and I want to add a new helper function there.
Let's say a debounce that I want to use in another package. 

### The workflow is the following for this:

 1. Create a branch from develop in the client-utils package
 2. Create the debounce function
 3. Review the code
 4. Merge back to develop
 5. Do a release (so the package I want to use in can get that from npm)
 6. Do a package upgrade in the package I want to use the util function
 7. Notice a bug in the debounce function and start a process again

I know there shouldn't be a bug in the code that have been reviewed. Also we could just copy the built code to the package node_modules folder to use that instead of the package from npm but that felt like a pain in the long run.

## Monorepo to the rescue

![Patrick](/img/posts/monorepo/patrick-meme.jpg "Get all the packages we extracted from one repository and put them together in a new one")


## Conclusion
