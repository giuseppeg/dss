# Usage 🔋

To its core DSS is a simple compiler that takes [regular CSS files](./supported-css-features) and generates atomic CSS classes.

## Pre-requisites

The compiler is written in JavaScript and therefore you will need [Node.js](https://nodejs.org) v7.6+ installed on your machine.

Please read the [how it works](./how-it-works) page before you continue.

## dss-compiler

**required** - The DSS compiler.

Add the compiler to your project:

```
npm i dss-compiler
```

The easiest way to use the DSS compiler is via the CLI tool which accepts a [`glob`](https://www.npmjs.com/package/glob) to match your css files to compile, a `dist` folder and an optional bundle filename (by default it would write to `index.css`):

```
dss ./components/*.css ./build bundle.css
```

This will generate a `bundle.css` in the `build` folder. You can then include this bundle to your app using a simple `link` tag.

DSS will also write the atomic CSS classnames mappings to JSON files to the same `build` folder. For example when compiling `components/button/styles.css` DSS writes `build/components/button/styles.css.json`. This file contains mappings of selector-array of atomic classes.

### dss-compiler as a library
