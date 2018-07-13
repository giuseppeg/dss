import Playground from '../components/playground'

# DSS ✨

DSS (_Deterministic StyleSheets_) is a component-oriented CSS authoring system that compiles to high-performance _atomic CSS classes_-based stylesheets.

DSS works like CSS Modules except that supports [a subset of CSS](/supported-css-features) that can be compiled to atomic CSS classes. Thanks to atomic CSS classes styles can be resolved in a deterministic way based on their application order:

```html
<!-- the text will be green -->
<div class="red green">hello</div>

<!-- the text will be red -->
<div class="green red">hello</div>
```

<Playground />

## Features

* ⚡️ Automatic compilation to Atomic CSS classes and high-performance stylesheets
* 🆎 Deterministic styles resolution: styles are always resolved in application order
* 📦 Scoped Styles
* 🌎 Framework and language agnostic
* 🤝 Preprocessors friendly
* 💻 Standalone CLI and support for Webpack 3 and 4 with automatic vendor prefixing
* ✂️ CSS the Best Parts

## What people say about DSS

*"yep, definitely thinking in the same direction there"*<br/>
– Chris Eppstein (on DSS and CSS Blocks), creator of Compass, CSS Blocks and core team SASS.


*"I think you're onto something big here"*<br/>
– Phil Plückthun, core team styled-components.

*"I'd pay for some kind of library that allows me to give specificity to my classes based on the order they get applied to a component"*<br/>
– Federico Zivolo, author of Popper.js and the popular Bootstrap Material Design theme.

## How it works

Thanks to the DSS compiler and a simple `classNames` helper, DSS styles are resolved in deterministic way that respects the application order.

DSS is language agnostic. Styles are authored in static `.css` files, compiled down to atomic CSS classes for smaller bundle size and then consumed in any language (Ruby, PHP, Python etc) that implements the super simple `classNames` helper.

Given two class names that set the `color` to `red` and `green`:

```css
.foo {
  color: red;
}
.bar {
  color: green;
}
```

when applied to an element one class wins over the other depending on the order in which the classes are applied:

```html
<!-- the text will be green -->
<div class="foo bar">hello</div>

<!-- the text will be red -->
<div class="bar foo">hello</div>
```

Such a feature makes it possible to tell with **confidence** which rules apply or overrule others at any given point in time.

Read more about [how it works](/how-it-works).

This website is styled with DSS and its source code is available on [GitHub](https://github.com/giuseppeg/dss/tree/master/website). We also have a handful of [examples](https://github.com/giuseppeg/dss/tree/master/examples).
