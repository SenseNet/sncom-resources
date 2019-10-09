---
title:  "Starting out with sensenet using Reactjs and Redux"
category: Tutorials
index: 0
version: v7.0
tags: [reactjs, redux, javascript, typescript, getting started, step by step, frontend]
description: Step-by-step tutorial creating your first basic single page app with sensenet, Reactjs and Redux.
---

# Starting out with sensenet using Reactjs and Redux

## Prerequisites

First of all you need a sensenet instance installed. The following project will get and set data from the Content Repository through OData REST API so it would be enough to install [sensenet Services](https://github.com/SenseNet/sensenet), but since sensenet 7 has not got its own admin surface yet probably your life will be easier if you install [sensenet Webpages](https://github.com/SenseNet/sn-webpages) too. With sn-webpages you can access the good old Content Explorer with the control over all the users, permissions, settings, content types and many more.


## Avoid the pitfalls

Maybe you are already familiar with [create-react-app](https://github.com/facebookincubator/create-react-app) which is an awesome tool that helps you creating React apps without ANY build configuration. Since we at sensenet write our code in TypeScript we use the forked TypeScript version [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript) of it but it's not mandatory of course. To have a running basic React application, all you have to do is:

### 1. Install create-react-app with npm:

```
npm install -g create-react-app
```

### 2. Create your app

```
create-react-app my-sn-app --scripts-version=react-scripts-ts
```

### 3. Browse the newly created project's folder and execute the start script

```
cd my-sn-app/
npm start
```

And voila, your app is running in the browser :)

![create-react-app mainpage](/img/posts/create-react-app-mainpage.png)

## Connect to sensenet
 
To let your app communicate with the sensenet instance you have to allow its domain as the origin of [CORS](http://wiki.sensenet.com/Cross-origin_resource_sharing) requests. The easiest way to do this if you open the Content Explorer and add your apps url to the ```AllowedOriginDomains``` list in the Portal settings file (*/Root/System/Settings/Portal.settings*)

```xml
...
"AllowedOriginDomains": [
    "localhost",
    ...
  ]
...
```

## sensenet client repository

sensenet 7 has a JavaScript library that lets you work with its Content Repository by providing client API for the main content operations. We will create the base of our application by creating a client repository with [@sensenet/client-core](https://github.com/SenseNet/sn-client-core)

```
npm install --save @sensenet/client-core
```

 > If you are interested more in client repository and how to take advantage of sensenet client packages check the [API references](https://community.sensenet.com/api/).

Import it into your React application's ```index.tsx``` as a dependency and create a new ```SnRepository``` with the url of your sensenet instance

```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Repository } from '@sensenet/client-core'
import './index.css';

const repository = new Repository({
  repositoryUrl: 'https://mysensenetsite.com'
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```

## sensenet state tree with Redux

To manage our application's state we use [Redux](https://redux.js.org/) and to make your life even more easy to work on this stack, we've created [sn-redux](https://github.com/SenseNet/sn-redux) that is a set of redux actions, reducers and redux-observable epics for sensenet. In sn-redux we've implemented the main sensenet content operations so all you have to do is dispatch them and get everything from the state tree through predefined reducers. If you're interested - and why would you not - how sensenet EMC's redux store is built up, check [Diving deeper into sensenet's Redux store](https://community.sensenet.com/blog/2017/09/20/refactoring-sensenet-redux-store). 

To create and configure your application's state container:

### 1. Install sn-redux

```
npm i --save @sensenet/redux @sensenet/authentication-google
```

### 2. Import the following things to your ```index.tsx```

```typescript
import { combineReducers } from 'redux';
import { Store, Reducers } from '@sensenet/redux';
```

### 3. Create your app's top reducer ```sensenet```

```typescript
const sensenet = Reducers.sensenet;
const myReducer = combineReducers({
  sensenet
});
```

### 4. Create and configure your application's store

```typescript
const storeOptions = {
  repository,
  rootReducer: myReducer
} as Store.CreateStoreOptions;
const store = Store.createSensenetStore(storeOptions);
```

> There're some configuration changes that should be made in the ```tsconfig.json```. First add the following into the compilerOptions ```"types": ["jest","node"]```. This is needed because create-react-app uses [jest](https://facebook.github.io/jest/) for testing but some of the dependencies like sn-redux using [mocha](https://mochajs.org/), both have a variable named ```describe``` and it causes a conflict in the build process. Another thing to change is to set ```noImplicitAny``` and ```strictNullChecks``` to false in the tsconfig.json and set ```no-any``` to false in ```tslin.json```.

Now if you restart the application and check the dev toolbar you can see, that the Redux store of your application is initialized and some basic actions are already dispatched on it. We built redux-logger in [sn-redux](https://github.com/SenseNet/sn-redux), so you can check the state tree in depth before and after every action.

![redux state tree](/img/posts/sn-app-reduxstore.png)

### 5. Connect the redux store to your application

Install [react-redux](https://github.com/reactjs/react-redux) and import it into your index.tsx

```npm install --save react-redux```

And wrap your app in a provider with your newly created store.

```
...
import { Provider } from 'react-redux';
...
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
...
```

Now you are able to dispatch the predefined actions on the store, and connecting the store to your Reactjs components you can subscribe to the changes, use and display anything that can be found in the state tree.

> See the available actions in the [sn-redux API references](https://community.sensenet.com/api/sn-redux).

## Simple app with login, logout and with a list of some content

#### Create a component to list content items after login:

*List.tsx*

```typescript

import * as React from 'react';
import { connect } from 'react-redux';
import { Actions, Reducers } from '@sensenet/redux';

interface ListProps {
    logout: Function;
    fetch: Function;
    children: Object;
    ids: number[];
}

class List extends React.Component<ListProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    componentDidMount() {
        this.props.fetch('/Root/Sites/Default_Site');
    }
    componentDidUpdate(prevOps: any) {
        if (Object.keys(prevOps.ids).length !== Object.keys(this.props.ids).length) {
            this.props.fetch('/Root/Sites/Default_Site');
        }
    }
    handleLogoutClick(e: any) {
        e.preventDefault();
        this.props.logout();
    }
    render() {
        const { children, ids } = this.props;
        return (
            <div>
                <h1>Contentlist</h1>
                {ids.length === 0 ? 'Empty list' :
                    <ul>
                        {ids.map(id => {
                            const content = children[id];
                            return <li key={content.Id}>{content.DisplayName}</li>;
                        })}
                    </ul>
                }
                <button onClick={e => this.handleLogoutClick(e)} > logout</button>
            </div>
        );
    }
}

const mapStateToProps = (state, match) => {
    return {
        ids: Reducers.getIds(state.sensenet.children),
        children: Reducers.getChildren(state.sensenet.children)
    };
};

export default connect(mapStateToProps, {
    logout: Actions.userLogout,
    fetch: Actions.requestContent
})(List);
```

As you can see the component is connected to the Redux store. This way we are able to dispatch the actions listed above (```UserLogout``` and ```RequestContent```) and get some properties (fetched child items and the array containing their ids) from the state tree through Reducers predefined in sn-redux.

#### Create a login component:

*Login.tsx*

```typescript
import * as React from 'react';

export const Login = ({ formSubmit }) => {
    let nameInput, passwordInput;
    const onSubmit = e => {
      e.preventDefault();
      formSubmit(e, nameInput.value, passwordInput.value);
    };
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={e => { onSubmit(e); }}>
          <input type="text" placeholder="loginname" ref={el => nameInput = el} />
          <input type="password" placeholder="password" ref={el => passwordInput = el} />
          <button>login</button>
        </form>
      </div>
    );
  };
```

The login component is a simple stateless component. It is a tiny form with two input fields to let the user give her name and password. After submit it passes the name and password to a function defined in the parent component which will dispatch the login action.

#### Finalize the App component

*App.tsx*

Install [react-router-dom](https://reacttraining.com/react-router/web) and import it into your App.tsx

```
npm install --save react-router-dom
```

```typescript
import * as React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginState } from '@sensenet/client-core';
import { Actions, Reducers } from '@sensenet/redux';
import './App.css';
import List from './List';
import { Login } from './Login';

const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '50%'
  }
};

interface AppProps {
  loginState: LoginState;
  login: Function;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: any) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  formSubmit(e: Event, email: string, password: string) {
    this.props.login(email, password);
  }
  render() {
    return (
      <div style={styles.container}>
        <Route
          exact={true}
          path="/"
          render={routerProps => {
            const status = this.props.loginState !== LoginState.Authenticated;
            return status ?
              <Redirect key="login" to="/login" />
              : <List />;
          }}
        />
        <Route
          path="/login"
          render={routerProps => {
            const status = this.props.loginState !== LoginState.Authenticated;
            return status ?
              <Login formSubmit={this.formSubmit} />
              : <Redirect key="dashboard" to="/" />;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, match) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet)
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    login: Actions.userLogin,
  })(App));
```

The App component is completed with routing to handle the redirect to the content list when the user is logged in and to the login form if she is not. This component is also connected to the store to get the user's current login state - which helps the app where it should be redirected - and to get the login action itself.

#### Add router to index.tsx

*index.tsx*

```typescript
...
import {
  HashRouter as Router
} from 'react-router-dom';
...
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
...
```

#### Add jwt authentication to the app

*index.tsx*

```typescript
...
import { JwtService } from '@sensenet/authentication-jwt'
...
const _jwtService = new JwtService(repository);
...
```

![login](/img/posts/react-app-login.png)

![list](/img/posts/react-app-contentlist.png)

After restarting the project you can see that you have a not too stylish but working application. It has login and logout functionality and it lists some fetched content from the repository. The rest is up to you! :) The above mentioned stuff is only the tip of the iceberg.