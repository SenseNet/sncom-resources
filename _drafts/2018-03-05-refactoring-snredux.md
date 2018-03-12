---

title:  "Refactoring sensenet's redux library"
author: [herflis, gallayl]
image: "../img/posts/snredux-refactor.jpeg"
tags: [refactor, redux, actions, reducers, rxjs, observable, promise, middleware]

---

intro

---

## Scoped package

![Clean-up](/img/posts/cleanup.jpg "Clean-up")

## Dependency clean-up
## Replacing redux-observable epics and removing rxjs
## Improving typesafety, tests, coverage and code quality
## Documentation update and clean-up
## Necessary updates in application using sn-redux
- update importing sn-client-js and sn-redux
- remove rxjs imports
- change repository creation according to the docs
- JwtService
- storeoptions, configureStore > createSensenetStore
- remove Epics and move your custom async functions to custom actions
- actionök kisbetűsek lettek
- már csak a 'request' actionöket lehet dispatchelni
- ha voltak olyan epicjeid, amik nem async action kezelésre voltak, hanem subscribe egy sn-redux-ban lévő vmilyen actionre, akkor a store configurálás után kéne rá feliratkozni
- action.response > action.payload
- check used sn-redux actions and if the number, types or sort of their args are changed