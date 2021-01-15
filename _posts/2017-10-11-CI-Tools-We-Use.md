---
title: "CI Tools we use"
author: gallayl
image: "/img/posts/ci_tools_wrench.jpg"
tags: [CI, Continuous integration, NPM, Travis, CodeCov, Deployment]
redirect_to: https://www.sensenet.com/blog/2017-10-11-CI-Tools-We-Use
---

CI means you have to merge small changes continuously instead of working with large diffs at the end of the development cycle.
 
---

![ci_tools_k2](/img/posts/ci_tools_k2.gif, 'ci tools')


### Before you dive in

 If you want to be sure that your merge won't be causing any trouble there are several tasks to do - like creating a sandbox, building and testing on multiple environments, comparing code coverage results, etc... That's a soul grinding work for a developer - and should be automatized.

We use GitHub nowadays and we work with pull requests. These pull requests are playing a key role in the terms of CI tooling, most of the tools are working with [pull request status checks](https://developer.github.com/v3/repos/statuses/). This means when you create a pull request, the tools will check if the branch is up to date, it can be built, the tests are OK, etc...

### Front-end and Node.JS tools

We have several NPM packages and the goal is the same. We want to know if the changeset *can be merged safely*. We want to build, test and run some static code analysis. In more detail we want a sandbox environment with Node.JS and the latest available dependencies installed, we want our *typescript* sources and tests to be compiled to *js*, run our *mocha/jest* unit tests and process the reported coverage from *nyc*.

#### Travis

[Travis](https://travis-ci.org/) is the most important CI tool we use. You will need only a github account with a repository, a working codebase and a small configuration script. It's responsible for creating a sandboxed environment, downloading the codebase, install dependencies, build, run the tests and report the coverage. A build can contain multiple *jobs*, that means you can test your code in multiple environments. We're testing our packages on Node.js 6 (LTS), 7 and 8 in a *[trusty](https://docs.travis-ci.com/user/reference/trusty/)* environment. 

#### Keeping things green

If I had to choose two CI tools, it would be Travis and [GreenKeeper](https://greenkeeper.io/). Greenkeeper helps to avoid the *dependency hell*. Really. It scans the NPM repository and if a new version of one of your project dependencies is published, it will create a feature branch for that and runs the other CI tools. If the new version is *covered by your version range* and the checks fails, it will raise an issue, otherwise it just deletes the branch. If the new version is not covered but the tests are OK, it will create a *pull request* and you will be sure that the dependency won't break your build. Just take a look at the screenshot from this morning and think about it if you had to do it manually :) 
![ci_tools_greenkeeper](/img/posts/ci_tools_greenkeeper.png)


#### Covering code

We use [Codecov](https://codecov.io/) to measure our code coverage rate and check it per pull request. You can monitor coverage historically, compare between branches, even browse in annotated files. It's clean, simple, and it's easy to use with Travis.

#### Codacy

[Codacy](https://www.codacy.com) is a highly customizable code analyzer tool that can analyze your source code in terms of compatibility, security, unreachable code loops and code style.

### Backend - Visual Studio Team Services

[VSTS](https://www.visualstudio.com/team-services/) is the de facto standard for automatized builds and CI/DI with .NET. It can be used for *almost* all of the scenarios above, and not *just* for .NET. At the moment we are using it mostly for automatized web deployment and sandbox environment creation. 
