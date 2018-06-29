# webpack 📦

DSS comes with a webpack loader and plugin and since it works similarly to CSS Modules can leverage existing tools like `extract-text-webpack-plugin` (webpack 3) and `mini-css-extract-plugin` (webpack 4) to allow you to easily compile your styles.

```
npm i --save-dev dss-webpack
```

`dss-webpack` exports a plugin which optimizes your final bundle after extraction, and a loader that compiles your styles.

## webpack 3

For webpack 3 you might want to use `extract-text-webpack-plugin`

```js
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DSSwebpackPlugin = require('dss-webpack')

const localIdentName =
  process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]--[hash:base32:5]'

const config = {
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            // This plugin is similar to the css-loader for CSS Modules
            {
              loader: DSSwebpackPlugin.loader,
              query: {
                // optional, adds readable classnames
                localIdentName,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: path.resolve('./src/index.html'),
    }),
    new ExtractTextPlugin('index.css'),

    // Important! Optimizes your DSS styles - always include this.
    new DSSwebpackPlugin({
      test: /index\.css$/,
    }),
  ],
}

module.exports = config
```

## webpack 4

For webpack 4 you might want to use `mini-css-extract-plugin`

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const DSSwebpackPlugin = require('dss-webpack')

const localIdentName =
  process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]--[hash:base32:5]'
const mode = process.env.NODE_ENV || 'development'

const config = {
  mode,
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // This plugin is similar to the css-loader for CSS Modules
            loader: DSSwebpackPlugin.loader,
            query: {
              // optional, adds readable classnames
              localIdentName,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: path.resolve('./src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),

    // Important! Optimizes your DSS styles - always include this.
    new DSSwebpackPlugin({
      test: /index\.css$/,
    }),
  ],
}

module.exports = config
```

## with SASS

The webpack configuration looks exactly the same as the previous ones except that now we test for `scss` files and run the `sass-loader` before the dss loader.

```js
rules: [
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        // This plugin is similar to the css-loader for CSS Modules
        loader: DSSwebpackPlugin.loader,
        query: {
          // optional, adds readable classnames
          localIdentName,
        },
      },

      // Compile sass before using DSSwebpackPlugin.loader
      {
        loader: 'sass-loader',
        options: {
          sourceMaps: false,
        },
      }

    ],
  },
]
```

## with PostCSS

The webpack configuration looks exactly the same as the previous ones except that now we run the `postcss-loader` before the dss loader.

```js
rules: [
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        // This plugin is similar to the css-loader for CSS Modules
        loader: DSSwebpackPlugin.loader,
        query: {
          // optional, adds readable classnames
          localIdentName,
        },
      },

      // Compile the CSS with PostCSS
      {
        loader: 'postcss-loader',
        options: {
          // Configure here the plugins or
          // omit this option if you have a `postcss.config.js` file
          plugins: () => [
            require('postcss-easy-import')(),
            require('postcss-simple-vars')({ variables: () => require('./theme') })
            // ...
          ],
        },
      }

    ],
  },
]
```
