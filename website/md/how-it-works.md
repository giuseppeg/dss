# Deterministic styles resolution 🆎

DSS' mission is to provide confidence when authoring CSS. This is done by resolving styles (selectors) in a deterministic way based on the application order of each class name. We think that it is very important to get a predictable result when applying two classes to an element.

Determinism can be achieved thanks to atomic CSS classes. DSS converts declarations to atomic CSS classes. This is done by hashing each property and value and building a class name like the following:

```
dss_<hash(property)>-<hash(value)>
```

For example `color: red` is always hashed to:

```
dss_rfc3hq-169mlyl
```

and `color: green` to:


```
dss_rfc3hq-5rjgso
```

The first part of these class names is the same: `dss_rfc3hq-` and this is information is used to resolve styles.

Given two CSS rules:

```css
.foo {
  color: red;
}

.bar {
  color: green;
}
```

DSS compiles them to the following class names:

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

Once we have this information we can write a simple `classNames` helper that accepts a comma separated list of class references (`foo` and `bar` in the example) and merges them right to left:

```js
className(styles.foo, styles.bar)

// dss_rfc3hq-5rjgso

className(styles.bar, styles.foo)

// dss_rfc3hq-169mlyl
```

This is similar to how `Object.assign` works in JavaScript, except that we are merging lists of atomic CSS classes.
