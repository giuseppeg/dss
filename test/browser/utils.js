const tape = require('tape')

module.exports.compile = function (css) {
  return fetch('http://localhost:3000', {
    body: css,
    cache: 'no-cache',
    method: 'POST',
    redirect: 'follow',
    referrer: 'no-referrer'
  })
  .then(response => response.json())
  .catch(err => { throw err })
}

module.exports.makeDom = function (html) {
  const fragment = document.createElement('div')
  fragment.innerHTML = html
  return fragment.children[0]
}

let runCount = 1
module.exports.run = function (fn) {
  tape('suite ' + runCount++, t => {
    const result = fn()
    if (result instanceof Promise) {
      result.then(() => {
        t.end()
      })
    } else {
      t.end()
    }
  })
}
