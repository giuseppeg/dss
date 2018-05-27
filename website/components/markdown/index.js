import Heading from '../heading'
import Link from '../link'
import classNames from '@dss/classnames'
import styles from './index.css'

const headings = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading {...props} level={level} />
  return components
}, {})

const p = ({children, ...props}) => {
  console.log(children)
  return <p className={classNames(styles.p)}>{children}</p>
}

const Code = ({className = [], isBlock = true, ...props}) => {
  return <code {...props} className={classNames(styles.code, isBlock ? styles.codeBlock : styles.inlineCodeBlock, className)} />
}

const inlineCode = props => <Code {...props} isBlock={false} />

const ul = ({children}) => <ul className={classNames(styles.ul)}>{children}</ul>

export default {
  ...headings,
  a: Link,
  p,
  inlineCode,
  code: Code,
  ul,
}
