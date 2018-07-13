import DefaultApp, { Container } from 'next/app'
import Layout from '../components/layout'
import components from '../components/markdown'
import Analytics from '../components/analytics'
import CurrentPath from '../components/navigation/CurrentPath'

export default class App extends DefaultApp {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  compomentDidMount() {}

  render() {
    const { Component, pageProps, router: { route } } = this.props
    const meta = Component.meta || {}

    return (
      <Analytics id="UA-9670480-10" route={route}>
        <Container>
          <CurrentPath.Provider value={route}>
            <Layout title={meta.title}>
              <Component {...pageProps} components={components} />
            </Layout>
          </CurrentPath.Provider>
        </Container>
      </Analytics>
    )
  }
}
