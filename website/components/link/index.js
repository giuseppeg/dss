import _Link from 'next/link'
import classNames from '@dss/classnames'
import styles from './index.css'

const Link = ({children, className = [], target, ...props}) => (
  <_Link {...props}><a className={classNames(styles.root, ...className)} target={target}>{children}</a></_Link>
)

export default Link
