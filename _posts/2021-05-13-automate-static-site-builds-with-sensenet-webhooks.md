---
title: "Automate static site builds with sensenet webhooks"
author: [herflis]
image: "../img/posts/automate-site-builds-wall-e.jpg"
tags: [webhooks, integration, build, deployment, netlify, gatsby, travis ci]
redirect_to: https://www.sensenet.com/blog/2021-05-13-automate-static-site-builds-with-sensenet-webhooks
---

Integration is a key aspect of digital projects, since preferably, all services used in a project should be connected and work together seamlessly. With sensenet webhooks and the built-in webhook templates it's super easy to achieve such goals. Let's see how!

---

## What is a webhook

In short, using a webhook is a great way for your application to receive events or notifications from a service.

<<<<<<< HEAD
In terms of sensenet it means your repository can send notifications if something happened with a content. You can configure these webhook subscriptions as you wish, you can set what type of content, which subtree, and what specific events to work with and of course you can set the scope of the data (payload) to be sent.

Webhooks can not only notify your app about what happening in your content repository, but also builds up connection between sensenet and your favorite external services. They can be used in many very different cases from sharing information in social media about content changes till rebuilding static websites automatically.

## Triggering static site builds

Once you've setup a static site that pulls in your content during the build process, you're ready to configure webhooks that will be triggered when you are working with content in your repository. The next example teach you how to setup webhooks to trigger builds and deployments of static sites on Netlify, but this is just an example. sensenet of course provides you various other options for Heroku fans, Travis CI users and Gatsby Cloud subscribers among others. Check currently available templates [here](https://docs.sensenet.com/integrations/webhook). Webhook templates helps you create webhooks subscription for specific external services with just a few steps, by filling only a few required fields.

## Configuring a Netlify build hook

First, go to your static site on Netlify and create a build hook for sensenet (it can be found under Site > Site settings > Build & Deploy > Build hooks). This will be url that builds up the connection between your repository and the static site.

<p align="center">
<img src="/img/posts/netlify-build-hook.jpg" alt="Netlify build hook">
=======
In terms of sensenet it means your repository can send notifications if something happens with a content. You can configure these webhook subscriptions as you wish, you can set what type of content, which subtree, and what specific events to work with and of course you can set the scope of the data (payload) to be sent.

Webhooks can not only notify your app about what's happening in your content repository, but also builds up connection between sensenet and your favorite external services. They can be used in many very different cases from sharing information in social media about content changes till rebuilding static websites automatically.

## Triggering static site builds

Once you've setup a static site that pulls in your content during the build process, you're ready to configure webhooks that will be triggered when you are working with content in your repository. The next example teach you how to setup webhooks to trigger builds and deployments of static sites on Netlify, but this is just an example. sensenet of course provides you various other options for Heroku fans, Travis CI users and Gatsby Cloud subscribers among others. Check currently available templates [here](https://docs.sensenet.com/integrations/webhook). Webhook templates help you create webhooks subscription for specific external services with just a few steps, by filling only a few required fields.

## Configuring a Netlify build hook

First, go to your static site on Netlify and create a build hook for sensenet (it can be found under Site > Site settings > Build & Deploy > Build hooks). This will be the url that builds up the connection between your repository and the static site.

<p align="center">
<img src="/img/posts/netlify-build-hook.png" alt="Netlify build hook">
>>>>>>> master
</p>

Then create a new webhook through sensenet admin ui (Settings > Webhooks) choosing Netlify template:

<p align="center">
<<<<<<< HEAD
<img src="/img/posts/netlify-webhook-template.jpg" alt="Netlify build hook">
</p>

There are two required fields on the form to fill out: *Name* and *Netlify build hook URL* (the url you've created above at Netlify Build and Deploy page). You can leave all other fields at default (you can change them at any time later) and thats it.
=======
<img src="/img/posts/netlify-webhook-template.png" alt="Netlify build hook">
</p>

There are two required fields on the form to fill out: *Name* and *Netlify build hook URL* (the url you've created above at Netlify Build and Deploy page). You can leave all other fields at default (you can change them at any time later) and that's it.

<p align="center">
<img src="/img/posts/excited.gif" alt="excited">
</p>
>>>>>>> master

By default, this webhook will:

- Trigger a Netlify build
- Triggered when something is happened with a **File** type content under **/Root** container
- Triggered on all available events (Create, Modify, Delete, Checkout, Draft, Approve, Pending, Reject)

<p align="center">
<<<<<<< HEAD
<img src="/img/posts/new-netlify-webhook.jpg" alt="Netlify build hook">
</p>
=======
<img src="/img/posts/new-netlify-webhook.png" alt="Netlify build hook">
</p>
>>>>>>> master
