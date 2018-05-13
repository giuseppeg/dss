import Link from 'next/link'
import Head from 'next/head'
import Logo from '../logo'
import Heading from '../heading'
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
      <nav>
        <Link href='/'><a>Home</a></Link>
        <Link href='/about'><a>About</a></Link>
        <Link href='/contact'><a>Contact</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      {'I`m here to stay'}
    </footer>
  </React.Fragment>
)
