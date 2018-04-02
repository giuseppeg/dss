const processor = require('../src/processor')

describe('processor', () => {
  it('processes css', async () => {
    const { css } = await processor(`
      .root {
        color: red;
      }
    `)
    expect(css).not.toBe('')
  })

  it('applies the nest-atrules plugin', async () => {
    const { css } = await processor(`
      .root {
        color: red;
      }
      @media (min-width: 10px) {
        .root {
          display: block;
        }
      }
    `)
    expect(css).toMatchSnapshot()
  })

  it('applies the split-grouped-selectors plugin', async () => {
    const { css } = await processor(`
      .a, .b {
        color: red;
      }
    `)
    expect(css).toMatchSnapshot()
  })
})
