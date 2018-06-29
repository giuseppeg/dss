import Heading from '../heading'
import Link from '../link'
import styles from './index.css'

const headings = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading {...props} level={level} size={level} />
  return components
}, {})

const p = ({children, ...props}) => <p className={[styles.p]}>{children}</p>

const Code = ({className = [], isBlock = true, ...props}) =>
  <code {...props} className={[styles.code, isBlock ? styles.codeBlock : styles.inlineCodeBlock, className]} />

const inlineCode = props => <Code {...props} isBlock={false} />

const ul = ({children}) => <ul className={[styles.ul]}>{children}</ul>

export default {
  ...headings,
  a: Link,
  p,
  inlineCode,
  code: Code,
  ul,
}
