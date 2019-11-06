---
title:  "Working with built-in Actions in sensenet using React and Redux"
category: Tutorials
index: 1
version: v7.0
tags: [reactjs, redux, action, actions, javascript, typescript, getting started, step by step]
description: Step-by-step tutorial about adding actions to an app with sensenet, Reactjs and Redux.
---

# Working with built-in Actions in sensenet using React and Redux

## Prerequisites

Before starting with this tutorial check the previous one about [the basics of creating a React App with sensenet](/docs/tutorials/starting-out-with-reactjs/) that helps you to define your sensenet client repository and redux store and connect them with your components which are the key parts of adding actions to your App.

## About sensenet Actions in general

Most of the operations done on Content in sensenet is governed via Actions. An Action is basically a command, instructing the system to use a specific component, to display, delete or modify the Content item requested.

There are a couple of Actions in sensenet that can be invoked through OData REST API. This way the above mentioned operations can be executed through ajax requests. If you're interested in deep in these OData Actions and Functions check the [docs](/docs/built-in-odata-actions-and-functions/) but you don't have to deal with them if you're using sensenet client libraries like sn-redux.

## Predefined actions is sn-redux

One of the main purposes of the sn-redux library was to create a set of redux actions and reducers upon the built-in sensenet actions to handle the basic operations like creating, changing or deleting content in the content repository. Using these predefined stuff you don't have to deal with ajax requests and responses, only dispatch Actions and use the built-in Reducers in sensenet's Redux store to subscribe their changes. All the [built-in sensenet Actions](https://community.sensenet.com/docs/built-in-odata-actions-and-functions/) that are implemented as OData Actions are added as Redux Actions to sn-redux. There's a list of the available actions and how to use them in the [sn-redux API docs](https://community.sensenet.com/api/sn-redux/modules/actions.html) and if you are interested in the built-in Reducers in-deep check a previous post about [sensenet's Redux store](https://community.sensenet.com/blog/2017/09/20/refactoring-sensenet-redux-store).

## Adding and using a built-in action in your App

To use a built-in action import @sensenet/redux to your component:

```tsx
import { Actions } from '@sensenet/redux'
```

Then you are able to reach all the actions that are defined in sn-redux's Actions module

<div style='text-align: center'>
<img src="/img/posts/chooseAction.gif" alt="Choose Action" title="Choose Action" />
</div>

### 1. Beautify the app a bit

If you've completed the previous tutorial too and want to try out actions in the same app you might be interested in make it a bit more usable and prettier with a few small things. Adding material-ui and using its predefined ui components helps us to create the content list more readable and usable without unnecessary custom configurations and styling. So install material-ui:

```
npm install --save material-ui@next material-ui-icons
```

Import material-ui provider, theme creator and a color palette:

```tsx
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import lightBlue from 'material-ui/colors/lightBlue'

```

Create a material-ui theme for your app:

```tsx
const muiTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
  },
})
```

Wrap your main component (in this case this List component) into ```MuiThemeProvider``` with your theme:

```
...
<MuiThemeProvider theme={muiTheme}>
...
</MuiThemeProvider>
...
```

Import Card and related components to wrap the list:

```tsx
...
import Card, { CardHeader, CardContent } from 'material-ui/Card';
...
<Card elevation={4}>
  <CardHeader title="Content list" />
  ...
  <CardContent>
...
```

Import the necessary components in the List related components:

```tsx
import List, {
  ListItem
} from 'material-ui/List';
```

Rename your List component to eliminate name collision (e.g to MyList).

```tsx
...
class MyList extends React.Component<ListProps, {}> {
  ...
}
...
export default connect(mapStateToProps, {
  ...
})(MyList);
...
```

Change ```ul``` to ```List``` and ```li``` to ```ListItem```

```tsx
...
{ids.length === 0 ? 'Empty list' :
  <List>
    {ids.map((id, index) => {
      const content = children[id];
      return <ListItem key={index}>{content.DisplayName}
            </ListItem>;
    })}
  </List>
}
...
```

Last but not least import the ```Button``` component and change the logout ```button``` to it:

```tsx
import Button from 'material-ui/Button'
...
<Button
  variant="raised"
  onClick={e => this.handleLogoutClick(e)}
  color="primary"
>
  logout
</Button>
...
```

### 2. Adding deleteContent action to the content list

Demonstrating how to add a built-in action to your app I chose delete. So the next tasks are adding a delete icon to every listitem, add a click event handler and execute delete action if the icon is clicked.

First import ```ListItemSecondaryAction```, ```IconButton``` and ```DeleteIcon``` and place the icon into the ```ListItem```

```tsx
import List, {
  ListItem,
  ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete';
...
<ListItem key={content.Id}>
  {content.DisplayName}
  <ListItemSecondaryAction>
    <IconButton aria-label="Comments">
      <DeleteIcon />
    </IconButton>
  </ListItemSecondaryAction>
</ListItem>
```

<div style='text-align: center'>
<img src="/img/posts/items-with-deleteicon.png" alt="Items with delete icons" title="Items with delete icons" />
</div>

Add ```deleteContent``` to the component:

```tsx
...
export default connect(mapStateToProps, {
    ...
    deleteContent: Actions.deleteContent
})(MyList);
...
```

To make it connect to the store and dispatchable add ```deleteContent``` as property of the MyList component too:

```ts
interface ListProps {
    ...
    deleteContent: Function;
}
```

So that you can call the delete action simply in the onclick event handler of the delete icon and since it is connected to the store it will automatically change data of the reducers. Add call a custom ```handleDeleteClick``` method with the clicked content's Id as an input param.

```tsx
...
<IconButton
  aria-label="Comments"
  onClick={e => this.handleDeleteClick(content.Id)}
>
  <DeleteIcon />
</IconButton>
...
```

Create ```handleDeleteClick``` method and call the previously added deleteContent action with the given Id. The second input param (```true```) means that the content will be immediately deleted, if it is not given or it is set to false the content will be moved to the trash instead.

```tsx
...
handleDeleteClick(id: number) { 
  this.props.deleteContent(id, true);
}
...
```

Since this tutorial uses only basic content from the content repository (for example the listed content items are the children of the Default_site) we have to mention here that you have to check the permission settings of the user which is used in your app (e.g. to let the user delete a content she should have Delete permission set to allowed on the content). It is a tutorial so if you want to solve this problem quickly add the actual user to the Administrators group.

If you click on the delete icons of one of the content now and check the log on the browser console you can see that ```DELETE_CONTENT``` and then ```DELETE_SUCCESS``` is dispatched and since the component is refreshed if the data is changed the list is automatically refreshed and the deleted content is gone.

<div style='text-align: center'>
<img src="/img/posts/after-delete-log.png" alt="Log after delete" title="Log after delete" />
</div>

### 3. Using a built-in Reducer

You can count not only on the built-in Actions but you can take the sensenet store's predefined Reducers too. As I mentioned above there's a blog post about the [structure and using of sensenet's Redux store](https://community.sensenet.com/blog/2017/09/20/refactoring-sensenet-redux-store) so if you are interested more in how it is built-up and what and how can be used by you in your app check it.

To give a quick example on using the built-in reducers we will add a progress indicator to the list while the listitems are fetching. To achieve this we have to use the ```getFetching``` method from sensenet store's Reducers which is actually a method that returns the value of the ```isFetching``` Reducer that is set to true when the fetch request is sent and set to false when the response is get regardless of whether it was a success or failure.

If you check the logger on the console and open the state tree you can see ```isFetching```.

<div style='text-align: center'>
<img src="/img/posts/isfetching.png" alt="isFetching Reducer" title="isFetching Reducer" />
</div>

To subscribe to its changes you have to add the ```getFetching``` method to your List component into mapStateToProps and as a property too:

```ts
...
interface ListProps {
  ...
  isFetching: boolean;
}
```
```tsx
...
const mapStateToProps = (state, match) => {
    return {
        ...
        isFetching: Reducers.getFetching(state.sensenet.children)
    };
};
...
```

### 4. Add a custom reducer related to deleteContent action

Of course you are able to create custom Reducers related to built-in Actions. To demonstrate this we will add feedback functionality that will inform user when deleting a content was successful.

First we have to create a custom root Reducer for our application which will be another top level Reducer in the state tree with sensenet's root Reducer. Create a Reducer.ts file in your projects *src* folder.

Create your root Reducer:


```ts
import { combineReducers } from 'redux'

export const myApp = combineReducers({
    
})

```

Create a Reducer that will contain a message with the Name of the content in the state tree that was requested to remove and name it *message*.

```ts
...

export const message = (state = '', action) => {
    switch (action.type) {
        case 'DELETE_CONTENT_SUCCESS':
            return `${action.payload.d.results[0].Name} was successfully deleted`
        default:
            return state
    }
}
```

That means that if the ```DELETE_CONTENT_SUCCESS``` Action is dispatched the *message* Reducer's value will be set to a string with the Name of the content which was deleted. The Reducers default value is an empty string and when another Action is dispatched it doesn't change its value.
To see it in action we have to add ```message``` to the root Reducer:

 ```ts
...

export const myApp = combineReducers({
    message
})

```

And we have to combine our root Reducer with sensenet's top level one in the index.tsx:

```tsx
...
import { myApp } from './Reducers
...
const myReducer = combineReducers({
  sensenet,
  myApp
})
```

Now when you refresh you app in the browser you can see in the logs on the console that your newly added Reducer is in the state tree and its value is an empty string.

<div style='text-align: center'>
<img src="/img/posts/customReducer.png" alt="Custom Reducer" title="Custom Reducer" />
</div>

Check what happens if you delete an item:

<div style='text-align: center'>
<img src="/img/posts/message-content-isdeleted.png" alt="Content is deleted message" title="Content is deleted message" />
</div>

To display the message we will use material-ui's Snackbars component that will popup a small dialog with the message from the state tree. Import it to the List.tsx

```tsx
...
import Snackbar from 'material-ui/Snackbar';
...

```

We will hold the information if the snackbar is opened or closed in the component state so define an interface with property ```snackbarOpen``` and set this interface as the MyList components state:

```tsx
interface ListState {
    snackbarOpen: boolean
}

class MyList extends React.Component<ListProps, ListState> {
  ...
```

In the constructor of the MyList component we have to set the state's default values so put the following into the constructor of the component:

```tsx
...
class MyList extends React.Component<ListProps, ListState> {
    constructor(props: any) {
    ...
    this.state = {
      snackbarOpen: false
    };
}
...
```

Add Snackbar component with the following configuration to the MyList component:

```tsx
...
<MuiThemeProvider theme={muiTheme}>
  <Card elevation={4}>
  ...
  </Card>
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={this.state.snackbarOpen}
    onClose={this.handleClose}
    autoHideDuration={3000}
    message=''
  />
</MuiThemeProvider>
```

So the Snackbar will appear at the top in the center, will be automatically hidden after 3000 ms and display a message that is now an empty string but we will fill it with the text saved in the state tree. We also have to add a method that handles closing event. Add the following to the component:

```tsx
...
handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  this.setState({ snackbarOpen: false });
}
...
```

To connect the actual message text with the Snackbar we have to add a new method to Reducers to get the current message. So add the following to the Reducers.ts:

```ts
export const getMessage = (state) => {
    return state.message
}
```

To use it in your component import ```getMessage```, add it to mapStateToProps of the component and also as property to ```ListProps```:

```ts
...
import { getMessage } from './Reducers';

interface ListProps {
  ...
  message: string;
}
```
```tsx
const mapStateToProps = (state, match) => {
    return {
      ...
      message: getMessage(state.myApp)
    };
};
```

Then set ```message``` property as the value of the *message* attribute of the Snackbar:

```tsx
<Snackbar
  ...
  message={<span>{this.props.message}</span>}
/>
```

Our last task now is to connect the snackbar opening when a content is deleted successfully. We have to add a statement into the components ```componentDidUpdate``` where we can compare the previous and the actual values of the component props so that when the message text is changed the ```snackbarOpen``` property's value in the state is set to *true*. Since the value of the Snackbars *open* attribute is set to get its value from the component state's ```snackbarOpen```, it will display in the exact time, when the message is ready so when the content is successfully deleted.

<div style='text-align: center'>
<img src="/img/posts/deleteContentMessage.gif" alt="Content is successfully deleted" title="Content is successfully deleted" />
</div>
