import classNames from '@dss/classnames'
import styles from './index.css'

export default ({children}) => <body className={classNames(styles.root)}>{children}</body>
