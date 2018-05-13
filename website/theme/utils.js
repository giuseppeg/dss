function generateVariables(variables, prefix = '') {
  return Object.keys(variables).reduce((vars, prop) => {
    const propVal = variables[prop]
    if (Array.isArray(propVal)) {
      propVal.forEach((val, index) => {
        vars[`${prefix}${prop}${index+1}`] = val
      })
    } else {
      Object.keys(propVal).forEach(subProp => {
        // colorWhite1
        vars[`${prefix}${prop}${subProp}`] = propVal[subProp]
      })
    }
    return vars
  }, {})
}

exports = module.exports = {
  generateVariables,
}
