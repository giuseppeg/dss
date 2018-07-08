<img width="32" alt="screen shot 2018-07-08 at 5 45 52 pm" src="https://user-images.githubusercontent.com/711311/42420995-f0441c16-82d6-11e8-984d-2a194d1fe570.png"  role="presentation" />

# Deterministic Style Sheets ✨

[![Build Status](https://travis-ci.org/giuseppeg/dss.svg?branch=master)](https://travis-ci.org/giuseppeg/dss)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

DSS (Deterministic StyleSheets) is a component-oriented CSS authoring system that compiles to high-performance atomic CSS classes-based stylesheets.

DSS works like CSS Modules except that styles resolution is deterministic, CSS is compiled to atomic classes and the final bundle is very small.

Read more about how it works on the [website](https://giuseppeg.github.io/dss/).

[**warning, this is an experimental project and might not be production ready**]

The repo comes with `examples`:

```shell
cd examples/cli
# or cd examples/webpack
npm install
npm start
```

## Features

* ⚡️ Automatic compilation to Atomic CSS classes and high-performance stylesheets
* 🆎 Deterministic styles resolution: styles are always resolved in application order
* 📦 Scoped Styles
* 🌎 Framework and language agnostic
* 🤝 Preprocessors friendly
* 💻 Standalone CLI and support for Webpack 3 and 4 with automatic vendor prefixing
* ✂️ CSS the Best Parts

## Contributing

DSS is developed as a monorepo thanks to lerna and yarn workspaces. Everything you need to know is in this repository.

Since this is a side project and I don't want to burn out, I decided to disable the GitHub issues.

### Bugs

If you find a bug please submit a pull request with a failing test or a fix, and good description for the issue.

### Features request

Please submit a pull request with an RFC where you explain the why and the how you think this feature is useful. I'd be glad to start a conversation from there before moving on to implementation. Also please let me know if you would be up to implement the feature you are suggesting.

### My code is crap

I know, it is a side project and I didn't sweat the details. I am more than happy to discuss about a complete rewrite if the project becomes popular.

## LICENSE

MIT
