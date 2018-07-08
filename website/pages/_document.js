import Document, { Head, Main, NextScript } from 'next/document'
import Body from '../components/body'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <title>Deterministic Style Sheets</title>

          <style>{`* { box-sizing: border-box; }`}</style>
          <link rel="stylesheet" href="/_next/static/index.css" />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />

          <meta
            name="description"
            content="DSS is like CSS Modules but styles are compiled to atomic CSS classes which thanks to a helper resolve deterministically."
          />
          <meta name="image" content="/static/dss.png" />

          <meta itemprop="name" content="Deterministic Style Sheets" />
          <meta
            itemprop="description"
            content="DSS is like CSS Modules but styles are compiled to atomic CSS classes which thanks to a helper resolve deterministically."
          />
          <meta itemprop="image" content="/static/dss.png" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Deterministic Style Sheets" />
          <meta
            name="twitter:description"
            content="DSS is like CSS Modules but styles are compiled to atomic CSS classes which thanks to a helper resolve deterministically."
          />
          <meta name="twitter:site" content="@giuseppegurgone" />
          <meta name="twitter:image:src" content="/static/dss.png" />

          <meta name="og:title" content="Deterministic Style Sheets" />
          <meta
            name="og:description"
            content="DSS is like CSS Modules but styles are compiled to atomic CSS classes which thanks to a helper resolve deterministically."
          />
          <meta name="og:image" content="/static/dss.png" />
          <meta name="og:site_name" content="Deterministic Style Sheets" />
          <meta name="og:locale" content="en_US" />
          <meta name="og:type" content="website" />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    )
  }
}
