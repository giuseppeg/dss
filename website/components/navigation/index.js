import styles from './index.css'
import Link from '../link'

const NavLink = props => <Link {...props} className={[styles.section]} />

const Navigation = ({open, onPress, className = { button: null }}) => (
  <React.Fragment>
    <button aria-label="Toggle menu" aria-controls="navigation-menu" aria-expanded={open} onClick={onPress} className={[styles.button, className.button, open && styles.buttonOpen]}>
      <span className={[styles.buttonLine]} />
      <span className={[styles.buttonLine]} />
      <span className={[styles.buttonLine]} />
    </button>
    <nav aria-label="Main navigation" id="navigation-menu" aria-hidden={!open} className={[styles.menu, open && styles.menuOpen]}>
      <NavLink href='/'>About</NavLink>
      <NavLink href='/usage'>Usage</NavLink>
      <NavLink href='/#features'>Features</NavLink>
      <div className={[styles.section, styles.subSection]}>
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
