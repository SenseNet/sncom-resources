---
title: "Insight to SNaaS delivery process"
author: [pusztaienike]
image: "../img/posts/docviewer_refactor.jpg"
tags: [refactor, document viewer, saas, docviewer, document]
redirect_to: https://www.sensenet.com/blog/2020-01-15-docviewer_updates
---

🌇 “Cities grow, cities evolve, cities have parts that simply die while other parts flourish; each city has to be renewed in order to meet the needs of its populace…” 🌆 -Grady Booch

---

The basic purpose of code refactoring is to make the code more efficient and maintainable. Of course we are about to keep our code up-to-date and optimize its performance so we thought that it is time to clean a lot of complicated lines of code in the document viewer. ♻️

# Logic ✏️✂️🚀🐛👭

The main goal was to simplify the code of the document viewer. There were some magic numbers, unnecessary props, useEffects that runs many times, so we had to go deep to rethink the logic. After planning we had to try to rebuild the function based on the existing code. Although we basically try to avoid code repetition, sometimes it is even necessary to break down existing logic according to its function. As a result, Thumbnails and PageList became two separate components for example. ✏️

Not only the code has become simpler but also features. For example, rotating pages is only a form of visual representation, so it is unnecessary to store this information, it can be reproduced anytime. SearchBar widget become redundant too, because all browsers can search on page, so we removed this from selectable widgets. ✂️

We've put a great emphasis on improving performance as well. Sometimes we can achieve significant results by making small changes, such as taking advantage of the opportunities provided by our framework: replacing useEffect with [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo). 🚀

Finding and fixing bugs in the software is also important in case of a full review like this. Of course, during the re-rolling of this function, we also encountered many cases where a different solution had to be applied than we originally planned. 🐛

The point is that we tried to look at the possibilities from the user's point of view and we were trying to make this feature user friendly.👭

# Style 🎨

We will release another new option to users, which is overwriting styles from a higher level. It is very important to enable users to shape our solution for their own needs. So far there have been relatively few opportunities for it, but we are changing that now:

You can define you style on your own and you can pass it to the component itself, like:

```javascript
const useDisabledStyle = makeStyles(() =>
  createStyles({
    iconButton: {
      "&:disabled": {
        opacity: 0.26,
      },
    },
  })
);

const disabledStyle = useDisabledStyle();
```

If you use typescript you can also see the possible classes what you can overwrite:

<p align="center">
<img src="/img/posts/docviewer/overwrite_styles.png">
</p>

Our designer is constantly coming up with new solutions, the style is constantly changing, we can never consider it ready. 🎡

# New features 🎉

For those who have been using sensenet for a long time, it may not be new, but if you have just joined, you may come across the keywords redaction, highlight and annotation for the first time.

**Redaction** 🔳

Sometimes when you are working with sensitive information 🗝️ in documents you don’t want to share them with everyone, just who has the appropriate privileges. But what if you would like to share the other parts of the document? This is the case when you need to apply redaction.
With this feature you can hide parts of your doc with a black rectangle. If another user would like to see it, it is only possible if she/he has the permission for it, otherwise the page will be full with black squares. 🙈

<p align="center">
<img src="/img/posts/docviewer/redaction.gif">
</p>

**Highlight** ⭐

The purpose of highlighting is to draw attention to important information in a text. Highlighting is effective because it asks the reader to check the important parts first, and then gives an effective way to review other later. 📑

<p align="center">
<img src="/img/posts/docviewer/highlight.gif">
</p>

**Annotation** 💬

An annotation is extra information associated with a particular point in a document or other piece of information. It can be a note that includes a comment or explanation or anything what you would like to share with the audience in a designated place in the text. 📋

<p align="center">
<img src="/img/posts/docviewer/annotation.gif">
</p>

**Usage**

The operation of these three shapes is relatively the same with some differences:
- you can create them with a click-move-click method (check gifs) ✏️
- you can delete them with `backspace` or `delete` keys (except annotations) and also if you do `right-click` on the shape and click on the delete button on the popout. 🚮
- you can also drag and drop the shapes if you would like to move them to another position on the page. ↖️↘️
- right-clicking on shapes opens different popups, for the redactions and highlights only a delete button has appear, but for annotations a toolkit with different configuration options 🔧 where you can set line height, font size, font bold, font color and make your text to italic style.

<p align="center">
<img src="/img/posts/docviewer/right-click.png">
</p>

# Whats next 📅

In the upcoming releases we will make these updates public, don't forget to check out the [changelog](https://www.sensenet.com/frontend-updates)!

See you in SNaaS! 🚀🎉
