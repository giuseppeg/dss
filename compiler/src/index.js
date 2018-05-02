const path = require('path')
const { objectify } = require('postcss-js')
const hash = require('./vendor/hash')
const processor = require('./processor')
const compile = require('./compile')

const defaultOptions = {
  filePath: undefined,
  readableClass: false
}

module.exports = async (css, options = {}) => {
  const opts = Object.assign({}, defaultOptions, options)

  let makeReadableClass
  if (opts.readableClass) {
    if (typeof opts.readableClass === 'function') {
      makeReadableClass = localName => opts.readableClass(localName, hash(css))
    } else {
      let prefix
      if (typeof opts.filePath === 'string') {
        const filename = path.basename(opts.filePath)
        const p =
          filename
            .split('.')
            .slice(0, -1)
            .join('-') || 'DssSource'
        prefix = p.charAt(0).toUpperCase() + p.substr(1)
      } else {
        prefix = 'DssSource'
      }
      makeReadableClass = localName => `${prefix}-${localName}-${hash(css)}`
    }
  }

  const result = await processor(css, { from: opts.filePath })
  return compile(objectify(result.root), {
    makeReadableClass
  })
}
module.exports.css = () => compile.css()
module.exports.reset = () => compile.reset()
module.exports.flush = () => {
  const css = compile.css()
  compile.reset()
  return css
}
