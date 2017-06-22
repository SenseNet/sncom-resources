---
title: What is a headless cms anyway?
author: borsi
image: "/img/posts/headless-cover.jpg"
tags: [enterprise content management, headless cms, api, restful]
---
The term 'headless cms' has been rising in popularity for a while now. But why the hype and what is it all about?
---
## What is a headless CMS?
First, it's worth mentioning how traditional "monolithic" cms's work. Wordpress or Drupal are usually included in this category. This means that the modal layer is tightly coupled with the view, and the creators of the platform provide you with a templating engine with which you can implement your frontend. So in this model you'd have:

- a Database at the "bottom", where you store your content
- an App, with a UI that lets you [Create, Replicate, Update and Delete][25358749] this content
- and a View layer which displays the content (usually by using templates)

  [25358749]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete "CRUD"


 Older versions of [sensenet ECM][ed1adc41] are also following this philosophy, although the platform is more geared towards enterprise features, such as [content versioning][a19fba28] and [collaboration][206457f6].
 Thus, the 'E' in ECM is for Enterprise.

  [ed1adc41]: https://www.sensenet.com/product "Sensenet ECM Product features"
  [a19fba28]: http://wiki.sensenet.com/Versioning_and_approval "Versioning and approval"
  [206457f6]: http://wiki.sensenet.com/Workspace "Workspaces in sensenet ECM"

This is why you could do something like this in [sensenet 6.x][9f950a61], or using [sn-webpages 7.x][46ac6b1f]:
```html
<div class="sn-layout-head-left">
  <div class="sn-logo">
    <a href="/" title='<%=HttpContext.GetGlobalResourceObject("Portal", "SenseNetDemoSiteTitle")%>' class="snPortalengine">
    </a>
  </div>      
</div>
```
<p align="center">
*fig 1. ~ The template is tightly coupled with the data it needs to present.*
</p>

  [46ac6b1f]: https://github.com/SenseNet/sn-webpages "Sn-webpages"
  [9f950a61]: http://community.sensenet.com/docs/how-to-install-sn6/ "Install sensenet 6.5"

In a headless CMS (or ECMS for that matter), though, the backend does not care about how the content is displayed. It just returns with the data needed for the frontend through a RESTful API.

<p align="center">
![Headless vs Coupled](../img/posts/headless-cms.png)

*fig 2. ~ Traditional (coupled or monolithic CMS) model vs. Headless CMS*
</p>

## So is sensenet ECM a headless or a coupled CMS?
<p align="center">
![Why not both?](http://i.imgur.com/KgXtawP.gif)
</p>

As mentioned earlier, using sn-webpages, you can have a full-featured ECMS solution, complete with a built-in UI. We are also working on a **new** UI, using [React][b3358601] and [Aurelia][b56bd31b] while fully utilizing [sensenet ECM's OData layer][71579091], which provides a complete, flexible and extendable [RESTful API][f9c00a93].

  [71579091]: http://community.sensenet.com/docs/built-in-odata-actions-and-functions/ "Built-in OData actions and functions"
  [f9c00a93]: http://community.sensenet.com/docs/odata-rest-api/ "OData REST API"
  [b3358601]: https://github.com/SenseNet/sn-controls-react "React controls for sensenet ECM"
  [b56bd31b]: https://github.com/SenseNet/sn-controls-aurelia "Aurelia controls for sensenet ECM"

In the same time, you can either start writing your own library to latch on the OData endpoints of a sensenet ECM at hand, **or** you can try out our [fabulous and open source sn-client-js, the javascript client library for sensenet][de7f7b73].

  [de7f7b73]: https://github.com/SenseNet/sn-client-js "Sn-client-js"

In the end, what you get is something like this<sup><a name="footnote1">1</a></sup>:

**After installing our library from npm, you can import it** and connect to your sensenet ECM instance.
```javascript
import { Repository, Config } from 'sn-client-js';

let repository = new Repository.SnRepository({
            RepositoryUrl: 'https://my-sensenet-site.com',
            ODataToken: 'OData.svc',
            JwtTokenKeyTemplate: 'my-${tokenName}-token-for-${siteName}',
            JwtTokenPersist: 'expiration'
        });
```
<p align="center">
*fig 3. ~ Configuring the repository object.*
</p>


**Once done, you can start doing stuff with content.**
```javascript
repository.Content.Create('Root/Path', {
	Name: 'MyFolderName',
}, SN.ContentTypes.Folder);
```
<p align="center">
*fig 4. ~ Creating a Folder content in the repository from afar.*
</p>

As simple as that. We are at the beginning of our roadmap and we need your feedback in making a better ECMS development platform. So feel free to chime in either through [e-mail][1e51c7fb], [gitter][bd86dc61] or by sending a [homing pigeon][e3d316af]. We are (I, especially) eager to hear your voice.

  [1e51c7fb]: helloATsensenetDOTcom "Say hello!"
  [bd86dc61]: https://gitter.im/SenseNet/sensenet "Chat with us!"
  [e3d316af]: http://i.imgur.com/yldRjme.gif "His name is Károly."

***
<sup>[1](#footnote1)</sup>: You can achieve a similar experience using the [.NET client for sensenet ECM.][55d8492d]

  [55d8492d]: https://github.com/SenseNet/sn-client-dotnet "Sn-client-dotnet"
