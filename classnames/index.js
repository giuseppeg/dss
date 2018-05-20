/* eslint-disable no-var, prefer-arrow-callback */
;(function(root) {
  if (typeof module === 'object' && module.exports) {
    module.exports = classnames
  } else {
    root.classnames = classnames
  }

  function setVal(processed, dssClasses, otherClasses, propValue) {
    var prop
    if (propValue.substr(0, 4) !== 'dss_') {
      otherClasses.push(propValue)
      return
    }
    prop = propValue.substr(0, propValue.indexOf('-'))
    if (!processed[prop]) {
      processed[prop] = true
      dssClasses.push(propValue)
    }
  }

  function classnames() {
    var groups = arguments
    var processed = {}
    var dssClasses = []
    var otherClasses = []

    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i]
      if (!group) {
        continue
      }
      if (typeof group === 'string') {
        setVal(processed, dssClasses, otherClasses, group)
        continue
      }
      group.forEach(function(item) {
        setVal(processed, dssClasses, otherClasses, item)
      })
    }

    return otherClasses.concat(dssClasses).join(' ')
  }
})(typeof self === 'undefined' ? this : self)
