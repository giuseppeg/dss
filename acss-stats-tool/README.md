# atomic-css-stats

Provides stats on `.css` files size (gzipped). Also compiles the styles to atomic CSS classes for compariaon.

```
npm i -g atomic-css-stats
```

Accepts a space separated list of paths or URL to css files.

```
acss-stats ./file.css https://example.com/bundle.css [...]
```

example:

```
$ acss-stats https://abs.twimg.com/a/1531883619/css/t1/twitter_core.bundle.css

 ==============
|| https://abs.twimg.com/a/1531883619/css/t1/twitter_core.bundle.css
 ==============

Size: 182.34 KB
Gzipped size: 34.01 KB

Atomized size: 60 KB
Gzipped atomized size: 15.46 KB
```


## Contributing

This package is part of the [DSS monorepo](https://github.com/giuseppeg/dss#contributing).

## License

MIT
