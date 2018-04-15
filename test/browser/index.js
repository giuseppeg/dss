const test = require('tape-css')(require('tape'))
const classNames = require('../../classnames')
const { compile, makeDom, run } = require('./utils')

run(async () => {
  const {classes, styles} = await compile(`
    .a { background-color: red }
    .a:focus { background-color: yellow }
    .b { background-color: green }
    .c { background-color: red; display: block }
    @media (min-width: 0px) {
      .c {
        background-color: green;
        display: inline-block;
      }
      .d:focus { background-color: yellow }
    }
    .d { background-color: orange; font-weight: bold }
    .f {
      background-color: green;
      background-color: invalid;
    }
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

  const dom3 = makeDom(`
    <input class="${classNames(classes.d, classes.c)}" />
  `)
  test(
    'works with media queries',
    {
      dom: dom3,
      styles
    },
    t => {
      const s = getComputedStyle(dom3)
      t.equal(
        s.getPropertyValue('background-color'),
        'rgb(0, 128, 0)',
        'initially `background-color` should be rgb(0, 128, 0) i.e. green'
      )
      t.equal(
        s.getPropertyValue('display'),
        'inline-block',
        'initially `display` should be `inline-block`'
      )
      t.equal(
        s.getPropertyValue('font-weight'),
        'bold',
        'initially `font-weight` should be `bold`'
      )

      dom3.focus()

      t.equal(
        getComputedStyle(dom3).getPropertyValue('background-color'),
        'rgb(255, 255, 0)',
        'on focus it should be rgb(255, 255, 0) i.e. yellow'
      )
      t.end()
    }
  )

  const dom4 = makeDom(`
    <input class="${classNames(classes.c, classes.d)}" />
  `)
  test(
    'works with merged rules',
    {
      dom: dom4,
      styles
    },
    t => {
      t.equal(
        getComputedStyle(dom4).getPropertyValue('background-color'),
        'rgb(0, 128, 0)',
        'initially `background-color` should be rgb(0, 128, 0) i.e. green'
      )

      dom4.focus()

      t.equal(
        getComputedStyle(dom4).getPropertyValue('background-color'),
        'rgb(255, 255, 0)',
        'on focus it should be rgb(255, 255, 0) i.e. yellow'
      )
      t.end()
    }
  )

  const dom5 = makeDom(`
    <input class="${classNames(classes.a, classes.f)}" />
  `)
  test(
    'works with fallbacks',
    {
      dom: dom5,
      styles
    },
    t => {
      t.equal(
        getComputedStyle(dom5).getPropertyValue('background-color'),
        'rgb(0, 128, 0)',
        'initially `background-color` should be rgb(0, 128, 0) i.e. green'
      )
      t.end()
    }
  )

  const dom6 = makeDom(`
    <input class="${classNames(classes.a, classes.f, 'Test')}" />
  `)
  test(
    'has readable class names',
    {
      dom: dom6,
      styles
    },
    t => {
      const matches = dom6.className.match(/(Test-[a|f]-)/g)

      t.equal(
        matches ? matches.length : 0,
        2,
        'should have Test-a-hash and Test-f-hash class names'
      )
      t.end()
    }
  )
})
