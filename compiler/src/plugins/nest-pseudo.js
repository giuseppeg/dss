const postcss = require('postcss')

module.exports = postcss.plugin('postcss-dss-nest-pseudo', () => {
  return root => {
    root.walkRules(rule => {
      let parts = rule.selector.split(/:/)
      if (parts.length < 2 || parts[0] === '&' || rule.selector.slice(-1) === '&') {
        return
      }

      let parentSelector = parts[0]
      let selector = ':' + parts.slice(1).join(':')
      // :hover > .foo
      if (parts[0] === '') {
        const delimiter = selector.match(/[>~+]/)
        if (delimiter) {
          parts = selector.split(delimiter[0])
          selector = `${parts[0].trim()} ${delimiter[0]} &`
          parentSelector = parts[1].trim()
        } else {
          return
        }
      }

      const clone = rule.clone()
      clone.selector = selector
      rule.nodes = [clone]
      rule.selector = parentSelector
    })
  }
})
