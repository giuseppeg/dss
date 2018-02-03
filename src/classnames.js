function classnames(...classGroups) {
  const groups = classGroups.filter(Boolean)
  const props = {}
  const out = []
  const setVal = propVal => {
    const prop = propVal.substr(0, propVal.indexOf('-'))
    if (!props[prop]) {
      props[prop] = true
      out.push(propVal)
    }
  }
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i]
    if (!group) { continue }
    if (typeof group == 'string') {
      setVal(group)
      continue
    }
    group.forEach(setVal)
  }

  return out.join(' ')
}
