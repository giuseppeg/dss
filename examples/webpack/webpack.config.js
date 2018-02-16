const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve("./dist"),
    filename: '[name].js',
  },
  module: {
    rules: [
      // this could be css-loader or style-loader
      {
        test: path.resolve('./dist/index.css'),
        loader: require.resolve('./test')
      },
      {
        test: /\.css$/,
        loader: require.resolve('dss/webpack'),
        options: {
          bundleFilename: path.resolve('./dist/index.css'),
          processBundleWithNextLoaders: true,
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    }),
  ]
}

exports = module.exports = config
