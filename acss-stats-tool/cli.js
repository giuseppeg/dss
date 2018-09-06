#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const fetch = require('isomorphic-fetch')
const getStats = require('./')

function read(resource) {
  if (/^https?:\/\//.test(resource)) {
    return fetch(resource).then(r => r.text())
  }

  return promisify(fs.readFile)(path.resolve(resource))
}

const resources = [...process.argv.slice(2)]


;(async function () {
  const stats = []
  for (const resource of resources) {
    if (!resources) {
      console.error('Provide a valid path to file or url for ' + resource)
      process.exit(1)
    }

    const content = await read(resource) /* eslint-disable-line no-await-in-loop */
    const s = await getStats(content) /* eslint-disable-line no-await-in-loop */
    stats.push({
      resource,
      stats: s,
    })
  }

  stats.forEach(({ resource, stats }) => {
    console.log(
`
 ==============
| ${resource}
 ==============

Original file:

Size: ${stats.original.size}
Gzipped size: ${stats.original.gzipSize}
Brotli size: ${stats.original.brotliSize}

---

Compiled to atomic CSS classes:

Size: ${stats.atomic.size}
Gzipped size: ${stats.atomic.gzipSize}
Brotli size: ${stats.atomic.brotliSize}
`)
  })
}());
