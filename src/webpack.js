const path = require('path')
const loaderUtils = require('loader-utils')
const dss = require('./index')

const BUNDLE_MARKER = '/*___DSS_BUNDLE___*/'
let loaded = false
module.exports = function(content) {
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}

  // Don't process the bundle file
  if (
    options.processBundleWithNextLoaders &&
    content.indexOf(BUNDLE_MARKER) !== -1
  ) {
    callback(content)
    return
  }

  let bundleFilename = options.bundleFilename
  if (typeof bundleFilename !== 'string') {
    bundleFilename = 'index.css'
  }

  if (this.cacheable) this.cacheable()

  dss(content)
    .then(compiled => {
      this.emitFile(
        path.basename(bundleFilename),
        `${BUNDLE_MARKER}${dss.css()}`
      )

      if (options.processBundleWithNextLoaders && !loaded) {
        loaded = true
        this.loadModule(bundleFilename, () => {})
      }
      callback(`module.exports = ${JSON.stringify(compiled)}`)
    })
    .catch(callback)
}
