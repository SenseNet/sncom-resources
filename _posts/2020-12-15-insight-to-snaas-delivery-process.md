---

title: "Insight to SNaaS delivery process"
author: [herflis, VargaJoe]
image: "../img/posts/delivery.jpg"
tags: [deployment, countinuous integration, saas, infra]
redirect_to: https://www.sensenet.com/blog/2020-12-15-insight-to-snaas-delivery-process

---

We are constantly working on new features, fixes and other awesomeness. Let’s see how these new things get to customers.

---

At sensenet, we are working on making the product and our services better with fixes, improvements and new features every day. Since we wanted to provide a predictable and reliable service in addition to being constantly updated and improved we had to work out a process to make the updates fairly frequent and seamless yet valuable. The following article details our delivery system.

# Different skill sets, one common goal

sensenet is designed and developed by a cross-functional team, which means we have to manage and improve multiple code bases developed with different kind of technologies and frameworks. Since sensenet is open-source, most of the source code from the core layer to client packages is shared publicly on [GitHub](https://github.com/SenseNet). Beside source code our text resources (docs and even this blog post) are stored and shared on GitHub as well keeping our work and the whole process open and transparent.

# Bug's life

We're using GitHub not only for versioning and publishing the product source code and the documentation, but also for supporting our teamwork and transparency of our processes toward the customers and the community. Our team is working in a scrumish way along sprints, milestones, releases, epics and issues, and taking advantages of GitHub and [ZenHub](https://www.zenhub.com/) we can share everything with you. The product roadmap, the team backlog and everything we're working on is available, so you can not only follow but also influence the product development process. A bug's lifecycle from detecting it till publishing the fix to the production environment can be easily followed. 

<p align="center">
<img src="/img/posts/bug.jpg" alt="bug">
</p>

# Review and test

Before customers get the fixes and the new features the changes are checked several times on multiple environments. During development automated daily builds provide the possibility of internal testing in staging and pre-production environments. This way we can be sure that when we get to the release all the pieces are working together as they should.

New things are not only reviewed by multiple developers but also tested with automated unit and integration tests and they can only be merged when all the checks were successful. After that the change gets to another test phase which means it becomes published to our test environments. If a change proves reliable during the test phase, it will be included in the next release. We have multiple isolated environments for all the phases (development, test, demo, etc.). In the next section you can see how and when they are updated.

# Releases and the patch day

We publish new releases in every four weeks. Since we have to create new packages for multiple platforms and multiple services at once, we decided to go along with this regularity, because for now it serves product development and customers the best. This way we can be sure that things we release from our hands work well both for SNaaS customers and for the open source community.

We update the production environments (customer repositories, central system, etc.) in every fourth monday, which means it is easy to plan with both fixes and new features. We always share detailed change logs per packages/components, so you can be sure you won’t miss anything.

[Backend updates](https://www.sensenet.com/backend-updates) ⚙

[Frontend updates](https://www.sensenet.com/frontend-updates) 💅

# Everything is isolated

Operating cloud-base content management services requires high-quality security regulations and standards. These thing are extremely important for us too. Individual repositories are totally isolated, which means both database and service layer are separated per repository. This way we can meet today's standards in data security, isolation, scalability and backup, giving us the advantages in terms of security issues and updates.

<p align="center">
<img src="/img/posts/separation.jpg" alt="separation">
</p>

# Whats next

Next year will mostly be about optimizing and automating release, install and deployment processes. So there is still a long way to perfection, but the path is clear. Come and join us in our journey, [request a free sensenet repository](https://is.sensenet.com/Account/Registration?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dspa%26redirect_uri%3Dhttps%253A%252F%252Fprofile.sensenet.com%252Fauthentication%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520sensenet%26state%3D022ed1044fb34dc5aea99fe62069a6df%26code_challenge%3DYmvfTX0N9-Wj6bKfndXk-q7ZVyldVoc1DSLkRQRtgFo%26code_challenge_method%3DS256%26response_mode%3Dquery%26snrepo%3Dhttps%253A%252F%252Fsnover.service.sensenet.com), try the most flexible and versatile headless CMS!

See you in SNaaS! 🚀🎉
