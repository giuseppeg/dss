const test = require('tape-css')(require('tape'))
const classNames = require('../../classnames')
const { compile, makeDom, run } = require('./utils')

run(async () => {
  const {classes, styles} = await compile(`
    .a { background-color: red }
    .b { background-color: green }
    .a:focus { background-color: yellow }
  `)

  const dom1 = makeDom(`
    <div class="${classNames(classes.b, classes.a)}"></div>
  `)
  test(
    'resolves deterministically',
    {
      dom: dom1,
      styles
    },
    t => {
      t.equal(
        getComputedStyle(dom1).getPropertyValue('background-color'),
        'rgb(255, 0, 0)'
      )
      t.end()
    }
  )

  const dom2 = makeDom(`
    <input class="${classNames(classes.a)}" />
  `)
  test(
    'works with pseudo selectors',
    {
      dom: dom2,
      styles
    },
    t => {
      dom2.focus()
      t.equal(
        getComputedStyle(dom2).getPropertyValue('background-color'),
        'rgb(255, 255, 0)'
      )
      t.end()
    }
  )
})
