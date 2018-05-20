const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DSSWebpackPlugin = require('@dss/webpack')

const localIdentName =
  process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]--[hash:base32:5]'

module.exports = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders, isServer }) => {
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
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-easy-import')(),
                require('postcss-simple-vars')({ variables: () => require('./theme') })
              ],
              sourceMap: false
            }
          }
        ]
      })
    })

    config.plugins.push(new ExtractTextPlugin({ filename: 'static/index.css' }))

    config.plugins.push(
      new DSSWebpackPlugin({
        test: /static\/index\.css$/
      })
    )

    if (!isServer) {
      // Extend the default CommonsChunkPlugin config
      // so that Next.js can pick up all the CSS files.
      //
      // @TODO make a PR to zeit/next-css to support DSS and remove all this boilerplate.
      config.plugins = config.plugins.map(plugin => {
        if (
          plugin.constructor.name === 'CommonsChunkPlugin' &&
          typeof plugin.minChunks !== 'undefined'
        ) {
          const defaultMinChunks = plugin.minChunks
          plugin.minChunks = (module, count) => {
            // Move all styles to commons chunk so they can be extracted to a single file
            if (module.resource && module.resource.match(/\.css$/)) {
              return true
            }
            // Use default minChunks for non-style modules
            return typeof defaultMinChunks === 'function'
              ? defaultMinChunks(module, count)
              : count >= defaultMinChunks
          }
        }
        return plugin
      })
    }

    return config
  }
}
