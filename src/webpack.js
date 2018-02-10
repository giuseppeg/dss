const loaderUtils = require('loader-utils')
const dss = require('./')

module.exports = function (content, map) {
  if (this.cacheable) this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  let bundleFilename = options.bundleFilename
  if (typeof bundleFilename !== 'string') {
    bundleFilename = 'index.css'
  } else if (!/\.css$/.test(bundleFilename)) {
    bundleFilename += '.css'
  }

  const compiled = dss(content)
  this.emitFile(bundleFilename, dss.css())
  return `exports = module.exports = ${JSON.stringify(compiled)}`
}
