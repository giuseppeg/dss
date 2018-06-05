import styles from './index.css'
import Link from '../link'
import CurrentPath from './CurrentPath'

const NavLink = props => <CurrentPath.Consumer>{
  currentPath =>
    <Link {...props} className={[styles.section, currentPath === props.href && styles.sectionActive]} />
}</CurrentPath.Consumer>

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
        <NavLink href='/supported-css-features'>CSS features and rules</NavLink>
        <NavLink href='/webpack'>Webpack</NavLink>
        <NavLink href='/preprocessors'>SASS and Preprocessors</NavLink>
      </div>
      <NavLink href='/examples'>Examples</NavLink>
    </nav>
  </React.Fragment>
)

export default Navigation
