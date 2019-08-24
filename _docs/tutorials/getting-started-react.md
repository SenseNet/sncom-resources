---
title:  "Getting started with sensenet and React"
category: Tutorials
index: 0
version: v7.0
tags: [reactjs, javascript, typescript, getting started, frontend]
description: This tutorial show you how to use sensenet with Reactjs.
---

# Getting started with sensenet and React

## Prerequisites

First of all you need a sensenet instance. You can create your own from GitHub or register at `LINK_LATER`.

## Use our starter

To make things easier, we created a boilerplate app. It contains an example Hello World React SPA with sensenet repository login, written in Typescript. It is a template repository that you can find here [sn-react-typescript-boilerplate](https://github.com/SenseNet/sn-react-typescript-boilerplate). _If you don't know how to use a template repository check this [article](https://help.github.com/en/articles/creating-a-repository-from-a-template)_.

## Install and start
 
After cloning the generated repository run `yarn install` to install the dependecies and when it is finished start the application with `yarn start` command. You will see a login screen where you can type your username, password and repository url.

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
          idOrPath: 1720,
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