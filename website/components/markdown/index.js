import Heading from '../heading'
import Link from '../link'

const headings = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading {...props} level={level} />
  return components
}, {})

export default {
  ...headings,
  a: Link,
}
