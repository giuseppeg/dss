const postcss = require('postcss')
const nestAtRulesPlugin = require('postcss-nest-atrules')
const nestPseudoPlugin = require('./plugins/nest-pseudo')
const splitGroupedSelectorsPlugin = require('./plugins/split-grouped-selectors')
const selectorsPlugin = require('./plugins/selectors')

const processor = postcss([
  splitGroupedSelectorsPlugin,
  selectorsPlugin,
  nestAtRulesPlugin,
  nestPseudoPlugin,
])
module.exports = (css, opts = { from: undefined }) => processor.process(css, opts)

const optimizer = require('postcss')([
  require('postcss-discard-duplicates'),
  require('autoprefixer'),
  require('./plugins/sort-at-rules'),
])

module.exports.optimize = (css, opts = { from: undefined, to: undefined }) =>
  optimizer.process(css, opts)
