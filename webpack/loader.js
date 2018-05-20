const loaderUtils = require('loader-utils')
const dss = require('@dss/compiler')

const BANNER = '/* DSS file */'

module.exports = function(content) {
  if (this.cacheable) this.cacheable()
  this.addDependency(this.resourcePath)
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}
  let readableClass
  if (typeof options.localIdentName === 'string') {
    const identName = loaderUtils.interpolateName(this, options.localIdentName, { content })
    readableClass = localName => identName.replace(/\[local]/g, localName)
  }

  dss(content, { readableClass })
    .then(({ locals, flush }) => {
      const moduleExports = [
        BANNER,
        `exports = module.exports = [[module.id, "${flush()}", ""]];`,
        `exports.locals = ${JSON.stringify(locals)}`
      ].join('\n')
      callback(null, moduleExports)
    })
    .catch(callback)
}
