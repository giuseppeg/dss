const a = require('./a.css')
const b = require('./b.css')
const d = require('./d.css')
const classNames = require('dss/classnames')

const root = document.querySelector('main')

root.innerHTML = `
  <p class="${classNames(b.root, a.root)}">hello</p>
  <p class="${classNames(a.root, b.root)}">hello</p>
  <p class="${classNames()}">hello</p>
`
