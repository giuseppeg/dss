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
      {
        test: /\.css$/,
        loader: require.resolve('dss/webpack'),
        options: {
          bundleFilename: path.join(path.resolve("./dist"), 'index.css')
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
