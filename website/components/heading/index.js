import classNames from '@dss/classnames'
import styles from './index.css'

const Wrap = ({children, href, target}) => {
  if (!href) { return children }
  return <a className={styles.link} href={href} target={target}>{children}</a>
}

export default ({children, level = 1, size = 1, href = null, target = '_self'}) => {
  const Tag = `h${level}`
  return (
    <Wrap href={href} target={target}>
      <Tag className={classNames(styles.root)}>
        <span className={classNames(styles[`size${size}`])}>{children}</span>
      </Tag>
    </Wrap>
  )
}
