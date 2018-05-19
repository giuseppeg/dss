import Document from '../md/index.md'
export default ({components}) => {
  console.log(components)
  return <Document components={components} />
}
