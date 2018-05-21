import classNames from '@dss/classnames'
import styles from './index.css'
import Link from '../link'

const NavLink = props => <Link {...props} className={[classNames(styles.section)]} />

export default class Navigation extends React.PureComponent {
  state = {
    isOpen: false
  }

  toggle = e => {
    e.preventDefault()
    this.setState(({isOpen}) => ({ isOpen: !isOpen }))
  }

  render() {
    const {isOpen} = this.state

    return (
      <React.Fragment>
        <button aria-label="Toggle menu" aria-controls="navigation-menu" aria-expanded={isOpen} onClick={this.toggle} className={classNames(styles.button, isOpen && styles.buttonOpen)}>
          <span className={classNames(styles.buttonLine)} />
          <span className={classNames(styles.buttonLine)} />
          <span className={classNames(styles.buttonLine)} />
        </button>
        <nav aria-label="Main navigation" id="navigation-menu" aria-hidden={!isOpen} className={classNames(styles.menu, isOpen && styles.menuOpen)}>
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
  }
}
