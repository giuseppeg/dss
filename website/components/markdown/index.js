import Heading from '../heading'
import Link from '../link'
import classNames from '@dss/classnames'
import styles from './index.css'

const headings = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading {...props} level={level} />
  return components
}, {})

const p = ({children}) => <p className={classNames(styles.p)}>{children}</p>

const code = ({className = [], ...props}) => {
  const isBlock = className.some(c => c.indexOf('language-') === 0)
  return <code {...props} className={classNames(styles.code, isBlock && styles.codeBlock, className)} />
}

export default {
  ...headings,
  a: Link,
  p,
  code,
}
