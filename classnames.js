/* eslint-disable no-var, prefer-arrow-callback */
;(function(root) {
  if (typeof module === 'object' && module.exports) {
    module.exports = classnames
  } else {
    root.classnames = classnames
  }

  function setVal(processed, classes, propValue) {
    var prop = propValue.substr(0, propValue.indexOf('-'))
    if (!processed[prop]) {
      processed[prop] = true
      classes.push(propValue)
    }
  }

  function classnames() {
    var groups = Array.prototype.slice.call(arguments).filter(Boolean)
    var processed = {}
    var classes = []

    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i]
      if (!group) {
        continue
      }
      if (typeof group === 'string') {
        setVal(processed, classes, group)
        continue
      }
      group.forEach(function(item) {
        setVal(processed, classes, item)
      })
    }

    return classes.join(' ')
  }
})(typeof self === 'undefined' ? this : self)
