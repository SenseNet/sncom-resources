---
title: "Automate static site builds with sensenet webhooks"
author: [molnarm84, huszerlbence]
image: "../img/posts/??????"
tags: [webhooks, integration, build, deployment, netlify, gatsby, travis ci]
redirect_to: https://www.sensenet.com/blog/2021-05-26-whatsup-sensenet
---



---

As a result of our design sprint (back in april), we found that most people don't really like to add any personal details (even an email address) to try out a new solution. This is where a [live demo](https://www.sensenet.com/tryit) comes handy since you don't need to register to be able to check if a product fits to your needs.

<p align="center">
<img src="/img/posts/tryit_page.png" alt="try it page">
</p>

Once this was clear to us we started to gather ideas to understand and make the journey of a user more seamless. We already had every piece for that (website, try it page, example apps, demo repo) however the whole thing did not came together as a smooth experience.

The concept was to connect the example apps to our demo repository and by this, to demonstrate how a simple app works with sensenet.
Since the demo repository already contains every content used by our example apps (images, tasks, events, etc.), we made the connection clearer for our users with links and buttons pointing to app specific content in the repository.

<p align="center">
<img src="/img/posts/linksNbuttons_exampleapp.png" alt="example app link and button">
</p>

We revamped the whole [example apps page](https://docs.sensenet.com/example-apps) on docs site to be more structured and added some texts explaning the logic behind these apps.

As a final step we simplified the access to each part of the experience.
- Example apps can be reached with automatic sign-in, removing every additional steps.
- The demo repository became more accessible as well since everyone can get in through the admin ui with a single click.


The final solution is what we call the demo experience, and we hope that everyone can get a taste of sensenet more easily (without registration 😉😎).
If you already convinced, you can skip this step and get your own repo [here](https://profile.sensenet.com/?redirectToLogin).
