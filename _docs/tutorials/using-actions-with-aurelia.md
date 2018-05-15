---
title: "Using sensenet actions with the client packages and Aurelia Framework"
category: Tutorials
index: 1
version: v7.0
tags: [aurelia, client packages, typescript, actions, step by step, delete]
description: Step-by-step tutorial with sensenet actions using the client packages and Aurelia framework
---

# Using sensenet actions with the client packages and Aurelia Framework

## Predefined actions

The @sensenet/client-core package contains shortcuts for common actions like copy, move or delete, [security](https://community.sensenet.com/api/@sensenet/client-core/classes/security.ht) and [versioning](https://community.sensenet.com/api/@sensenet/client-core/classes/versioning.html) related actions. Calling them is as simple as calling an async method, like the *checking out* a content in the following example:

```ts
const checkedOutContent = await this.repository.versioning.checkOut(myContentId);
```

## A simple example: deleting a content

### Updating a template

We modify the template of the *content-list* component and add a button for the delete action as the fist step:

```html

<template>
  <div>
    <input readonly value.bind="currentContent.Path" />
    <ul>
      <li>
        <a click.delegate="navigateUp()">[..]</a>
      </li>
      <li repeat.for="child of children">
        <a click.delegate='navigate(child)'>${child.DisplayName || child.Name}</a>
        <button click.delegate="delete(child)">Delete</button>
      </li>
    </ul>
  </div>
</template>
```

### Calling the Delete action

Calling a sensenet action is straightforward: You have to call and *await* an async method. We can do that in the view-model of the *content-list* component, adding the following *delete()* method:

```ts
async delete(item: GenericContent) {
// ask for confirmation
    if (confirm(`Really delete ${item.DisplayName || item.Name}?`)){
        const deleteResponse = await this.repository.delete({
            idOrPath: item.Path,
            permanent: false,
        });
        // reload the children
        this.currentContentChanged(this.currentContent);
    }
}
```
The method will called when clicking in the delete button. It will ask for confirmation, execute the custom action and trigger a reload.

## Calling custom OData action

As sensenet is a highly customizable development platform, you can [create your own](https://community.sensenet.com/docs/tutorials/how-to-create-a-custom-odata-action/) custom OData actions
An action usually have a name, a method type (GET or POST if it modifies data), a content in the repository as context, specified *parameters* and a specified *response type*.

There is an API endpoint for calling custom actions in the [core](https://www.npmjs.com/package/@sensenet/client-core) client package called [executeAction](https://community.sensenet.com/api/@sensenet/client-core/classes/repository.html#executeaction)

If you are using Typescript you can call your actions using the generic parameters: ``TBodyType`` is the type definition for the data you should post and ``TReturns`` will be the response model.

You can also create a wrapper method for your actions - that can be responsible for parameter parsing, content type tightening or just simplify an action call. The following example shows how you can wrap your custom action called "MyAction" that is accessible on User contents and returns a list of users.

```ts
interface MyActionBody {
    myActionParameter: string
}

const myCustomUserAction = (user: User, myActionBody: MyActionBody, oDataOptions: IODataParams<User>) =>
    myRepository.executeAction<MyActionBody, IODataCollectionResponse<User>>({
        idOrPath: user.Id || user.Path,
        method: 'GET',
        name: 'MyAction',
        body: myActionBody,
        oDataOptions,
    })
```

Now you can simply call and await the ``myCustomUserAction`` method to trigger your action.
