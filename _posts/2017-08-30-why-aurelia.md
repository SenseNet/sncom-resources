---
title:  "Why Aurelia?"
author: gallayl
image: "/img/posts/tw_sn_aurelia.png"
tags: [ui, front-end, aurelia, controls, components, view controls, field controls, forms, responsive, typescript]
---

It's a quite challengeing task to choose a front-end toolset nowadays, especially for a [development platform](/blog/2017/05/31/product-goals). Our concept with sensenet 7+ is to support a wide range of front-end developers as far as possible with our [sn-client-js](https://github.com/SenseNet/sn-client-js) package that can be integrated into almost every [NPM](https://www.npmjs.com/) development pipeline. So far so good. But when it comes to build our new UI components we really had to choose between the modern libraries and frameworks. At this point we've decided to build on two of them for [SPA development](https://www.sensenet.com/for-customers/use-cases/single-page-application). I will explain why we've chosen [Aurelia](http://aurelia.io/) besides [React](https://facebook.github.io/react/).

---

### When we have to choose? Anyway, why? - Beyond the shared features

We have quite so much sensenet specific client side features that can be made *framework independent* like user session management, content operations, querying. They work well in the core of our front-end library called *sn-client-js*. Some features - like templating, data binding or routing - are implemented in each and every framework and they are based on different concepts. We have just started to develop our component packages that depend on templating and data binding, that's where and why we have to create the two new packages - [sn-controls-aurelia](https://github.com/SenseNet/sn-controls-aurelia) and [sn-controls-react](https://github.com/SenseNet/sn-controls-react). They will contain *Aurelia / React* specific components and will use the core functionality from *sn-client-js*.

#### View- and Field Controls - The next layer of our building blocks

We have two major types of controls: Field controls and View controls. Field controls represent a specific field type (let's say a simple short text) while view controls represent a content's full view for a specific action (for example an *Edit* view of a user) and is built from FieldControl components based on the generated schema from *sn-client-js*. In the first round, we have to develop these controls as *Aurelia components*.

Aurelia has a clear concept of how a [component](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/1) should look like. The view is separated from the view-model. View templates are written in a standard-based HTML extended with a very simple binding language and the view-model can be written in ES2015 or Typescript. If you take a look at the [example from the Aurelia hub](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/) you can notice that there is only a little piece of framework-specific code in the template and nothing (!) in the view-model.

One of the cool things about Aurelia components is that you don't need to dive deep in the framework. If you have a basic knowledge about HTML and Typescript you only have to learn how *data binding* works to create basic components. There are a lot of more complex possibilities however, like [dynamic composition](http://aurelia.io/hub.html#/doc/article/aurelia/templating/latest/templating-dynamic-ui-composition), [value converters](http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-value-converters) and [computed properties](http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-computed-properties).

#### Injecting dependencies

As I mentioned, we will use dependencies from our other library called sn-client-js. Sometimes it can be difficult to use something universal *in a specific framework or library*, maybe you need additional decorators (therefore additional unnecessary layers) or sometimes this is even *nearly impossible* because of the incompatible principles. That's not the case with Aurelia's DI.

Aurelia Services - such as components - are plain Typescript classes. You only have to use the DI decorators *where* you want to use them. Ok, let's take a look at the following snippet:

```ts
import { Repository } from 'sn-client-js';
import { autoinject } from 'aurelia-framework';

@autoinject
export class HelloSnComponent{
    constructor(private readonly repository: Repository.SnRepository) {
        console.log('Hi there, your injected sensenet Repository is:', this.repository);
    }
}
```

All injected services will be singletons by default and that's ok for our Repository object. If you want to configure your repository singleton with more specific options, you can do it from your *main.ts*'s configure:

```ts
  aurelia.container.registerSingleton(Repository.BaseRepository, () => {
    return new Repository.SnRepository(
      {
        RepositoryUrl: 'https://my-awesome-new-sensenet-site-with-aurelia-frontend.org'
      });
  });
```

Aurelia's DI container is also an easy to use but powerful tool that don't need much framework-specific knowledge.

#### Packing together

We want to distribute our controls as an NPM package and Aurelia also have a concept for *plugins*. This part isn't documented well. To get the idea how a plugin works, we had to check the [skeleton-plugin](https://github.com/aurelia/skeleton-plugin) package. The most important thing is the *configure* entry point that sets up the whole plugin.

### The core concepts that I agree with

Creating components, using DI and creating an NPM package is not a big deal, it is doable with each and every framework that we've tested so I try to sum up how Aurelia differs from the others.

#### "A framework should get out of my way"

One of the key part is its unobtrusiveness and it has been taken very seriously. There are some basic conventions (e.g. template syntax, element naming or component lifecycle event naming) and a minimal configuration but most of the time it just helps you get the <i title="it can be a synonym for a word containing 's'... like taSk">job</i> done. It lets you focus on your application (or in our case, a component package) instead of the framework.

#### Quality and performance

Aurelia follows [Semver](http://semver.org/) and there were no breaking changes in the Core APIs since the first stable release. I've started to use Aurelia in the fall of 2016 and there were no upgrade issues since then. I also didn't encounter any performance bottlenecks, even for complex controls and pages.

#### Loosely coupled goodies

However we spoke of Aurelia as a *framework*, it is defined as a "*collection of Modern JavaScript modules*". Each *module* (like the binding, dependency injection or templating) has its own NPM package as well but you are not forced to use all of them. That means you don't have to use e.g. the *aurelia-http-client* module if you have your own module for handling HTTP requests - and that's the case for sn-client-js. We used the router, the validation plugin and the testing packages. Aurelia also has a [VS Code plugin](http://blog.aurelia.io/2016/10/11/introducing-the-aurelia-vs-code-plugin/), a [Chrome Inspector extension](https://chrome.google.com/webstore/detail/aurelia-inspector/ofemgdknaajmpeoblfdjkenbpcfbdefg?hl=en) and a [command line tool](https://github.com/aurelia/cli).

### Room for improvement

However I really enjoy working with Aurelia, there are a few pain points. The first is that the community is much smaller when comparing to for example React or Angular2+ and grows slower than vue.js's community.

There are other things missing, fortunately the Aurelia team has also recognized them and mentioned them in their [2017's new year resolution](http://blog.aurelia.io/2017/01/02/aurelia-2017-resolutions/). The first is server side rendering which is completely missing feature at the moment.
The second is the lack of a suitable ready-to-use component set. There are *bridges* to existing component sets like [Kendo UI](https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge) (that we can't use in an open source project due licensing incompatibility) or [Materialize](https://github.com/aurelia-ui-toolkits/aurelia-materialize-bridge) (we are using it at the moment, but we are not satisfied with it). [Aurelia UX](http://blog.aurelia.io/2016/11/04/introducing-aurelia-ux/) has been announced nearly a year ago but it seems that it is far from complete at the moment.
