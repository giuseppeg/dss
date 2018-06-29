const postcss = require('postcss')
const validatorPlugin = require('../src/plugins/validator')
const sortAtRulesPlugin = require('../src/plugins/sort-at-rules')
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
      .c {
        color: red;
      }
      :hover > .c {
        display: block;
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

  it('merges rules', async () => {
    const { css } = await processor(`
      .root:hover {
        color: yellow;
      }

      .block {
        display: block;
        margin: 10px;
      }

      @media (min-width: 600px) {
        .root {
          color: green;
        }

        .test {
          color: green;
          color: yellow;
        }
      }

      .root {
        color: red;
        font-family: Verdana;
        display: block;
      }

      .test {
        color: red;
        color: pink;
      }
    `)

    expect(css).toMatchSnapshot()
  })

  describe('validation', () => {
    const selectorsProcessor = css => postcss([validatorPlugin]).process(css, { from: undefined })

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
      expect.assertions(8)
      return Promise.all(
        [
          '.a:before',
          '.a:after',
          '.a:first-line',
          '.a:first-letter',
          '.a::before',
          '.a::after',
          '.a::first-line',
          '.a:first-letter',
        ].map(selector =>
          expect(selectorsProcessor(`${selector} { color: red }`)).rejects.toThrow(
            /Detected pseudo-element/
          )
        )
      )
    })

    it('throws when using unsupported pseudo-classes', () => {
      expect.assertions(6)
      return Promise.all(
        ['.a:matches(b)', '.a:has(b)', '.a:not(b)', '.a:lang(en)', '.a:any(b)', '.a:current'].map(
          selector =>
            expect(selectorsProcessor(`${selector} { color: red }`)).rejects.toThrow(
              /Detected unsupported pseudo-class/
            )
        )
      )
    })

    it('throws when using complex or non class selectors', async () => {
      expect.assertions(8)
      await Promise.all(
        ['div', '[class]', '*'].map(selector =>
          expect(selectorsProcessor(`${selector} { color: red }`)).rejects.toThrow(
            /Invalid selector/
          )
        )
      )
      await Promise.all(
        ['.a[href]', '.a .b', '.a *', '.a > .b', '.a + .b'].map(selector =>
          expect(selectorsProcessor(`${selector} { color: red }`)).rejects.toThrow(
            /Invalid selector/
          )
        )
      )
    })

    it('does not throw when using state-combinator-class selectors', async () => {
      expect.assertions(2)
      await Promise.all(
        [':hover > .foo', ':focus + .foo'].map(selector =>
          expect(selectorsProcessor(`${selector} { color: red }`)).resolves.toEqual(
            expect.objectContaining({ css: `${selector} { color: red }` })
          )
        )
      )
    })

    it('does not throw when using keyframes', async () => {
      expect.assertions(1)
      expect(processor('@keyframes fade {0% { opacity:0 } 100% { opacity:1}}')).resolves.toEqual(
        expect.objectContaining({ css: '@keyframes fade {0% { opacity:0 } 100% { opacity:1}}' })
      )
    })
  })

  it('moves at rules at the end of the file', async () => {
    const src = `
      @media (min-width: 1px) { body { color: red } }
      div { color: red }
      @media (min-width: 10px) { body { color: gree } }
      :hover > .foo { color: red }
    `
    const { css } = await postcss([sortAtRulesPlugin]).process(src, { from: undefined })
    expect(css).toMatchSnapshot()
  })
})
