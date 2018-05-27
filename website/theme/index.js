const { generateVariables } = require('./utils')
const { borderRadius, color, fontFamily, fontSize, spacing } = require('./variables')

const theme = {
  Logo: {
    Color: color.Green3,
    Background: color.White1,
    Size: fontSize[0]
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
    Size: fontSize[1]
  },
  SideBar: {
    BackgroundColor: color.Green3,
    StateBackgroundColor: color.Green1,
    Color: color.White1,
    Spacing: spacing[2]
  }
}

exports = module.exports = Object.assign(generateVariables(theme), generateVariables({ borderRadius, color, fontFamily, fontSize, spacing }, 'u-'))
