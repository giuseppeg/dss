const path = require('path')
const loaderUtils = require('loader-utils')
const dss = require('./')

const BUNDLE_MARKER = '/*___DSS_BUNDLE___*/'
let loaded = false
module.exports = function (content, map) {
  const options = loaderUtils.getOptions(this) || {}

  // Don't process the bundle file
  if (options.processBundleWithNextLoaders && content.indexOf(BUNDLE_MARKER) !== -1) {
    return content
  }

  let bundleFilename = options.bundleFilename
  if (typeof bundleFilename !== 'string') {
    bundleFilename = 'index.css'
  }

  if (this.cacheable) this.cacheable()

  const compiled = dss(content)
  this.emitFile(path.basename(bundleFilename), `${BUNDLE_MARKER}${dss.css()}`)

  let out = `exports = module.exports = ${JSON.stringify(compiled)}`
  if (options.processBundleWithNextLoaders && !loaded) {
    loaded = true
    // Add an import so that other loader can process it.
    out = `import '${bundleFilename}'; ${out}`
  }

  return out
}
