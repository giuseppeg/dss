const reduceIdentsPlugin = require('postcss-reduce-idents')
const hash = require('../vendor/hash')

module.exports = sheetId => reduceIdentsPlugin({
  encoder: val => hash(sheetId + val)
})
