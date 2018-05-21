const { generateVariables } = require('./utils')
const { borderRadius, color, fontFamily, fontSize, spacing } = require('./variables')

const theme = {
  Logo: {
    Color: color.Green3
  },
  Heading: {
    Color: color.Green3,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
    FontWeight: 'normal',
  },
  Link: {
    Color: color.Green3,
    StateColor: color.Green1,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
  },
  NavigationButton: {
    Color: color.Green3,
    StateColor: color.Green1,
    BorderRadius: borderRadius[5],
    Size: fontSize[2]
  }
}

exports = module.exports = Object.assign(generateVariables(theme), generateVariables({ borderRadius, color, fontFamily, fontSize, spacing }, 'u-'))
