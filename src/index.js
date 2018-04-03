const { objectify } = require('postcss-js')
const processor = require('./processor')
const compile = require('./compile')

module.exports = async css => {
  const ast = await processor(css).then(result => result.root)
  return compile(objectify(ast))
}
module.exports.css = () => compile.css()
