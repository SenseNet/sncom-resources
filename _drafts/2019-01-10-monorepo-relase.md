# Monorepo relase 2019-01

 - Moved all NPM packages into the [sn-client](https://github.com/SenseNet/sn-client) monorepo. The old repositories has been archived.
 - Changes with the unit tests
    - Replaced *mocha* with *jest*, removed *chai*
    - In our React-related packages, we've replaced *react-test-renderer* with *enzyme*
    - Removed additional ``build:test`` scripts and hooks
    - Unified [code coverage reports](https://codecov.io/gh/SenseNet/sn-client)
 - Standardized and tightened tsconfig and tslint configs

## Packages

### sn-authentication-google
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
### sn-client-core
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
### sn-client-utils
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-control-mapper
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-controls-react
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
 - replaced ``react-test-renderer`` with ``enzyme``

### sn-default-content-types
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
 - added [versioning related fields](https://github.com/SenseNet/sn-client/issues/30) to GenericContent

### sn-icons-react
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
 - replaced ``react-test-renderer`` with ``enzyme``

### sn-list-controls-react
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
 - replaced ``react-test-renderer`` with ``enzyme``

### sn-query
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-redux
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-redux-promise-middleware
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-repository-events
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``

### sn-search-react
 - package moved to monorepo
 - refactored tests from ``mocha/chai`` to ``jest``
 - replaced ``react-test-renderer`` with ``enzyme``

----

### sn-dms-demo
 - package moved to monorepo

### sn-react-component-docs
 - package moved to monorepo
 - added docs for [@sensenet/search-react](https://www.npmjs.com/package/@sensenet/search-react) component

### sn-react-redux-todo-app
 - package moved to monorepo
 - Cleaned up ``create-react-app`` dependencies and configs
 - refactored tests from ``mocha/chai`` to ``jest``
