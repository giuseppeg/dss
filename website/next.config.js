const withDSS = require('dss-next-dss')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [
      require('remark-slug'),
      require('remark-autolink-headings')
    ]
  }
})

const localIdentName =
  process.env.NODE_ENV === 'production' ? 'DSS-[hash:base32]' : '[name]-[local]--[hash:base32:5]'

module.exports = withMDX(
  withDSS({
    dssLoaderOptions: {
      localIdentName,
      filename: 'static/index.css'
    }
  })
)
