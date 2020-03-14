const dss = require('../')

describe('dss', () => {
  it('compiles', async () => {
    const src = `
      .a { color: red; }
      .a:hover { color: blue; }
      @media screen and (min-width: 30px) {
        .a { color: hotpink }
      }

      :hover > .a {
        color: orange;
      }

      :hover + .a {
        display: block;
      }
    `
    const { locals, flush } = await dss(src)

    expect(locals).toMatchSnapshot()
    expect(src + '\n\n⬇⬇⬇⬇\n\n' + flush()).toMatchSnapshot()
  })

  it('compiles fallbacks', async () => {
    const src = `
      .a {
        color: red;
        color: green;
      }
    `
    const { locals, flush } = await dss(src)

    expect(locals).toMatchSnapshot()
    expect(src + '\n\n⬇⬇⬇⬇\n\n' + flush()).toMatchSnapshot()
  })

  it('works in async mode', async () => {
    const styles1Promise = dss('.foo { color: red }')
    const r1 = await dss('.bar { display: block }')
    const css2 = r1.flush()
    const r2 = await styles1Promise
    const css1 = r2.flush()

    expect(css2).toBeTruthy()
    expect(css1).toBeTruthy()
  })

  it('does not have duplicates', async () => {
    const { locals, css } = await dss('.foo { display: block } .bar { display: block }')
    expect(locals).toMatchSnapshot()
    expect(css()).toMatchSnapshot()
  })

  it('works as a singleton', async () => {
    function rulesLength(css) {
      return (css.match(/\.dss_/g) || []).length
    }

    const call1 = await dss.singleton('.foo { display: block }')
    expect(call1.locals.foo.length).toBe(1)
    expect(rulesLength(call1.css())).toBe(1)

    const call2 = await dss.singleton('.bar { display: block }')
    expect(call2.locals.bar.length).toBe(1)
    expect(rulesLength(call2.css())).toBe(1)

    const call3 = await dss.singleton('.foo { color: red } .baz { color: orange }')
    expect(call3.locals.foo.length).toBe(1)
    expect(call3.locals.baz.length).toBe(1)
    expect(rulesLength(call3.css())).toBe(3)

    const call4 = await dss.singleton('.bar { vertical-align: middle }')
    const css = call1.flush()
    expect(rulesLength(call4.css())).toBe(0)
    expect(rulesLength(css)).toBe(4)
  })

  it('compiles keyframes', async () => {
    // @keyframes fade {0% { opacity:0 } 100% { opacity:1}}
    const src = `
      @font-face {
        font-family: 'foo';
        src: url(http://b.ar)
      }
      .a {
        transition-property: fade;
        transition-timing-function: ease-out;
        transition-duration: 0.5s;
      }
      @keyframes some {0% { opacity:0 } 100% { opacity:1}}
      @keyframes fade {0% { opacity:0 } 100% { opacity:1}}
      @keyframes fade {
        0% { opacity:0; margin-left: 0; }
        100% { opacity:1; margin-left: 100; }
      }
    `
    const { locals, flush } = await dss(src)

    expect(locals).toMatchSnapshot()
    expect(src + '\n\n⬇⬇⬇⬇\n\n' + flush()).toMatchSnapshot()
  })

  it('renames keyframes', async () => {
    const a = await dss(`
      .a {
        animation-name: fade;
      }
      @keyframes fade {0% { opacity:0 } 100% { opacity:1}}
    `)
    const b = await dss(`
      .b {
        animation-name: fade;
      }
      @keyframes fade {
        0% { opacity:0; margin-left: 0; }
        100% { opacity:1; margin-left: 100; }
      }
    `)

    expect(a.locals.a).not.toEqual(b.locals.b)
    expect(a.flush() + b.flush()).toMatchSnapshot()
  })
})
