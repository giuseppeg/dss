const LastCallWebpackPlugin = require('last-call-webpack-plugin')
const postcss = require('postcss')([require('postcss-discard-duplicates'), require('autoprefixer')])

function processor(assetName, asset, assets) {
  const css = asset.source()
  return postcss
    .process(css, { from: assetName, to: assetName })
    .then(result => result.css)
}

class DSSPlugin extends LastCallWebpackPlugin {
  constructor(options = { canPrint: false }) {
    super({
      assetProcessors: [
        {
          phase: LastCallWebpackPlugin.PHASES.OPTIMIZE_ASSETS,
          regExp: options.test || /\.css$/g,
          processor
        },
        {
          phase: LastCallWebpackPlugin.PHASES.OPTIMIZE_CHUNK_ASSETS,
          regExp: options.test || /\.css$/g,
          processor
        }
      ],
      canPrint: options.canPrint
    })
  }

  buildPluginDescriptor() {
    return { name: 'DSSWebpackPlugin' }
  }
}

DSSPlugin.loader = require.resolve('./loader')

module.exports = DSSPlugin
