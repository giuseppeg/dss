import Link from '../link'
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
  return <Link href={href} className={className} target={target}>{children}</Link>
}

export default ({children, className = defaultClassName, level = 1, size = 1, href = null, target = '_self', autolink = true}) => {
  const Tag = `h${level}`
  if (!href && autolink && level > 1) {
    href = '#' + children.toLowerCase().replace(/[^a-z]/g, '-')
  }
  return (
    <Wrap href={href} target={target} className={className.link}>
      <Tag className={[styles.tag, href && styles.link, ...className.tag]}>
        <span id={href && href.slice(1)} className={[styles.content, styles[`size${size}`], ...className.content]}>{children}</span>
      </Tag>
    </Wrap>
  )
}
