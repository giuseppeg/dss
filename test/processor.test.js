const postcss = require('postcss')
const selectorsPlugin = require('../src/plugins/selectors')
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

  it('applies the split-grouped-selectors plugin', async () => {
    const { css } = await processor(`
      .a, .b {
        color: red;
      }
    `)
    expect(css).toMatchSnapshot()
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

  it('applies the nest-pseudo plugin', async () => {
    const { css } = await processor(`
      .a:hover {
        color: red;
      }
      .b:hover, .b {
        color: hotpink
      }
    `)
    expect(css).toMatchSnapshot()
  })

  it('mixed nest-atrules and nest-pseudo', async () => {
    const { css } = await processor(`
      @media (min-width: 10px) {
        .a:hover {
          color: red;
        }
      }
    `)
    expect(css).toMatchSnapshot()
  })

  describe('validation', () => {
    const selectorsProcessor = css =>
      postcss([selectorsPlugin]).process(css, { from: undefined })

    describe('throws when it detecs duplicated selectors', async () => {
      it('simple', () =>
        expect(
          processor(`
          .a { color: red }
          .a { color: blue }
        `)
        ).rejects.toThrow(/Detected duplicated selector/))

      it('combined', () =>
        expect(
          processor(`
          .a, .a { color: red }
        `)
        ).rejects.toThrow(/Detected duplicated selector/))

      it('except when it is a state declaration', () =>
        expect(
          processor(`
          .a { color: red }
          .a:hover { color: blue }
        `)
        ).resolves.toBeTruthy())
    })

    it('throws when selectors are grouped', () =>
      expect(selectorsProcessor(`.a, .b { color: red }`)).rejects.toThrow(
        /Selectors cannot be grouped/
      ))

    it('throws when using pseudo-elements', () => {
      expect.assertions(4)
      return Promise.all(
        ['.a:before', '.a:after', '.a::before', '.a::after'].map(selector =>
          expect(
            selectorsProcessor(`${selector} { color: red }`)
          ).rejects.toThrow(/Detected pseudo-element/)
        )
      )
    })

    it('throws when using complex or non class selectors', async () => {
      expect.assertions(8)
      await Promise.all(
        ['div', '[class]', '*'].map(selector =>
          expect(
            selectorsProcessor(`${selector} { color: red }`)
          ).rejects.toThrow(/Only class selectors are allowed/)
        )
      )
      await Promise.all(
        ['.a[href]', '.a .b', '.a *', '.a > .b', '.a + .b'].map(selector =>
          expect(
            selectorsProcessor(`${selector} { color: red }`)
          ).rejects.toThrow(/Cannot use complex selectors/)
        )
      )
    })
  })
})
