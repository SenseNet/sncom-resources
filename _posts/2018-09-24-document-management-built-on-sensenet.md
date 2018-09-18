---

title:  "Document Management built on sensenet"
author: kultsar
image: "../img/posts/dms-1-0-ui.png"
tags: [DMS, UX, javascript, client packages]

---
intro here
---

## Origin story

*“Begin at the beginning,” the King said, very gravely, “and go on till you come to the end: then stop.”*

We began developing DMS – our document management solution –  as an MVC roughly about a year ago, this is why: sensenet is a headless content management platform (https://community.sensenet.com/blog/2017/07/05/what-is-a-headless-cms) where the backend does not care about how the content is displayed. If you are a frontend developer, this gives you freedom of choice in what tools you use and how you want to implement your solutions. To give you guidance, however, we also wanted to create an example implementation for a real-life business need. Feedback from partners and users indicated that a simple web based file management would be a good start. And then, DMS was born.

Use it, or build your own
… Alice had begun to think that very few things indeed were really impossible.
We also knew that that you will need reusable building blocks and tools as well, so in the meantime we created small, lightweight frontend packages (https://community.sensenet.com/blog/2018/02/21/scoped-packages) that are optional, but considerably speed up frontend development with sensenet. DMS, on the other hand, has outgrown the original MVC, so it just seemed logical that we generalize many of its functions in our underlying packages.
Now you can:
•	Use DMS as is: Install SN7 backend packages, then add the DMS frontend package on top of it, and just use. It will take care of dependencies.
•	Use the generalized packages: Install SN7 backend packages, then build your solution with the underlying building blocks we also used in DMS.
Both ways you are future proof: it will be easy to upgrade to our new releases, and you will easily get support from the core team or from the community.
The user experience
…‘and what is the use of a book,’ thought Alice ‘without pictures or conversations?’
Besides classic web based file management functions we were serious about creating an ergonomic, intuitive, modern and appealing user interface. Additionally, since we have sensenet in the background, we could build on already existing, useful functions such as:
… checking content in or out:

![name](/img/posts/path.png "float text")
 
… publishing, which can include approving or rejecting:

![name](/img/posts/path.png "float text")

… creating and restoring major and minor versions:

![name](/img/posts/path.png "float text")

As an example, we also integrated our recently published standalone document viewer (https://community.sensenet.com/blog/2018/08/22/docviewer) solution: 
 
And of course, you can also share folders or files:

![name](/img/posts/path.png "float text")

You can do it too
'Why,' said the Dodo, 'the best way to explain it is to do it.'
This is what you need to build your solution:
•	Install backend packages (https://community.sensenet.com/docs/install-sn-from-nuget/) and make the most of sensenet’s content repository (https://community.sensenet.com/docs/content-repository/) and any of its its optional extensions. Among others they already know about content operations such as create, upload, modify, delete, copy and move, handling metainfo and storing binaries, managing indexing and search, powerful and fast security, background task management for preview generation, and even versioning and approval and related functions, such as version history and restore.
•	Install the frontend packages (https://community.sensenet.com/blog/2018/02/21/scoped-packages) you need.
•	Use the JavaScript/Typescript client API the frontend provides to rapidly develop your project.
Remember, its completely free (https://www.sensenet.com/product/licensing/sense-netlicensingguide).
