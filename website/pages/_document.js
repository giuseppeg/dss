import Document, { Head, Main, NextScript } from 'next/document'
import Body from '../components/body'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <style>{`* { box-sizing: border-box; }`}</style>
          <link rel="stylesheet" href="/_next/static/index.css" />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    )
  }
}
