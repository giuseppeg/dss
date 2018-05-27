import classNames from '@dss/classnames'
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
    return (
      <React.Fragment>
        <Head>
          <title>{ title }</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
        </Head>

        <div className={classNames(styles.container)}>
          <div className={classNames(styles.side, this.state.isNavigationOpen && styles.sideOpen)}>
            <div className={classNames(styles.logo)}>
              <Logo color={LogoColor} backgroundColor={LogoBackground} />
            </div>
            <div className={classNames(styles.spacer)} />
            <div className={classNames(styles.navigation)}>
              <Navigation open={this.state.isNavigationOpen} onPress={this.toggle} className={{ button: styles.navigationButton }} />
            </div>
          </div>
          <main className={classNames(styles.main)}>{ children }</main>
        </div>
      </React.Fragment>
    )
  }
}
