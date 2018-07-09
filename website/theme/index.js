const { generateVariables } = require('./utils')
const { borderRadius, color, fontFamily, fontSize, spacing } = require('./variables')

const theme = {
  Logo: {
    Color: color.White,
    Background: color.Blue,
    Size: fontSize[0],
  },
  Heading: {
    Color: color.Blue,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
    FontWeight: 'normal',
  },
  Link: {
    Color: color.Blue,
    StateColor: color.Blue1,
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
  },
  NavigationButton: {
    Color: color.Blue,
    StateColor: color.Blue1,
    BorderRadius: borderRadius[5],
    Size: fontSize[1],
  },
  SideBar: {
    BackgroundColor: color.Gray,
    StateBackgroundColor: color.Gray3,
    Color: color.Blue1,
    Spacing: spacing[1],
    // LogoSize - NavigationButtonSize
    NavigationSpacing: fontSize[0] - fontSize[1],
  },
  Main: {
    BackgroundColor: color.Gray,
    ContentBackgroundColor: color.White,
    Color: color.Blue1,
    Spacing: spacing[0],
  },
  MarkdownP: {
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
  },
  MarkdownCode: {
    FontSize: fontSize[3] - borderRadius[4] / 2,
    FontFamily: fontFamily.Monospace,
    Color: color.Blue1,
    BackgroundColor: color.Blue6,
    Spacing: borderRadius[4],
    BorderRadius: borderRadius[4],
  },
  MarkdownUL: {
    FontSize: fontSize[3],
    FontFamily: fontFamily.Base,
    ListStyle: 'square',
  },
}

exports = module.exports = Object.assign(
  generateVariables(theme),
  generateVariables({ borderRadius, color, fontFamily, fontSize, spacing }, 'u-')
)
