import Document from '../md/test.md'
import Heading from '../components/heading'

const components = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading level={level} {...props} />
  return components
}, {})

export default () => <Document components={components} />
