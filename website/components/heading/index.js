import Link from 'next/link'
import classNames from '@dss/classnames'
import styles from './index.css'

const defaultClassName = {
  link: [],
  tag: [],
  content: [],
}

const Wrap = ({children, className, href, target}) => {
  if (!href) {
    return children
  }
  return <Link href={href}><a className={classNames(styles.link, ...className)} target={target}>{children}</a></Link>
}

export default ({children, className = defaultClassName, level = 1, size = 1, href = null, target = '_self'}) => {
  const Tag = `h${level}`
  return (
    <Wrap href={href} target={target} className={className.link}>
      <Tag className={classNames(styles.tag, ...className.tag)}>
        <span className={classNames(styles.content, styles[`size${size}`], ...className.content)}>{children}</span>
      </Tag>
    </Wrap>
  )
}
