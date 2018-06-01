const postcss = require('postcss')

module.exports = postcss.plugin('postcss-dss-selectors', () => {
  return root => {
    const processed = {}
    root.walkRules(rule => {
      const { selector, parent } = rule
      if (parent && parent.type === 'atrule') {
        return
      }

      const params = parent && parent.params ? parent.params : ''

      if (processed[params + selector]) {
        throw rule.error(
          `Detected duplicated selector: '${selector}'. Please merge it with the previous one.`
        )
      }
      if (selector.split(',').length > 1) {
        throw rule.error(
          `Invalid selector: ${selector}. Selectors cannot be grouped.`
        )
      }
      if (/::?(after|before)/.test(selector)) {
        throw rule.error(
          `Detected pseudo-element: '${selector}'. Pseudo-elements are not supported. Please use regular elements.`
        )
      }
      const split = selector.split(/\s*[+>~\s]\s*/g)

      switch (split.length) {
        case 2:
          if (split[0].charAt(0) !== ':' || split[1].charAt(0) !== '.') {
            throw rule.error(
              `Invalid selector: ${selector}.`
            )
          }
          break
        case 1:
          if (split[0].charAt(0) !== '.') {
            throw rule.error(
              `Invalid selector: ${selector}. Only class selectors are allowed.`
            )
          }
          break
        default:
          throw rule.error(
            `Invalid selector: ${selector}.`
          )
      }

      if (/\[/.test(selector)) {
        throw rule.error(
          `Invalid selector: ${selector}. Cannot use complex selectors, please use only class selectors.`
        )
      }
      processed[params + selector] = true
    })
  }
})
