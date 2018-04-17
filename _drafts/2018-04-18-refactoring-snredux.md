---

title:  "Refactoring sensenet's redux library"
author: herflis
image: "../img/posts/snredux-refactor.jpeg"
tags: [refactor, redux, actions, reducers, rxjs, observable, promise, middleware]

---

We've continued refactoring client side packages with [sn-redux](https://github.com/SenseNet/sn-redux). As in the case of the [sn-client-js related new scoped packages](https://community.sensenet.com/blog/2018/02/21/scoped-packages), the changes were about removing dependence on rxjs, improving the API, review other dependencies and making the necessary clean-ups. Followings will sum up all the changes, the why's and how's including a list of the possible migration steps if you used a pervious version of sn-redux before.

---

## Scoped package

![Clean-up](/img/posts/cleanup.jpg "Clean-up")

As it was mentioned in one of our previous [posts](https://community.sensenet.com/blog/2018/02/21/scoped-packages), with creating scoped packages our main goal was to divide the code into smaller and more maintainable units. We've created *@sensenet* scope and publish our npm packages withing this. With sn-redux the plan was the same, so [@sensenet/redux](https://www.npmjs.com/package/@sensenet/redux) was born. From now on the package should be installed like this:

```npm install --save @sensenet/redux```

This way it will be saved in a separate folder named *@sensenet* and the inner modules have to be imported this way:

```import { Actions } from '@sensenet/redux'``` 

## Dependency clean-up

The list of dependencies of previous versions was quite huge so we've decided to think about how to reduce the number of them. First step was to remove everything related to [gulp](https://gulpjs.com/). Since the last version we only use it in one task to help generating docs with [typedoc](http://typedoc.org/), but it became unnecessary with some improvements in our npm scripts so [gulp](https://gulpjs.com/) related dependencies could have been removed. Some of the tools were removed because they add tons of dependencies indirectly while they're necessary only in our development process, so because of this we decided to install things like [typedoc](http://typedoc.org/) or [commitizen](https://github.com/commitizen) as global dependencies in the future this way they could be removed from the list of dependencies.

## Replacing redux-observable epics and removing rxjs

The biggest improvement of the new release was refactoring async operations. We have been using [rxjs](http://reactivex.io/rxjs/) and [redux-observable](https://redux-observable.js.org/) for this purposes for a while but it became more and more complicated to keep our code up-to-date, testable and maintainable with these two. The plan was to check some of the potential competitors of redux-observable and set an order along complexity, typesafety, number of dependencies and maintainability. We tried [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware), [redux-thunk](https://github.com/gaearon/redux-thunk), [redux-saga](https://github.com/redux-saga/redux-saga) and the potential of native es6 promises and at the first site [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware) was the one. After a while it came out that even though it fits our needs in many cases it doesn't do it in others. Sensenet repository is needed in all the levels of action creators and [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware) doesn't support using custom input params or any other ways to solve this issue for us. So we created our custom middleware based on [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware) with repository as possible input param and with adding some other minor things like changing the action delimiter and action suffixes. [sn-redux-promise-middleware](https://github.com/SenseNet/sn-redux-promise-middleware) is of course in the *@sensenet* scope and it became a dependency of sn-redux.

## Improving typesafety, tests, coverage and code quality

One of the main purposes of replacing rxj was that some part of the code was and would have been always untestable and also the coverage could not have been improved above a certain level. Creating a custom middleware lets us reach every level of the code and this way we were able to maximaze the code coverage to 100%.

![Celebration](/img/posts/celebration.gif "Celebration")

Besides that number of tests and the code coverage was improved we set higher standards in linting rules of the project as well.

## Documentation update and clean-up

Huge part of the documentation became pretty outdated because of the numerous changes of the API, so it was clear that it need to be revisited and fixed. Since we've added linting rules to force us documenting public stuff, no undocumented code is allowed and the API docs of the current version are complete. [Docs are moved to sensenet's community site](https://community.sensenet.com/api/sn-redux/index.html) so you can discover it in depth. 

## Update sn-redux in your application

As I mentioned it above while we were updating our test projects like sn-dms-demo, we've made a list of issues and of course the possible solutions. If you have used sn-redux before and thinking of the upgrade, the following checklist makes you sure that it could be done with only a few changes.

#### - Update all the imports related to sn-client-js and sn-redux like

```ts
import { Reducers } from '@sensenet/redux'
```

#### - Remove rxjs imports
#### - Creating the repository instance like

```ts
import { Repository } from '@sensenet/client-core'

const repository = new Repository({
  repositoryUrl: 'https://mysite.com',
  requiredSelect: ['Id', 'Path', 'Name', 'Type', 'ParentId', 'Actions', 'Avatar'] as any,
})
```

#### - Use JwtService like

```ts
import { JwtService } from '@sensenet/authentication-jwt'

const jwt = new JwtService(repository)
```

#### - Way of creating and configuring a sensenet redux store has changed. You have to create a ```CreateStoreOptions``` object and use it as the only input param of ```createSensenetStore```

```ts
import { Reducers, Store } from '@sensenet/redux'

const options = {
  repository,
  rootReducer: myReducer,
} as Store.CreateStoreOptions

const store = Store.createSensenetStore(options)
```

#### - Replace your custom Epics creating async functions like:

```ts
export const userRegistration = (email: string, password: string) => ({
    type: 'USER_REGISTRATION_REQUEST',
    email,
    password,
    async payload(repository: Repository) {
        const data = await repository.executeAction({
            name: 'RegisterUser', idOrPath: `/Root/IMS('Public')`, body: {
                email,
                password,
            }, method: 'POST',
        })
    },
})
```

#### - Action names were changed to Pascal case (e.g. UploadContent to uploadContent)
#### - Since the success and reject actions are handled in the background you cannot dispatch them manually.
#### - If you've created an Epic not for handling async operations but for subscribing on actions you have to subscribe separately after configuring the store. 

For example I've created a ```MessageBoxHandler``` in the [dms-demo](https://github.com/SenseNet/sn-dms-demo) to subscribe on the ```onContentDeleteFailed``` and ```onContentDeleted``` events and added this handler after the store creation like:

```ts
const store = Store.createSensenetStore(options)

const handler = new MessageBoxHandler(repository, store)
```

#### - action.response is changed to action.payload
Check your custom Reducers that are connected with built-in sn-redux actions.

#### - Some actions have a different order or number of arguments. Please check the API docs 
