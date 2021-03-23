In this article we will delve into the dynamic import of JavaScript modules and the lazy loading of React components. We will examine through a real example how they work and how we can make our web application faster by reducing our initial bundle size. It is common to use TypeScript for its static type system. We often need types from our dependencies, but it can ruin our hardly achieved code splitting if we don't pay attention. I will show you a fairly new syntax to avoid it.

## Dynamic import

Dynamic import has reached the stage 4 of the TC39 process and is included in the ECMAScript 2020 language specification. Webpack, currently the most popular JavaScript module bundler, already support it since the v2 which was released in 2017. It makes it possible to load parts of your application at runtime. Maybe you use a heavy dependency only on specific cases or on a multi-language page you want to load only the desired localization files based on the user's preferences. This way you can make your site more performant and lightweight.

The syntax of the dynamic import is quite simple, it just extend the the import keyword by making it possible to use it followed by parentheses with the path of your dependency in between.

```javascript
import('module/example').then(example => console.log(example.default)
```

> This sytax looks like a function call, but it is not. Import is not defined as a function, it is a specific operator.

The code above loads the module at runtime and logs its default export to the console. This is just a basic example, you can use anything exported by the module in the callback function or load multiple modules at once with Promise.all.

All popular modern bundlers support it and they automatically split dynamically imported modules to a separate bundle. All of the import statements of that module or dependency should be dynamic across your project to work as expected.

## React.lazy

It is also possible to import React components dynamically since React 16.6.  Reacz.lazy is a function which will handle your dynamic import and make a renderable React component from it. It has one parameter, which is a function returning the import:

```javascript
const MyComponent = React.lazy(() => import('./MyComponent'))
```

Module bundlers will handle dynamic imports as `React.lazy` parameter the same as described above.

It is important to know that the component must be the default export of the imported module. If it is not given (e.g. a third party library exports it by name), you can create a module to handle it in your application:

```javascript
export { Component as default } from 'react-library'
```

You can wrap the lazy loaded component by React Suspense with a fallback component. It will render the fallback while the dynamic component is loading.

```jsx
<Suspense fallback={<Loader />}>
	<MyComponent />
</Suspense>
```

## Importing types

Previously TypeScript tried to omit type-only imports from compiled JavaScript code, but it can not be accurately recognized and removed. In some edge cases the import still compiled to your code even if it is only used as a type. They added a new syntax to the language at version 3.8 to prevent this problem:

```javascript
import type { SomeType } from "external-dependency";
```

This way you can use external types confidently without pulling in a new dependency to your main bundle. You can read more about this in the TypeScript [release note](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports).

## Real life example

At Sense/Net we are developing a headless CMS called sensenet. The part of our product is the admin-ui which makes it easy for customers to manage their content. It is a complex React application with a lot of internal and external dependencies. Over time our bundle became huge, so we started to optimize it with multiple techniques. One of these is the better usage of lazy loading pages and dependencies.

The biggest improvement was achived by lazy loading Monaco Editor. It is a code editor which powers Visual Studio Code. It is around 2 MB of parsed JavaScript code and only used on 3 or 4 pages by our application. You definitely don't want to load it for pages where it is not used.

We applied all the above methods to separate its code to a chunk and load it only on-demand. We use it in multiple isolated parts of our application so we had to make these changes for each import of the editor.

An interesting part was the usage of imported functions. We created a new React state which stores the return value of the function. We load and call the function inside a useEffect and show a loader as long as the state gets value.

```javascript
export const Loader = (props) => {
  const [uri, setUri] = useState()

  useEffect(() => {
    ;(async () => {
      const { monaco } = await import('react-monaco-editor')
      setUri(monaco.Uri.parse(`sensenet:File`))
    })()
  }, [])

  if (!uri) {
    return <Loader />
  }
  ...
}
```

## Final thoughts

In conclusion, JavaScript and its ecosystem give us a lot of opportunity to improve the performance of our applications. One of the most important aspect of user experience is speed, so it is definitely worth the effort. Hopefully in the future it will be even more easier to achieve such optimization.

If you need help or have any feedback, feel free to comment here.

Thanks for reading my article! If you enjoyed it give a star to [sensenet](https://github.com/SenseNet/sn-client) on GitHub. I hope that you'll [try our headless CMS for free](https://is.sensenet.com/Account/Registration).
