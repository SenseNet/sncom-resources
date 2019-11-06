---
title: "Diving deeper into sensenet's Redux store"
author: herflis
image: "/img/posts/sn_plus_redux.png"
tags: [Redux, sensenet, JavaScript, TypeScript, React]
---

As you may already know [sensenet](https://sensenet.com)'s UI is being fully rebuilt on a new stack including [Redux](http://redux.js.org/). Since sensenet is also a development platform with the possibility of building your own app upon its Redux store and actions, let me guide you through the current version of the state tree showing you how we organized data so far.

---
In the last few months I've read a couple of posts about the Redux store of Twitter and I thought if it was interesting to dig into their state tree it will be useful to write an article like this about sensenet's too. [Dissecting Twitter's Redux Store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1),  [Diving Deeper into Twitter’s Redux Store: Adventures in Minified Vendor Javascript](https://medium.com/@nuncamind/diving-deeper-into-twitters-redux-store-adventures-in-minified-vendor-javascript-67fbac5dc219) and other posts in this topic were not only guiding us analyzing sensenet's Redux store the same way in a similar post, but also helped us to figure out how a state tree in a content-heavy application could be built-up, and how we should structure data in our next DMS MVP's Redux store.

To be honest we had a Redux store before, it was the basis of couple of Todo apps that we've made with different frameworks to try out sensenet 7's Javascript Client and the API. But these apps were (and are) only prototypes with reduced functionality and they required only a basic state tree with less data and actions. After we've decided to create a DMS MVP with sensenet 7 on the new stack we had to rethink the whole store, the available actions, reducers and epics not only because it requires more and structured data but also because we provide a development platform to create custom solutions upon sensenet.

Btw [sn-redux](https://github.com/SenseNet/sn-redux) is a set of [Redux](http://redux.js.org/) actions, reducers and [redux-observable](https://redux-observable.js.org/) epics which means you get a package with 
- an optimized state tree with normalized data, 
- actions that can be dispatched related to the basic content, user and permission management features of sensenet,
- reducers to define state changes required by the above mentioned actions,
- epics to handle the sensenet OData actions and functions,
- and of course you can complete it with your actions, reducers and epics if you implement a custom feature.

Old version of sn-redux contained only things that can be used in a simple todo app. So there were only a few things available for creating a task, set it to *done*, delete it, etc. We knew that it should be restructured if we want to use it as a base of a content and feature heavier application.

First of all we've checked what sort of solutions were made with sensenet in the past and what could we provide at this level to help to accomplish them. We came to the conclusion that the most important things related to an application built upon sensenet are the context, the content items by permissions, basic document management features, content manipulation and user information. So these things became the key parts of the new Redux store in [sn-redux](https://github.com/SenseNet/sn-redux).

To let us now dig deeper in sensenet's Redux store (and make our life easier in development time) we integrated [redux-logger](https://github.com/evgenyrodionov/redux-logger) so that we can check how our state tree changes by the dispatched actions and last but not least we can show you how the tree is built-up, you can open every branch and look into it. If you've installed [sn-redux](https://github.com/SenseNet/sn-redux) and configure a store, you're able to see the log in the browser console when you dispatch an action.

![redux-logger in browser console](/img/posts/redux-logger.png)

As you can see there are four reducers at the top level of sensenet: *children*, *currentcontent*, *selected* and *session*.

![redux-logger in browser console](/img/posts/sensenet-reducer.png)

**currentcontent** holds the state of the current content: you can access its metadata, its fields, the related sensenet actions and the state of the content which means you can check if it is dirty, in progress, saved or valid, and you can subscribe on all of the changes. If there was an error while loading content the error message is also stored here as the value of the *error* property.

![current content](/img/posts/currentcontent-store.png)

In the **children** part you can access the current content's children in normalized form. For normalizing data we used [normalizr](https://github.com/paularmstrong/normalizr) which helps to structure (sometimes deeply) nested JSON objects which came as a response of an OData request. This works based on a schema definition with entities (in this case fetched content items) and a given param (in this case Id) that holds their unique identifier. So before data is added to the state tree it's normalized: there's an array with name *ids* that holds the items' ids and an object, *entities* that contains the Content items by their ids. Each content in the entities Object has an id that matches the key from the ids Array. This way manipulating (listing, selecting, deleting, etc) Content is much simpler. 
Some of the OData params are listed here too, so that it can be accessed later which Fields were selected, how items were ordered, if a filter was used, etc. It is also available here if the items are currently fetching or not, or if there was an error during the fetching process.

![children](/img/posts/children-store.png)

**selected** holds the id(s) of the selected Content item(s).

The **session** part contains information about the current *session*. There're a couple of user related stuff stored here like her fullname, path of her avatar image, chosen language and username, and there will be some browser related parameters stored like country and language settings. 
This part is the home of the *login state* too, so that you can subscribe to the state of the user, and control the authentication process. 
Last but not least the *repository* part contains the repository config, with the url of the requested repository and many other settings and defaults.

![session](/img/posts/session-store.png)

## Is this the final version? 

![The future is bright](/img/posts/thefutureisbright.gif)

Definitely not. While the DMS MVP and the admin surface of sensenet 7 is in progress, the Redux store of sensenet and [sn-redux](https://github.com/SenseNet/sn-redux) itself will change and improve continuously for sure. But we have laid the foundations of it and the future is bright, so any comments are welcome, help us make it better and better. [Redux](http://redux.js.org/) is awesome and I believe that it can make development with sensenet more fun then ever.
