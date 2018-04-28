const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const localIdentName = process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]-[hash:base32:5]'
const mode = process.env.NODE_ENV || 'development'

const config = {
  mode,
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve("./dist"),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('dss/webpack'),
            query: {
              localIdentName
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "index.css",
    }),
  ]
}

module.exports = config
