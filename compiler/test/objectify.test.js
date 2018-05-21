const { parse } = require('postcss')
const { objectify } = require('postcss-js')

const compile = css => objectify(parse(css))

describe('objetify css', () => {
  it('simple rule', () => {
    expect(
      compile(`
      .a { color: red }
    `)
    ).toMatchSnapshot()
  })

  it('pseudo class', () => {
    expect(
      compile(`
      .a { :hover { color: red } }
    `)
    ).toMatchSnapshot()
  })

  it('simple and pseudo class', () => {
    expect(
      compile(`
      .a { color: pink; :hover { color: red } }
    `)
    ).toMatchSnapshot()
  })

  it('media and pseudo', () => {
    expect(
      compile(`
      .a { @media (min-width: 30px) { :hover { color: red } } }
    `)
    ).toMatchSnapshot()
  })

  it('multiple', () => {
    expect(
      compile(`
      .a { color: red; }
      .a { :hover { color: blue; } }
      .a {
        @media screen and (min-width: 30px) {
          color: hotpink
        }
      }
    `)
    ).toMatchSnapshot()
  })

  it('state-combinator-class', () => {
    expect(
      compile(`
      .a { :hover > & { color: blue; } }
    `)
    ).toMatchSnapshot()
  })
})
