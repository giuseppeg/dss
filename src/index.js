const postcss = require('postcss')
const {objectify} = require('postcss-js')
const compile = require('./compile')

const cssToJs = css => objectify(postcss.parse(css))

const cssInJsIfy = jsStyles => {
  return Object.keys(jsStyles).reduce((tokens, token) => {
    if (Array.isArray(jsStyles[token])) {
      throw new Error(`Detected duplicated selector or media query: '${token}'. Please merge it with the previous one.`)
    }

    // Simple class selector
    if (token.charAt(0) == '.') {
      if (/[\s\+\->]/.test(token)) {
        throw new Error(`Detected invalid selector: '${token}'.`)
      }

      if (/\:\:?(after|before)/.test(token)) {
        throw new Error(`Detected pseudo-element: '${token}'. Pseudo-elements are not supported. Please use regular elements.`)
      }

      // Pseudo selectors/classes
      //
      // '.root': {
      //   color: 'red',
      //   ':hover': {
      //     color: 'blue',
      //   }
      // }
      const pseudo = token.split(':')
      if (pseudo.length == 2) {
        tokens[pseudo[0]] = Object.assign(
          {},
          tokens[pseudo[0]] || {},
          { [`:${pseudo[1]}`]: jsStyles[token] }
        )
        return tokens
      }

      // Simple class selector
      tokens[token] = Object.assign({}, tokens[token] || {}, jsStyles[token])
      return tokens
    }

    // Media queries
    //
    // '.root': {
    //   color: 'red',
    //   '@media (min-width: 0)': {
    //     color: 'blue',
    //   }
    // }
    if (token.charAt(0) === '@') {
      const nested = Object.keys(jsStyles[token])
      nested.forEach(name => {
        tokens[name] = Object.assign(
          {},
          tokens[name] || {},
          { [token]: jsStyles[token][name] }
        )
      })
      return tokens
    }

    throw new Error(`Detected unknown/unsupported selector or symbol: '${token}'.`)
  }, {})
}

exports = module.exports = css => compile(cssInJsIfy(cssToJs(css)))
exports.css = () => compile.css()
