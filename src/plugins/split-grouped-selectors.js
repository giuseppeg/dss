const postcss = require('postcss')

module.exports = postcss.plugin('postcss-dss-split-grouped-selectors', () => {
  return root => {
    root.walkRules(rule => {
      const selector = rule.selector.split(',').map(s => s.trim())
      if (selector.length < 2) {
        return
      }
      rule.selector = selector[0]
      for (let i = 1; i < selector.length; i++) {
        const clone = rule.clone()
        clone.selector = selector[i]
        rule.parent.insertAfter(rule, clone)
      }
    })
  }
})
