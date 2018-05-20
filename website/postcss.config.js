module.exports = {
  plugins: [
    require('postcss-easy-import')(),
    require('postcss-simple-vars')({ variables: () => require('./theme') })
  ],
  sourceMap: false
}
