import styles from './index.css'
import Link from '../link'
import Head from 'next/head'
import Logo from '../logo'
import Heading from '../heading'
import Navigation from '../navigation'
import Playground from '../playground'
import { LogoColor, LogoBackground } from '../../theme'

export default class Layout extends React.Component {
  media = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1150px)') : null

  onMedia = ({matches}) => {
    if (!this.state.isNavigationOpen && matches) {
      this.setState({isNavigationOpen: true})
    }
    if (this.state.isNavigationOpen && !matches) {
      this.setState({isNavigationOpen: false})
    }
  }

  state = {
    isNavigationOpen: false
  }

  toggle = e => {
    e.preventDefault()
    this.setState(({isNavigationOpen}) => ({ isNavigationOpen: !isNavigationOpen }))
  }

  componentDidMount() {
    this.media = window.matchMedia('(min-width: 1150px)')
    this.media.addListener(this.onMedia)
    this.onMedia({ matches: this.media.matches })
  }

  componentWillUnmount() {
    this.media.removeListener(this.onMedia)
  }

  render() {
    const { children, title = 'Deterministic StyleSheets' } = this.props
    const { isNavigationOpen } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>{ `DSS | ${title}` }</title>
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
          <main className={[styles.main]}>
            <div className={[styles.mainContent]}>
              <iframe
                className={[styles.starOnGithub]}
                src="https://ghbtns.com/github-btn.html?user=giuseppeg&repo=dss&type=star&count=true"
                frameBorder="0"
                scrolling="0"
              />
              { children }
              <div className={[styles.playground]}><Playground /></div>
            </div>
          </main>
        </div>
      </React.Fragment>
    )
  }
}
