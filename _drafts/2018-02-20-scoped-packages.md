---

title: "Scoped packages"
author: gallayl
image: "../img/posts/getting-started-with-aurelia.jpg"
tags: [aurelia, typescript, authentication, sn-client-js, getting started]

---

...todo...

---

## Why?
 - problems with internal modules / namespaces
 - build, lint, typedoc, publish, etc... was getting slower
 - overgown dependencies
 - we had to refactor the API to work with immutable objects - e.g. advanced Redux support
 - small and lightweight packages instead of one large monolithic one
 - linting rules

## The new packages
 - dependency graph
 - short descriptions
 - concept changes
    - removed Content API
    - repository as a service class
    - improved generics
    - native promises instead of rxjs observables
    - KISS

## Package optimizations
 - Dependency review
 - Commitizen and Typedoc as global package
 - Separated build and test process and artifacts
 - Generated documentation and coverage reports are excluded form NPM packages

## What's next?
 - TypeDocs on the community site
 - review Redux dependencies and async operations