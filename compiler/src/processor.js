const postcss = require('postcss')
const nestAtRulesPlugin = require('postcss-nest-atrules')
const nestPseudoPlugin = require('./plugins/nest-pseudo')
const splitGroupedSelectorsPlugin = require('./plugins/split-grouped-selectors')
const validatorPlugin = require('./plugins/validator')
const reduceIdentsPlugin = require('./plugins/reduce-idents')

module.exports = (css, opts = { from: undefined }, sheetId) => postcss([
  splitGroupedSelectorsPlugin,
  validatorPlugin,
  nestAtRulesPlugin,
  nestPseudoPlugin,
  reduceIdentsPlugin(sheetId),
]).process(css, opts)

const optimzr = postcss([
  /* eslint-disable import/order */
  require('postcss-discard-duplicates'),
  require('autoprefixer'),
  require('./plugins/sort-at-rules'),
  /* eslint-enable import/order */
])

module.exports.optimizer = (css, opts = { from: undefined, to: undefined }) =>
  optimzr.process(css, opts)
