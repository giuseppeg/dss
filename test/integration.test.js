const dss = require('../')
const classNames = require('../classnames')

const render = html => {
  const fragment = document.createElement('div')
  fragment.innerHTML = html
  const el = fragment.children[0]
  document.body.appendChild(el)
  return {
    node: el,
    cleanup: () => {
      document.body.removeChild(el)
    }
  }
}

describe('integrations', () => {
  let cls, cls2, styleElement, cleanup
  beforeEach(async () => {
    cls = await dss(`
      .a { color: red }
      .b { color: green }
      .a:hover { color: yellow }
    `)
    styleElement = document.createElement('style')
    styleElement.textContent = dss.css()
    document.head.appendChild(styleElement)
  })
  afterEach(() => {
    document.head.removeChild(styleElement)
    cleanup()
  })

  it('applies styles in order', () => {
    const r1 = render(`
      <div class="${classNames(cls.b, cls.a)}"></div>
    `)
    const r2 = render(`
      <div class="${classNames(cls.a, cls.b)}"></div>
    `)
    cleanup = () => {
      r1.cleanup()
      r2.cleanup()
    }
    expect(getComputedStyle(r1.node, null).getPropertyValue('color')).toBe(
      'red'
    )
    expect(getComputedStyle(r2.node, null).getPropertyValue('color')).toBe(
      'green'
    )
  })
})
