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
    <div>
      <div class="${classNames(classes.b, classes.a)}"></div>
      <div class="${classNames(classes.a, classes.b)}"></div>
    </div>
  `)
  test(
    'resolves deterministically',
    {
      dom: dom1,
      styles
    },
    t => {
      t.equal(
        getComputedStyle(dom1.children[0]).getPropertyValue('background-color'),
        'rgb(255, 0, 0)',
        'the first child should be rgb(255, 0, 0) i.e. red'
      )
      t.equal(
        getComputedStyle(dom1.children[1]).getPropertyValue('background-color'),
        'rgb(0, 128, 0)',
        'the second child should be rgb(0, 128, 0) i.e. green'
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
      t.equal(
        getComputedStyle(dom2).getPropertyValue('background-color'),
        'rgb(255, 0, 0)',
        'initially it should be rgb(255, 0, 0) i.e. red'
      )
      dom2.focus()
      t.equal(
        getComputedStyle(dom2).getPropertyValue('background-color'),
        'rgb(255, 255, 0)',
        'on focus it should be rgb(255, 255, 0) i.e. yellow'
      )
      t.end()
    }
  )
})
