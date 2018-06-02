import styles from './index.css'
import Link from '../link'
import Head from 'next/head'
import Logo from '../logo'
import Heading from '../heading'
import Navigation from '../navigation'
import { LogoColor, LogoBackground } from '../../theme'

export default class Layout extends React.Component {
  state = {
    isNavigationOpen: false
  }

  toggle = e => {
    e.preventDefault()
    this.setState(({isNavigationOpen}) => ({ isNavigationOpen: !isNavigationOpen }))
  }

  render() {
    const { children, title = 'This is the default title' } = this.props
    const { isNavigationOpen } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>{ title }</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
        </Head>

        <div className={[styles.container]}>
          <div className={[styles.side, isNavigationOpen && styles.sideOpen]}>
            <div className={[styles.logo]}>
              <Logo color={LogoColor} backgroundColor={LogoBackground} />
            </div>
            <div className={[styles.spacer]} />
            <div className={[styles.navigation]}>
              <Navigation open={isNavigationOpen} onPress={this.toggle} className={{ button: styles.navigationButton }} />
            </div>
          </div>
          <main className={[styles.main]}>{ children }</main>
        </div>
      </React.Fragment>
    )
  }
}
