const dss = require('../')

describe('dss', () => {
  it('compiles', async () => {
    const src = `
      .a { color: red; }
      .a:hover { color: blue; }
      @media screen and (min-width: 30px) {
        .a { color: hotpink }
      }
    `
    const styles = await dss(src)

    expect(styles).toMatchSnapshot()
    expect(src + '\n\n⬇⬇⬇⬇\n\n' + dss.flush()).toMatchSnapshot()
  })

  it('compiles fallbacks', async () => {
    const src = `
      .a {
        color: red;
        color: green;
      }
    `
    const styles = await dss(src)

    expect(styles).toMatchSnapshot()
    expect(src + '\n\n⬇⬇⬇⬇\n\n' + dss.flush()).toMatchSnapshot()
  })
})
