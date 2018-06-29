const postcss = require('postcss')

const shortHandProperties = [
  'animation', 'background', 'border', 'border-bottom', 'border-left', 'border-radius', 'border-right', 'border-top', 'column-rule', 'columns', 'flex', 'flex-flow', 'font', 'grid', 'grid-area', 'grid-column', 'grid-row', 'grid-template', 'list-style', 'margin', 'offset', 'outline', 'overflow', 'padding', 'place-content', 'place-items', 'place-self', 'text-decoration', 'transition',
]

function error(node, message) {
  throw node.error(
    `DSS Error

    ${message}

    For a comprehensive list of supported features refer to http://giuseppeg.github.io/dss/supported-css-features/
    `
  )
}

module.exports = postcss.plugin('postcss-dss-validator', () => {
  return root => {
    const processed = {}
    root.walkRules(rule => {
      const { selector, parent } = rule
      if (parent && parent.type === 'atrule') {
        return
      }

      const params = parent && parent.params ? parent.params : ''

      if (processed[params + selector]) {
        error(rule,
          `Detected duplicated selector: '${selector}'. Please merge it with the previous one.`
        )
      }
      if (selector.split(',').length > 1) {
        error(rule,
          `Invalid selector: ${selector}. Selectors cannot be grouped.`
        )
      }
      if (/::?(after|before|first-letter|first-line)/.test(selector)) {
        error(rule,
          `Detected pseudo-element: '${selector}'. Pseudo-elements are not supported. Please use regular elements.`
        )
      }

      if (/:(matches|has|not|lang|any|current)/.test(selector)) {
        error(rule,
          `Detected unsupported pseudo-class: '${selector}'.`
        )
      }

      const split = selector.split(/\s*[+>~\s]\s*/g)

      switch (split.length) {
        case 2:
          if (split[0].charAt(0) !== ':' || split[1].charAt(0) !== '.') {
            error(rule,
              `Invalid selector: ${selector}.`
            )
          }
          break
        case 1:
          if (split[0].charAt(0) !== '.') {
            error(rule,
              `Invalid selector: ${selector}. Only class selectors are allowed.`
            )
          }
          break
        default:
          error(rule,
            `Invalid selector: ${selector}.`
          )
      }

      if (/\[/.test(selector)) {
        error(rule,
          `Invalid selector: ${selector}. Cannot use complex selectors, please use only class selectors.`
        )
      }
      processed[params + selector] = true
    })

    root.walkDecls(decl => {
      if (shortHandProperties.includes(decl.prop)) {
        error(decl,
          '`' + decl.prop + '`: DSS does\'t support shorthand properties at the moment. This CSS feature will likely be supported in the future. Please expand your shorthand properties for now.' +
          `\n Can't remember what is the long form for \`${decl.prop}\`? Ask Google 👉  https://google.com/search?q=${encodeURIComponent(`css ${decl.prop} properties`)}`
        )
      }

      if (decl.important) {
        error(decl,
          '!important is not allowed'
        )
      }
    })
  }
})
