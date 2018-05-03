const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DSSWebpackPlugin = require('@dss/webpack')

const localIdentName =
  process.env.NODE_ENV === 'production'
    ? 'DSS-[hash:base32]'
    : '[name]-[local]--[hash:base32:5]'

module.exports = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader'
        }
      ]
    })

    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: DSSWebpackPlugin.loader,
            query: {
              localIdentName
            }
          }
        ]
      })
    })

    config.plugins.push(new ExtractTextPlugin({ filename: 'static/index.css' }))

    config.plugins.push(
      new DSSWebpackPlugin({
        test: /index\.css$/
      })
    )

    return config
  }
}
