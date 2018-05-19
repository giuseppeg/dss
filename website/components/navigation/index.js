import classNames from '@dss/classnames'
import styles from './index.css'
import Link from '../link'

const NavLink = props => <Link {...props} className={[classNames(styles.section)]} />

export default () => (
  <nav>
    <NavLink href='/'>About</NavLink>
    <NavLink href='/usage'>Usage</NavLink>
    <NavLink href='/#features'>Features</NavLink>
    <div className={classNames(styles.section, styles.subSection)}>
      <NavLink href='/atomic-css'>Atomic CSS</NavLink>
      <NavLink href='/how-it-works'>Determinism</NavLink>
      <NavLink href='/classnames-helper'>The classNames helper</NavLink>
      <NavLink href='/supported-css-features'>CSS subset</NavLink>
      <NavLink href='/webpack'>Webpack</NavLink>
      <NavLink href='/preprocessors'>SASS and Preprocessors</NavLink>
    </div>
    <NavLink href='/examples'>Examples</NavLink>
  </nav>
)
