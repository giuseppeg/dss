/* eslint-disable no-var, prefer-arrow-callback */
;(function(root) {
  if (typeof module === 'object' && module.exports) {
    module.exports = classnames
  } else {
    root.classnames = classnames
  }

  function setVal(processed, out, propValue) {
    var prop
    if (propValue.substr(0, 4) !== 'dss_') {
      return propValue + ' ' + out
    }
    prop = propValue.substr(0, propValue.indexOf('-'))
    if (!processed[prop]) {
      processed[prop] = true
      return out + ' ' + propValue
    }
    return out
  }

  function classnames() {
    var groups = arguments
    var processed = {}
    var out = ''

    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i]
      if (!group) {
        continue
      }
      if (typeof group === 'string') {
        out = setVal(processed, out, group)
        continue
      }
      group.forEach(function(item) {
        out = setVal(processed, out, item)
      })
    }

    return out
  }
})(typeof self === 'undefined' ? this : self)
