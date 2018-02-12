# Deterministic Style Sheets

[warning] The code in this repo is a Proof of Concept for an idea that is still at the validation stage. Feedbacks are welcome -> [@giuseppegurgone](https://twitter.com/giuseppegurgone)

DSS is like Cascading Style Sheets but as the name suggests styles resolution is deterministic.

The repo comes with `examples`:

```shell
cd examples/cli 
# or cd examples/webpack
npm install
npm start
```

You can also see the [example on gh-pages](https://giuseppeg.github.io/dss).

Basically when applying classes the application order matters and styles resolve in order. So:

```js
document.body.innerHTML = `
 <p class="${classNames(a.root, b.root)}">hello</p> <!-- green -->
 <p class="${classNames(b.root, a.root)}">hello</p> <!-- red -->
`
```

Where `a` and `b` are the JSON representations of the ~C~DSS files below:

```css
/* File a.css */

.root {
  color: red;
}
```

and

```css
/* File b.css */

.root {
  color: green;
}
```

[`className`](./src/classname.js) is a simple function that applies the tokens (class names) in a deterministic way.

The concept is similar to CSS Modules and most importantly **is language agnostic (it is not CSS-in-JS)** i.e. you write DSS in `.css` files, compile them and then you can consume the styles in any language (Ruby, PHP, Python etc) that implements the super simple `className` helper.

## Determinism? how?

In order to guarantee determinism we need to restrict the language features.

- Only single classname selectors are allowed:

```css
/* allowed */
.root {
  color: red;
}

/* not allowed */
div { color: red; }
.root .test { color: hotpink; }
.root > .test { color: hotpink; }
```

- No pseudo-elements (for that you can use regular elements):

```css
/* Nein! (not allowed) */
.root:after { color: red; }
```

- Pseudo-classes and at rules (like media queries) are supported but the rules above apply:

```css
/* perfectly fine */
.root {
  color: red;
}

@media screen and (min-width: 3em) {
  .root {
    color: green;
  }
}
```

- Styles are atomic by default

- (Not implemented yet) precise style property resolution i.e. `marginTop` is more specific than `margin`

Most of these ideas come from React Native (for Web). Props to the React Native folks and Nicolas Gallagher. See [this link](https://github.com/necolas/react-native-web/blob/master/website/guides/style.md#how-styles-are-resolved) for more info.

When the builder receives a css file, it converts it to JS using postcss-js. The JS styles are validated and fixed if necessary and passed to the compiler which converts them to atomic css classes (under the hood I am using a fork of cxs which I modified to fit the needs of DSS).

Given the following DSS:

```css
/* test.css */
.root {
  color: blue;
  font-family: monospace;
  font-size: 2em;
}

@media (max-width: 400px) {
  .root {
    color: hotpink;
  }
}

@media (min-width: 600px) {
  .root {
    color: orange;
  }
}
```

The compiler returns:

```json
{
  "root": [
    "dss_rfc3hq-nfznl2",
    "dss_1fqdzl4-tzko9j",
    "dss_48uv78-1x4eueo",
    "dss_fw0eqv-11z5xnj",
    "dss_1n8q6hy-1ysx8fe"
  ]
}
```

Which can be written in `test.css.json`.

Calling `compiler.css()` you can get the resulting CSS. When compiling multiple file you would write to disk the `json` files as you process the `.css` files and **only** at the end dump the `compiler.css()` string into a `bundle.css` file. This will contain the entire app CSS. Since we are using atomic classes its size should be small-ish (remember that with atomic css the file size growth is logarithmic)
