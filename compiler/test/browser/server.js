const http = require('http')
const dss = require('../../').singleton

const port = process.env.PORT || 3000

const requestHandler = (request, response) => {
  let css = ''

  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Request-Method', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST')
  response.setHeader('Access-Control-Allow-Headers', '*')

  request.on('data', data => {
    css += data
  })

  request.on('end', async () => {
    const result = await dss(css, { readableClass: (localName, hash) => `Test-${localName}-${hash}` })
    response.write(JSON.stringify({ classes: result.locals, styles: result.css() }))
    response.end()
  })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
