# atomic-css-stats

Provides stats on `.css` files size (gzipped and brotli). Also compiles the styles to atomic CSS classes for compariaon.

```
npm i -g atomic-css-stats
```

Accepts a space separated list of paths or URL to css files.

```
acss-stats ./file.css https://example.com/bundle.css [...]
```

example:

```
$ acss-stats https://abs.twimg.com/a/1532484778/css/t1/twitter_core.bundle.css

 ==============
|| https://abs.twimg.com/a/1532484778/css/t1/twitter_core.bundle.css
 ==============

Size: 182.72 KB
Gzipped size: 34.08 KB
Brotli size: 28.95 KB

Atomized size: 61494
Gzipped atomized size: 15.48 KB
Brotli atomized size: 12.83 KB
```


## Contributing

This package is part of the [DSS monorepo](https://github.com/giuseppeg/dss#contributing).

## License

MIT
