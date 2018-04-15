const dss = require('../')

describe('dss', () => {
  it('compiles', async () => {
    const styles = await dss(`
      .a { color: red; }
      .a:hover { color: blue; }
      @media screen and (min-width: 30px) {
        .a { color: hotpink }
      }
    `)

    expect(styles).toMatchSnapshot()
    expect(dss.css()).toMatchSnapshot()
  })
})
