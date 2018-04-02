const postcss = require('postcss')
const atRulesPlugin = require('postcss-nest-atrules')
const splitGroupedSelectorsPlugin = require('./plugins/split-grouped-selectors')
const selectorsPlugin = require('./plugins/selectors')

const processor = postcss([
  splitGroupedSelectorsPlugin,
  atRulesPlugin,
  selectorsPlugin
])
module.exports = (css, opts = { from: undefined }) =>
  processor.process(css, opts)
