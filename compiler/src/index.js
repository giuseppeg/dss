const path = require('path')
const { objectify } = require('postcss-js')
const hash = require('./vendor/hash')
const processor = require('./processor')
const compile = require('./compile')

const defaultOptions = {
  filePath: undefined,
  readableClass: false,
}

let uuid = 1

const createDss = (singleton = false) => async (css, options = {}) => {
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

  const sheetId = String(singleton ? 0 : uuid++)
  const result = await processor(css, { from: opts.filePath })
  const locals = compile(objectify(result.root), {
    makeReadableClass,
    sheetId,
  })

  return {
    locals,
    css: () => compile.css(sheetId),
    reset: () => compile.reset(sheetId),
    flush: () => {
      const css = compile.css(sheetId)
      compile.reset(sheetId)
      return css
    },
  }
}

module.exports = createDss()
module.exports.singleton = createDss(true)
