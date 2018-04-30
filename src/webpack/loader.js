const loaderUtils = require('loader-utils')
const dss = require('../')

const BANNER = '/* DSS file */'

module.exports = function(content) {
  if (this.cacheable) this.cacheable()
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}
  let readableClass
  if (typeof options.localIdentName === 'string') {
    readableClass = localName =>
      loaderUtils
        .interpolateName(this, options.localIdentName, { content })
        .split('[local]')
        .join(localName)
  }

  dss(content, { readableClass })
    .then(compiled => {
      const moduleExports = [
        BANNER,
        `exports = module.exports = [[module.id, "${dss.flush()}", ""]];`,
        `exports.locals = ${JSON.stringify(compiled)}`
      ].join('\n')
      callback(null, moduleExports)
    })
    .catch(callback)
}
