---
title:  "Overview"
source_url: 'https://github.com/SenseNet/sensenet/blob/master/docs/concepts/snaas-overview.md'
category: Concepts
version: v7.0.0
tags: [overview, sensenet as a service, snaas, content repository, admin surface, admin] 
description: This document is an overview of the sensenet as a service model.
hidden: true
---

# Overview

sensenet is a content services platform mainly for developers and development companies. A basic setup of sensenet has three top level parts: a **content repository** that is the storage and service layer, an **application** that uses the content of the connected content repository through API calls and **sensenet admin surface** that helps you do common content managements tasks or setup and keep your system up to date.

![SNaaS Overview](/img/overview.png "Overview of the sensenet as a service model")

The *content repository* in this case is created, hosted and supported by us, you don't have to bother neither with the installation process nor with the later upgrades, just to complete a few-click registration. After getting the url of your content repository instance you can start exploring the capabilities of sensenet immediately. Go to [https://www.sensenet.com/sign-up/](https://www.sensenet.com/sign-up/) to create your free account.

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        Are you a freshly registered sn content repository owner? Let us help you exploring the new home of your content with <a href="/docs/create-and-explore-your-repository" title="Create and explore your sensenet repository"><strong>this tutorial</strong></a>.
        If you have not decided to register yet, you should definitely check out our <a href="/docs/demo/1000-content-demo" title="1000 content demo repository"><strong>demo</strong></a> repository, filled with various demo content.
    </p>
</div>

[admin.sensenet.com](https://admin.sensenet.com) is a single page application built on the top of sensenet using the same Rest API and helps you with common content management tasks. It is a common administration interface for different types of user jobs providing tools from simple content editing tasks till content type editing or system configurations. Since everything is a content in sensenet, all types of content could be managed on a unified user interface helping you feel familiar with every part of the system immediately.

![admin.sensenet.com](/img/admin-ui-light.png "admin.sensenet.com")

The admin surface is a client that is built up on sensenet and uses the same Rest API just like your own **custom application**. Therefore, you could replicate the functionality that app provides by making simple API calls, so it could help you how to connect sensenet content repository with third-party systems. 

<div class="docs-highlight">
    <i class="fa fa-info"></i>
    <p>
        Take the next step getting familiar with <a href="/docs/concepts/content-management-through-rest-api"><strong>Content management through REST API</strong></a> or do one of the <a href="/docs/tutorials"><strong>tutorials</strong></a> and create your first client app built upon sensenet.
    </p>
</div>
