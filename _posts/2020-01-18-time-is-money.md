---

title: "Time is money: Performance improvements in admin ui"
author: [pusztaienike]
image: "../img/posts/time_is_money.jpg"
tags: [performance, webpack, bundling, bundle, accessibility, lighthouse]
redirect_to: https://www.sensenet.com/blog/2020-01-18-time-is-money

---

How long will you wait for a website to load before you give up and go somewhere else? Five seconds? Ten seconds? Apparently, nearly half of us wouldn't wait three seconds.

---

In our busy world every minute is a waste of time if we should spend it with waiting. Of course we know that, and we are about to constantly improve performance to not waste your time.

## Divide it like Moses 🌊 

Check this pull request here: [#532](https://github.com/SenseNet/sn-client/pull/532)

As you already know we use webpack for module bundling in sensenet. Till that time, we did not care too much about the bundle size,
but our app is growing and growing so we had to change our mind and take some steps forward.<br/>
The size of resources was ~57.3 MB and we had two opportunity for reduce:

1. We would use the [create-react-app](https://github.com/facebook/create-react-app) and its standard webpack configuration<br/>
2. We would create our own webpack config(s).<br/>

Because we use monaco editor and decorators in our code it is hard to match with create-react-app rules, so we have chosen the second option and divided our webpack configuration to 3 parts:

- one is for development purposes (webpack.dev.js)
- one is for production code (webpack.prod.js)
- and the remain is for both, commonly used settings (webpack.common.js)

We tried to follow the suggestions of create-react-app in this way as well.
Finally, we could reduce the resources size from ~57.3MB to ~8.1 MB with deploying 'real' production code with all its advantages like tree-shaking and source map removal. The transferred data became ~4.3 MB from ~12.7 MB so I declare with all confidence that it is worth the effort.

In the future, we would like to follow the changes what we can easily do with [RelativeCiAgent](https://relative-ci.com/). When we merge something to our develop branch RelativeCiAgent provides us a really transparent report of our bundle size.

<p align="center">
<img src="/img/posts/relativeCiAgentReport.png">
</p>

I really like it when I have nothing to do, RelativeCiAgent do the 'dirty work' for me. 😁
Thank you for the authors and all the contributors!

We can also check the size during development as well. We just added a new line for the package.json:<br/>
`"build:stats": "webpack --config webpack.prod.js --profile --json > stats.json"`<br/>

After generating the `stats.json`. We can make this file more transparent with [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)

<p align="center">
<img src="/img/posts/webpack_visualizer.gif">
</p>

## Quality is not an act, it is a habit.

Check this pull request here: [#550](https://github.com/SenseNet/sn-client/pull/550)

For improving the quality of our app, we run [Lighthouse](https://developers.google.com/web/tools/lighthouse) on the admin surface's landing page. It was interesting to see what we missed during development. Okay these problems were small ones, but you know: "Many a little makes a mickle!"<br/>

<p align="center">
<img src="/img/posts/lighthouse_before.png">
</p>

Our main problem was that we used a gif file as a progress indicator, and it was full screen sized, a huge one. We decided to change it to one of the built-in loaders in material-ui. We also fixed some small bugs, like:
- Accessible name of `Button` elements,
- `alt` attributes of `Image` elements,
- `[lang]` attribute of the `<html>` element,
- missing `meta` tags on the document (meta description etc.).

Our final results after the fixes were the following:
<p align="center">
<img src="/img/posts/lighthouse_after.png">
</p>

We were pretty proud of it. 😉 

## What's Next?

Our goal is to make the user interface useful and usable for every user, including those who have a slow internet connection. It is a continuous operation, we cannot say that 'We are done with it'. We would like to be better and come up with new ideas. For now we optimize our app for desktop only, but in our short-term plan we would like to do more for mobile as well.

So you know: "Time is money..", and we really appreciate your time.

<p align="center">
<img src="/img/posts/infinity_and_beyond.jpg">
</p>
