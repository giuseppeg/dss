# Usage 🔋

To its core DSS is a simple compiler that takes [regular CSS files](/supported-css-features) and generates atomic CSS classes.

## Pre-requisites

The compiler is written in JavaScript and therefore you will need [Node.js](https://nodejs.org) v7.6+ installed on your machine.

Please read the [how it works](/how-it-works) page before you continue.

## dss-compiler

**required** - The DSS compiler.

Add the compiler to your project:

```
npm i dss-compiler
```

The easiest way to use the DSS compiler is via the CLI tool which accepts a [`glob`](https://www.npmjs.com/package/glob) to match your css files to compile, a `dist` folder and an optional bundle filename (by default it would write to `index.css`):

```
dss ./components/*.css ./build --bundleName bundle.css
```

This will generate a `bundle.css` in the `build` folder. You can then include this bundle to your app using a simple `link` tag.

DSS will also write the atomic CSS classnames mappings to JSON files to the same `build` folder. For example when compiling `components/button/styles.css` DSS writes `build/components/button/styles.css.json`. This file contains mappings of selector-array of atomic classes.

Optionally DSS can generate JavaScript modules instead of JSON files. Prefer this option if you are consuming the mappings in a JavaScript application since this allows you to import from `components/button/styles.css` right away.

```
dss ./components/*.css ./build --bundleName bundle.css --outType js
```

### dss-compiler as a library

The compiler can be used as a library in two modes: `singleton` and `multi instance`. The multi instance version is for when you are using asynchronous compilations eg. in a webpack loader.

```js
const fs = require('fs')
const dss = require('dss-compiler')

const src = `
  .btn {
    color: red
  }
`

dss.singleton(src).then({ locals, css, flush } => {
  fs.writeFileSync('./component1/styles.css.json', , JSON.stringify(locals))
  fs.writeFileSync('./bundle.css', flush())
})
```

For more details see the [atomic-css](/atomic-css) page.

## dss-classnames

This package implements the _classnames helper_ required to consume the DSS styles. Right now it contains only a JavaScript implementation, however we are planning to add implementations in other languages and always welcome user contributions! If you want to implement this helper in another language you can find more details on the [classnames helper page](/classnames-helper).


```
npm i dss-classnames
```
Which you can use similarly to the popular [classnames](https://www.npmjs.com/package/classnames) library:

```js
import classNames from 'dss-classnames'
import styles from './component1/styles.css'


const test =
`<div class="${classNames(styles.btn, styles.anotherClass, 'a-custom-class')}">
  hi
</div>`
```

This helper accepts a mix of DSS tokens and regular CSS classnames and makes sure that styles are resolved deterministically. It accepts a list of comma separated classes and you can even have conditions.

```js
classNames(styles.btn, isDisabled && styles.btnDisabled)
```

When using DSS with React you might want to pair this helper with [`babel-plugin-classnames`](https://www.npmjs.com/package/babel-plugin-classnames) which imports `classNames` for you automatically and lets you write this instead:

```js
import styles from './component1/styles.css'

<div className={[styles.btn, styles.anotherClass, 'a-custom-class']}>hi</div>
```

## dss-webpack

DSS comes with a webpack loader and plugin and since it works similarly to CSS Modules can leverage existing tools like `extract-text-webpack-plugin` (webpack 3) and `mini-css-extract-plugin` (webpack 4) to allow you to easily compile your styles.

For more details see the dedicated [webpack page](/webpack).

## dss-next

If you use [Next.js](https://nextjs.org) we prepared a simple plugin for you to seamlessly integrate DSS.

```
npm i dss-next
```

In `next.config.js`

```js
const withDSS = require('dss-next-dss')

const localIdentName =
  process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]--[hash:base32:5]'

module.exports = withDSS({
  dssLoaderOptions: {
    localIdentName,
    filename: 'static/index.css'
  }
})
```

You will then need to add a `link` to `/_next/static/index.css` in `pages/_document.js`

```js
<link rel="stylesheet" href="/_next/static/index.css" />
```
