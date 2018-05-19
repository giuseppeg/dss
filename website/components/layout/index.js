import classNames from '@dss/classnames'
import styles from './index.css'
import Link from '../link'
import Head from 'next/head'
import Logo from '../logo'
import Heading from '../heading'
import Navigation from '../navigation'
import { LogoColor } from '../../theme'

export default ({ children, title = 'This is the default title' }) => (
  <React.Fragment>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
    </Head>

    <header>
      <Heading href='/'><Logo color={LogoColor} /> Deterministic Style Sheets</Heading>
    </header>

    <div className={classNames(styles.container)}>
      <div className={classNames(styles.nav)}><Navigation /></div>
      <main className={classNames(styles.main)}>{ children }</main>
    </div>

    <footer>
      {'I`m here to stay'}
    </footer>
  </React.Fragment>
)
