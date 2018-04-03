const postcss = require('postcss')

module.exports = postcss.plugin('postcss-dss-nest-pseudo', () => {
  return root => {
    root.walkRules(rule => {
      const parts = rule.selector.split(/:/)
      if (parts.length < 2 || parts[0] === '&' || parts[0] === '') {
        return
      }
      const selector = '&:' + parts.slice(1).join(':')
      const clone = rule.clone()
      clone.selector = selector
      rule.nodes = [clone]
      rule.selector = parts[0]
    })
  }
})
