import DefaultApp, { Container } from 'next/app'
import Layout from '../components/layout'
import components from '../components/markdown'
import CurrentPath from '../components/navigation/CurrentPath'

export default class App extends DefaultApp {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const {
      Component,
      pageProps,
      router: { route },
    } = this.props

    return (
      <Container>
        <CurrentPath.Provider value={route}>
          <Layout>
            <Component {...pageProps} components={components} />
          </Layout>
        </CurrentPath.Provider>
      </Container>
    )
  }
}
