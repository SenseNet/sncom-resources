---
title:  "Getting started with sensenet and React"
category: Tutorials
index: 0
version: v7.0
tags: [reactjs, javascript, typescript, getting started, frontend]
description: This tutorial show you how to use sensenet with Reactjs.
published: false
---

# Getting started with sensenet and React

## Prerequisites

First of all you need a sensenet instance. You can create your own from GitHub or register at `!!LINK_LATER`.

## Use our starter

To make things easier, we created a boilerplate app. It contains an example Hello World React SPA with sensenet repository login, written in Typescript. It is a template repository that you can find here [sn-react-typescript-boilerplate](https://github.com/SenseNet/sn-client/tree/master/examples/sn-react-typescript-boilerplate). _If you don't know how to use a template repository check this [article](https://help.github.com/en/articles/creating-a-repository-from-a-template)_.

## Install and start
 
After cloning the generated repository run `yarn install` to install the dependecies and when it is finished start the application with `yarn start` command. You will see a login screen where you can type your username, password and repository url. You can log in with `!!USERNAME` and `!!PASSWORD`.

![login screen](/img/posts/login-screen.png)

## Load a content from the repository

Say you want to load a file from the repository. It is very easy to do that all you have to do is call load function on the repository.

```typescript
import React, { useEffect, useState } from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import { File } from '@sensenet/default-content-types'
import { useRepository } from './hooks/use-repository'

export const App = () => {
  const repo = useRepository()
  const [file, setFile] = useState<File>()

  useEffect(() => {
    const loadFile = async () => {
      try {
        const result = await repo.load<File>({
          idOrPath: 1720, // This is pointing to a content at /Root/Content/IT/Document_Library/Calgary/SalesTraining.pptx
        })
        setFile(result.d)
      } catch (error) {
        console.log(error.message)
      }
    }
    loadFile()
  }, [repo])

  return (
    <div>
      <CssBaseline />
      <Typography variant="h3" gutterBottom>
        {file ? file.DisplayName : null}
      </Typography>
    </div>
  )
}
```

You may noticed this `const repo = useRepository()` line and wondering what it does. This is your go to solution to list, mutate, get content from the repository. It will give you back the current repository object.


## Create new content

Creating a new content is as easy as loading one. You just have to call the post method on the repository object.

```typescript
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Task } from '@sensenet/default-content-types'
import { useRepository } from './hooks/use-repository'

export const App = () => {
  const repo = useRepository() // Custom hook that will return with a Repository object
  const [newTask, setNewTask] = React.useState('')

  const createTask = async (text: string) => {
    try {
      await repo.post<Task>({
        parentPath: '/Root/Content/IT/Tasks', // This is the place where our content (Task) will be created
        contentType: 'Task',
        content: {
          Name: text,
        },
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={ev => {
        ev.preventDefault()
        createTask(newTask).then(() => setNewTask(''))
      }}>
      <TextField
        id="newTaskInput"
        label="New task"
        value={newTask}
        fullWidth
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
    </form>
  )
}
```