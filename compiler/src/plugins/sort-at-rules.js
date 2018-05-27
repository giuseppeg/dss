const postcss = require('postcss')

// Moves at rules at the bottom of the file.

module.exports = postcss.plugin('postcss-dss-sort-at-rules', () => {
  return root => {
    const atRules = []
    root.walkAtRules(atRule => {
      atRules.push(atRule.clone())
      atRule.remove()
    })
    root.nodes = root.nodes.concat(atRules)
  }
})
