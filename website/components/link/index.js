import _Link from 'next/link'
import styles from './index.css'

const Link = ({children, className = null, target, ...props}) => {
  if (target && target === '_blank') {
    return <a href={props.href} className={[styles.root, className]} target={target}>{children}</a>
  }
  return <_Link {...props}><a className={[styles.root, className]}>{children}</a></_Link>
}

export default Link
