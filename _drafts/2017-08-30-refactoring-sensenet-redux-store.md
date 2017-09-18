---
title: "Diving deeper into sensenet's Redux store"
author: herflis
image: "img/posts/sn_plus_redux.png"
tags: [Redux, sensenet, JavaScript, TypeScript, React]
---

As you may already know [sensenet](https://sensenet.com) ECM's ui is being fully rebuild on a new stack including [Redux](http://redux.js.org/). Since sensenet is also a development platform with the possibility of building your own app upon its Redux store and actions, let me guide you through the state tree showing you how we organized content in it.

---
In the last few months I've read a couple of posts about the Redux store of Twitter and I thought if it was interesting to dig into their state tree it will be useful to write an article like this about sensenet ECM's too. [Dissecting Twitter's Redux Store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1),  [Diving Deeper into Twitter’s Redux Store: Adventures in Minified Vendor Javascript](https://medium.com/@nuncamind/diving-deeper-into-twitters-redux-store-adventures-in-minified-vendor-javascript-67fbac5dc219) and other posts in this topic were not only guide us to analyze sensenet ECM's Redux store the same way in a post, but also helped us to figure out how a state tree in a content-heavy application could be built-up, and how we should structure data in our next DMS MVP's Redux store.

To be honest we had a Redux store before and it was the basis of couple of Todo apps that we've made with different frameworks to try out sensenet 7's Javascript Client and the API. But these apps were (and are) only protorypes with reduced functionality and they required only a basic state tree with less data and Actions. When we decided to create a DMS MVP with sensenet 7 on the new stack we had to rethink the whole store, the available Actions, Reducers and Epics not only because it requires more and structured data but also because we provide a development platform to create custom solutions upon sensenet ECM.

Btw [sn-redux](https://github.com/SenseNet/sn-redux) is a set of redux Actions, Reducers and [redux-observable](https://redux-observable.js.org/) Epics which means you become a package with 
- an optimized state tree with normalized data, 
- Actions that can be dispatched related to the basic content, user and permission managment features of sensenet ECM,
- Reducers to define sensenet related state changes,
- Epics to handle the sensenet OData actions and functions,
- and of course you can add your custom Actions, Reducers and Epics if you implement a custom feature.
Old version of sn-redux contained only things that can be related to a simple todo app. So there were only a few things available for creating a task, set it to *done*, delete it, etc.

First of all we've checked what sort of solutions was made with sensenet and what could we provide at these level to help to accomplish them. We came to the conclusion that the most important things related to an application built upon sensenet are the context, the content items by permissions, basic document management features, content manipulation and user information. So these things became the key parts of the new Redux store in [sn-redux](https://github.com/SenseNet/sn-redux).

To let us now dig deeper in sensenet ECM's Redux store (and make our life easier in development time) we integrated [redux-logger](https://github.com/evgenyrodionov/redux-logger) so that we can check how our state tree changes by the called Actions and last but not least we can show you how the tree is built-up, you can open every branch and look into it. If you've installed sn-redux and configure a store with it, you're able to see the log in the browser console when you dispatch an Action.

![redux-logger in browser console](/img/posts/redux-logger.png)

As you can see there are four reducers at the top level of sensenet: *children*, *currentcontent*, *selected* and *session*.

![redux-logger in browser console](/img/posts/sensenet-reducer.png)

### - *currentcontent*

*currentcontent* holds the state of the current content: you can reach its metadata, its fields, the related actions that can be executed on it and the state of the content which means you can check if it is dirty, in progress, saved or valid, and you can subscribe on all of the changes. If there was an error while loading content the error message is also stored here.

![current content](/img/posts/currentcontent-store.png)

### - *children*

In the *children* part you can reach current content's children in normalized form. There's an array with name *ids* that holds the items' ids and an object, *entities* that contains the Content items by their id. This way manipulating (listing, selecting, deleting, etc) Content is much simplier. You can see some OData params are listed here too, so that it can be reached later which Fields were selected, how items was ordered, if a filter was used, etc. It is also avalible here if the items are currently fetching or not, or if there was an error during the fetching process.

![children](/img/posts/children-store.png)

### - *selected*

*selected* holds the id of the selected Content item or items.

### - *session*

The *session* part contains all the information that you need about the current 'session'. There're a couple of user related stuff like her fullname, path of her avatar image, her chosen language and username and there will be some browser related parameters like country and language information. This part is the home of the *login state* too, so that you can subscribe to the state of the user and control the authentication process. Last but not least the *repository* contains the repository config, with the url of the requested repository and many other settings and defaults.

![session](/img/posts/session-store.png)

## Is this the final version? 

![kamehameha](/img/posts/kamehameha.gif)

Definitely not. While the DMS MVP and the admin surface of sensenet ECM 7 is in progress, the Redux store of sensenet and sn-redux will improve and increase continuously for sure. 