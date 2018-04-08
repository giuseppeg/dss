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

describe.only('integrations', () => {
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

  it('works', () => {
    const r = render(`
      <div className="${classNames(cls.b, cls.a)}">hi</div>
    `)
    cleanup = r.cleanup
    const {node} = r
    const styles = getComputedStyle(node, null)
    console.log(styles.getPropertyValue('color'))
  })
})
