import _Link from 'next/link'
import styles from './index.css'

const Link = ({children, className = null, target, ...props}) => (
  <_Link {...props}><a className={[styles.root, className]} target={target}>{children}</a></_Link>
)

export default Link
