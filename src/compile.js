const flatten = require('just-flatten-it')
const hash = require('./vendor/hash')

/* Fork of cxs with fundamendal changes */

let cache = {}
const rules = []
const insert = rule => rules.push(rule)
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const rx = (cn, prop, val) => `.${cn}{${hyph(prop)}:${val}}`
const noAnd = s => s.replace(/&/g, '')

const className = (key, val, child, media) => {
  const _key = key + val + child + media
  if (cache[_key]) return cache[_key]
  const className = `dss_${hash(key+media+child)}-${hash(val)}`
  insert(mx(rx(className + noAnd(child), key, val), media))
  cache[_key] = className
  return className
}

const parse = (obj, child = '', media) =>
  Object.keys(obj).map(key => {
    const val = obj[key]
    if (val === null) return ''
    if (Object.prototype.toString.call(val) === '[object Object]') {
      const m2 = /^@/.test(key) ? key : null
      const c2 = m2 ? child : child + key
      return parse(val, c2, m2 || media)
    }
    if (Array.isArray(val)) {
      return val.map(v => className(key, v, child, media))
    }
    return className(key, val, child, media)
  })

module.exports = styles =>
  Object.keys(styles).reduce((acc, key) => {
    acc[key.replace(/^\./, '')] = flatten(parse(styles[key]))
    return acc
  }, {})

module.exports.css = () => rules.sort().join('')

module.exports.reset = () => {
  cache = {}
  while (rules.length) rules.pop()
}
