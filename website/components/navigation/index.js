import classNames from '@dss/classnames'
import styles from './index.css'
import Link from '../link'

const NavLink = props => <Link {...props} className={[classNames(styles.section)]} />

const Navigation = ({open, onPress}) => (
  <React.Fragment>
    <button aria-label="Toggle menu" aria-controls="navigation-menu" aria-expanded={open} onClick={onPress} className={classNames(styles.button, open && styles.buttonOpen)}>
      <span className={classNames(styles.buttonLine)} />
      <span className={classNames(styles.buttonLine)} />
      <span className={classNames(styles.buttonLine)} />
    </button>
    <nav aria-label="Main navigation" id="navigation-menu" aria-hidden={!open} className={classNames(styles.menu, open && styles.menuOpen)}>
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
  </React.Fragment>
)

export default Navigation
