import DefaultApp, {Container} from 'next/app'
import Layout from '../components/layout'
import components from '../components/markdown'

export default class App extends DefaultApp {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Layout>
          <Component {...pageProps} components={components} />
        </Layout>
      </Container>
    )
  }
}
