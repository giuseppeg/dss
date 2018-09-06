const flatten = require('just-flatten-it')
const hash = require('./vendor/hash')

/* Fork of cxs with fundamendal changes */

const DEFAULT_SHEET_ID = '__defaultSheetId'
const cache = {}
const rules = {}
const insertedRules = {}
const insert = (sheetId, rule) => {
  rules[sheetId].push(rule)
}
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => (media ? `${media}{${rule}}` : rule)
const propVal = (prop, val) =>
  (Array.isArray(val) ? val : [val]).map(val => `${hyph(prop)}:${val}`).join(';')
const rx = (cn, prop, val) => `${cn.startsWith(':') ? '' : '.'}${cn}{${propVal(prop, val)}}`
const rxArr = (cn, prop, vals) => `.${cn}{${propVal(prop, vals)}}`
const noAnd = s => s.replace(/&/g, '')
const combinatorOrPure = (className, child) => {
  if (child.endsWith('&')) {
    return `${noAnd(child)}.${className}`
  }
  return className + noAnd(child)
}

const className = (sheetId, key, val, child, media) => { /* eslint max-params: ["error", 6] */
  const _key = key + val + child + media
  const cached = cache[_key]
  if (cached) {
    const [className, rule] = cached
    if (!insertedRules[sheetId][className]) {
      insert(sheetId, rule)
      insertedRules[sheetId][className] = true
    }
    return className
  }
  const className = `dss_${hash(key + media + child.replace(/[^\w]+$/i, ''))}-${hash(
    val.toString()
  )}`
  const rxFn = Array.isArray(val) ? rxArr : rx
  const rule = mx(rxFn(combinatorOrPure(className, child), key, val), media)
  cache[_key] = [className, rule]
  insert(sheetId, rule)
  insertedRules[sheetId][className] = true
  return className
}

const parse = (sheetId, obj, child = '', media, callback) =>
  Object.keys(obj).map(key => {
    const val = obj[key]
    if (val === null) return ''
    if (Object.prototype.toString.call(val) === '[object Object]') {
      const m2 = key.charAt(0) === '@' ? key : null
      const c2 = m2 ? child : child + key
      return parse(sheetId, val, c2, m2 || media, callback)
    }
    return callback(sheetId, key, val, child, media)
  })

module.exports = (styles, opts = {}) => {
  const sheetId = opts.sheetId || DEFAULT_SHEET_ID
  if (!rules[sheetId]) {
    rules[sheetId] = []
    insertedRules[sheetId] = {}
  }

  return Object.keys(styles).reduce((acc, key) => {
    // Insert non nested at rules like @keyframes as-is
    // since they don't have selectors associated to them.
    if (key.charAt(0) === '@') {
      ;(Array.isArray(styles[key]) ? styles[key] : [styles[key]]).forEach(styles => {
        const steps = {}
        parse(sheetId, styles, '', null, (sheetId, prop, val, child) => {
          const props = propVal(prop, val)
          if (steps[child]) {
            steps[child].push(props)
          } else {
            steps[child] = [props]
          }
        })
        const css = Object.keys(steps).reduce((css, step) => {
          css += mx(steps[step].join(';'), step)
          return css
        }, '')

        insert(sheetId, mx(css, key))
      })
      return acc
    }

    const jsKey = key.replace(/^\./, '')
    acc[jsKey] = flatten(parse(sheetId, styles[key], undefined, undefined, className))
    if (typeof opts.makeReadableClass === 'function') {
      const readableClass = opts.makeReadableClass(jsKey)
      acc[jsKey].unshift(readableClass)
    }
    return acc
  }, {})
}

module.exports.css = (sheetId = DEFAULT_SHEET_ID) => (rules[sheetId] || []).sort().join('')

module.exports.reset = (sheetId = DEFAULT_SHEET_ID) => {
  if (rules[sheetId]) {
    delete rules[sheetId]
    delete insertedRules[sheetId]
  }
}
