const optimizer = require('dss-compiler/processor').optimizer

let LastCallWebpackPlugin
try {
  LastCallWebpackPlugin = require('last-call-webpack-plugin')
} catch (error) {
  if (/cannot find module/i.test(error.message)) {
    throw new Error(`DSSWebpackPlugin depends on last-call-webpack-plugin.

Are you Webpack 3 user?
Please install last-call-webpack-plugin@^2.0.0 as devDependency.

Are you Webpack 4 user?
Please install last-call-webpack-plugin@^3.0.0 as devDependency.
`)
  }
  throw error
}

const PHASES = "PHASE" in LastCallWebpackPlugin ? "PHASE" : "PHASES";

function processor(assetName, asset) {
  const css = asset.source()
  return optimizer(css, { from: assetName, to: assetName }).then(result => result.css)
}

class DSSPlugin extends LastCallWebpackPlugin {
  constructor(options = { canPrint: false }) {
    super({
      assetProcessors: [
        {
          phase: LastCallWebpackPlugin[PHASES].OPTIMIZE_ASSETS,
          regExp: options.test || /\.css$/g,
          processor
        },
        {
          phase: LastCallWebpackPlugin[PHASES].OPTIMIZE_CHUNK_ASSETS,
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
