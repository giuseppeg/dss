const { objectify } = require('postcss-js')
const processor = require('./processor')
const compile = require('./compile')

module.exports = async css => {
  const result = await processor(css)
  return compile(objectify(result.root))
}
module.exports.css = () => compile.css()
