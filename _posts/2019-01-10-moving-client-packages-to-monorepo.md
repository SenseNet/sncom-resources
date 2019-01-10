---

title:  "Moving sensenet client packages to monorepo"
author: B3zo0
image: "../img/posts/monorepo/colorful-stack.jpg"
tags: [monorepo, refactor, javascript, client packages]

---
*Juggling a multimodule project over multiple repos is like trying to teach a newborn baby how to ride a bike.*
[Babel](https://github.com/babel/babel/blob/master/doc/design/monorepo.md#why-is-babel-a-monorepo)

---
## Some history about our client packages

At first we started with one package it was [sn-client-js](https://github.com/SenseNet/sn-client-js). As time goes by it grow bigger and we felt like we need to do something.
> We’ve started 2018 with a huge package refactor: we have divided our base sn-client-js package into several smaller ones and published them within a @sensenet scope. 

You can read more about that in another blog post ➡️ [Scoped packages](/blog/2018/02/21/scoped-packages "Scoped packages")

## Why monorepo?


## Let's get started

![Get all the packages we extracted from one repository and put them together in a new one](/img/posts/monorepo/patrick-meme.jpg "Get all the packages we extracted from one repository and put them together in a new one")


## Conclusion