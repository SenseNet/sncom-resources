---

title: "Using your own product - a headless cms case study"
author: [herflis]
image: "../img/posts/dogfood.jpg"
tags: [website, headless cms, case study, project]
redirect_to: https://www.sensenet.com/blog/2020-11-30-using-your-own-product-a-headless-cms-case-study

---

Eat your own dogfood they said. It'll be fun they said...

---

If you followed us, you could have read it a million times already, we are about to launch sensenet in SaaS model which is a huge change from selling a traditional (E)CMS to serve our customer with a cloud-based, headless CMS. These changes not only affected our sales and development company processes but also our communication and at the same time it maked necessary to update our public website. Nothing is simpler, since the product we develop is perfect for creating public websites (among many other things). The old website was built with the previous version of the product which was a complex ECMS, so the time was perfect to not only redesign the site and update content, but for looking through a specific problem at what solution we offer to it.

# One repository to rulem them all

The public website is one of the main pillars of a company's communication and must convey the same clear message along with all the other channels. Technically it means you have to create and maintain tons of content day to day, collaborate on them with the other editors and publish them on multiple platforms on different devices. Content makes the world go 'round, but fortunately in sensenet everything is a content and being a real content-based solution for all the business problems it offers the perfect mixture for projects that are about sharing information.

The long and the short of it is that we started the project with content, working out the model and the sctructure. This step is the core of such projects and it is seemlesly easy with sensenet content types. Taking advantages of type inheritance and with the endless possibilities of expanding and combining these types we could freely shape the content model till it fitted our needs.

# Collaboration + security = faster development

At the launch we had 25+ custom content types and 500+ contents and they were created not only to vary metadata (fields) but also for handling security issues. Based on the tree-based content structure we could separate content branches for developers and editors based on their different permissions levels. This way they could work simultaneously on the project without distrupting each other’s work. 

As with any company, collaborative work is a key for us and with using a content-based solution as a base of our website redesign project we also learn how fast we can working together. As the model and the sctructure was ready, both the content editors and the developers could start working on their part: editors produced the content, developers could setup and build the single page application using sensenet's super-flexible REST API.

<p align="center">
<img src="/img/posts/rte.png">
</p>

# One content, multiple platforms

Want to multiply the number of readers of your content without the headache of mutiply them per platform and device? Use a headless cms, use sensenet! 😊 We've built up both website and mobile version of our website's, our blog and even our in-house adminitration system on contents (articles, files, blog posts) that are shared acrossed this solutions without having to multiply them. An endless wealth of possibilities, isn't it? If we figure out someday, that we want a mobile app, we can built it upon the same repository, with the same contents using the same API

<p align="center">
<img src="/img/posts/sncom-mockup.png">
</p>

# SNaaS for the future

Our previous website made with the old product was built on a lot of old technologies both server and client-side. These technologies were decent and modern in their time, but as time gose on, every technology, framework and library gets older, loses its support and makes the old project unsustainable. If we stick to traditional CMS' then this usually means that the project needs to be rebuilt from scratch from content to user interface. We have run into this problem many times, but we won’t get any more. sensenet as a headless cms gives us the freedom of changing the ui, adding new features or integrate it with anything wihout having to touch the repository and the backend. sensenet's REST API is futureproof and while we hope that [Next.js](https://nextjs.org/) chosen as the basis for our website will stay supported and popular for a long time, but if not, we only have to replace the UI.

# Sum up: Why we chose sensenet? (and not because it is our solution🙂)

- **short deadline**: the whole project (including ux and ui designing phase) had to be completed in a month and a half,
- **productivity**: developers and content editors could work simultaneously
- **multi-platform**: a content should be created only once, but can be published in multiple forms
- **gentle learning curve**: developers can choose their preferred technology to connect with sensenet
- **no technical know-how for the editors**: they only have to use a WYSIWYG editor on the admin surface
- **permissions for users in different roles**: editors and developers can access only the appropriate content branches
- **flexible type system**: content can be supplemented with various types of metadata