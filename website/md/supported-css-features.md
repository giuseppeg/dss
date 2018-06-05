# CSS features and rules ✂️

**DSS supports a subset of CSS that makes it possible to compile down to atomic CSS classes**.

Generally DSS allows **single class selectors** however there are some exceptions where a higher specificity is actually necessary, this is the case for **states and at-rules which are supported as well**.

Below is a comprehensive list of features:

### Supported

* Class selectors: `.foo`
* CSS states: `:hover`, `:active`, `:focus`, `:visited`, `:focus-within`, `:checked`, `:disabled`, `:required` etc.
* At-rules like `@media`, `@supports`, `@keyframes`, `@font-face`
* State-combinator-selector like `:hover > .foo` or `:focus + .bar`
* `:nth-child`, `:first-child` etc.

### Not supported

* Element, id, universal and attribute selectors
* Descendants selectors `.foo .bar`
* Class-combinator-class selectors `.foo > .bar`
* Not shallow (complex) selectors like `:hover > .foo + .bar`
* Pseudo elements like `:after` and `:before` since regular elements can be used instead
* `:has()`, `:matches()`, `:not()` etc.
* Short hand properties like `background`, `border` need to be written in the long form. In the future we might allow them and unwrap them for you automatically ... thank you for your patience 🙏
* `!important`

