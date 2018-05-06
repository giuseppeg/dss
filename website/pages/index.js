import Document from '../md/index.md'
import Heading from '../components/heading'
import Layout from '../components/layout'

const components = [1, 2, 3, 4, 5, 6].reduce((components, level) => {
  components[`h${level}`] = props => <Heading level={level} {...props}/>
  return components
}, {})

export default () => <Layout><Document components={components}/></Layout>
