# The classNames helper 📇

Similarly to CSS Modules, DSS generates mappings of `selector`-`array of atomic classes` and writes this information to a `json` file:

```JSON
{
 "foo": [
    "dss_rfc3hq-169mlyl"
  ],
  "bar": [
    "dss_rfc3hq-5rjgso"
  ]
}
```

Once we have this information we can write a simple `classNames` helper that accepts a comma separated list of class references (`foo` and `bar` in the example) and **merges them right to left**:

```js
classNames(styles.foo, styles.bar)

// dss_rfc3hq-5rjgso

classNames(styles.bar, styles.foo)

// dss_rfc3hq-169mlyl
```

This is similar to how `Object.assign` works in JavaScript, except that we are merging lists of atomic CSS classes.

By merging these lists of atomic CSS classes right to left we can guarnatee that the final subset of classes applied to an element is predictable regardless of where the styles are defined.

If you use JavaScript you don't need to implement the `classNames` helper since we provide a ready to use package https://www.npmjs.com/package/dss-classnames

## Implementing a classNames helper

You might want to take a look at the JavaScript implementation of classNames:

https://github.com/giuseppeg/dss/tree/master/classnames
