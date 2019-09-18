---
title: 'How to deploy to netlify'
category: Tutorials
index: 0
version: v7.0
tags: [netlify, deploy, frontend]
description: This tutorial show you how to deploy your sensenet spa to netlify.
---

# How to deploy to netlify

In this guide we will walk through how to deploy your sensenet spa to [netlify](https://netlify.com).

## Hosting Setup

There are two ways you can host your site.

1.) [Git Repository Setup](#git-repository-setup)

2.) [Upload Site Folder](#upload-site-folder)

## Git Repository Setup

We recommend you to use our GitHub template that you can find here [sn-react-typescript-boilerplate](https://github.com/SenseNet/sn-react-typescript-boilerplate). _If you don't know how to use a template repository check this [article](https://help.github.com/en/articles/creating-a-repository-from-a-template)_.

After you have your own git repository:

1. Log in to [netlify](https://netlify.com)
2. Add a new project
3. Choose continous deployment with GitHub - this will take you to GitHub to authorize netlify
4. You should see your repositories listed, choose your newly created git repository
5. Set the build command to `yarn run build` and the Publish Directory to `bundle`
6. You are all set 🎉

## Upload Site Folder

It is pretty much the same as in the git repository setup. Use our boilerplate template and clone it locally.

1. Run `yarn` to install dependencies
2. Run `yarn build` to build the project - you will see a new folder called _bundle_ is created
3. Log in to [netlify](https://netlify.com)
4. Drag and drop the bundle folder to the bottom of the site
   ![drag and drop netlify](/img/posts/drag-n-drop-netlify.png)
5. You are all set 🎉
