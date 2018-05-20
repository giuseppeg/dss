const DSSWebpackPlugin = require('@dss/webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')
const escapeStringRegexp = require('escape-string-regexp')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const { dssLoaderOptions } = nextConfig
      // Support the user providing their own instance of ExtractTextPlugin.
      // If extractCSSPlugin is not defined we pass the same instance of ExtractTextPlugin to all css related modules
      // So that they compile to the same file in production
      let extractCSSPlugin = nextConfig.extractCSSPlugin || options.extractCSSPlugin

      const bundleName = dssLoaderOptions.filename || 'static/style.css'

      if (!extractCSSPlugin) {
        extractCSSPlugin = new ExtractTextPlugin({
          filename: bundleName
        })
        config.plugins.push(extractCSSPlugin)
        options.extractCSSPlugin = extractCSSPlugin
        if (!isServer) {
          config = commonsChunkConfig(config, /\.css$/)
        }
      }

      options.defaultLoaders.css = cssLoaderConfig(config, extractCSSPlugin, {
        cssModules: true,
        cssLoaderOptions: {},
        dev,
        isServer: false
      }).map(loader => {
        // Replace css-loader with the dss-loader

        if (!loader.loader.startsWith('css-loader')) {
          return loader
        }

        return {
          loader: DSSWebpackPlugin.loader,
          query: {
            localIdentName: dssLoaderOptions.localIdentName
          }
        }
      })

      config.module.rules.push({
        test: /\.css$/,
        use: options.defaultLoaders.css
      })

      config.plugins.push(
        new DSSWebpackPlugin({
          test: new RegExp(escapeStringRegexp(bundleName))
        })
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
