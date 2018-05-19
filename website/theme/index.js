const { generateVariables } = require('./utils')
const { color, fontFamily, fontSize, spacing } = require('./variables')

const theme = {
  Logo: {
    Color: color.Green3
  },
  Heading: {
    Color: color.Green3,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
  },
  Link: {
    Color: color.Green3,
    StateColor: color.Green1,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
  }
}

exports = module.exports = Object.assign(generateVariables(theme), generateVariables({ color, fontFamily, fontSize, spacing }, 'u-'))
