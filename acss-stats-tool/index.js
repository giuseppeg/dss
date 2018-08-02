const filesize = require('filesize')
const gzipSize = require('gzip-size')
const brotliSize = require('brotli-size')
const mrmuh = require('murmurhash')
const hash = str => mrmuh(str, str.length).toString(36)
const postcss = require('postcss')

exports = module.exports = async function getStats(content) {
  const originalSize = filesize(content.length)
  const atomizedContent = await atomizer(content)


  return {
    original: {
      size: filesize(content.length),
      gzipSize: filesize(gzipSize.sync(content)),
      brotliSize:filesize(brotliSize.sync(content))
    },
    atomic: {
      size: atomizedContent.length,
      gzipSize: filesize(gzipSize.sync(atomizedContent)),
      brotliSize: filesize(brotliSize.sync(atomizedContent)),
    }
  }
}

async function atomizer(src) {
  const processed = {}
  let css = ''

  function plugin() {
    return root => {
      root.walkDecls(decl => {
          if (processed[decl.prop + decl.value]) return
          processed[decl.prop + decl.value] = true
          if (decl.prop.startsWith('-') && !decl.prop.startsWith('--') && css.endsWith('}')) {
            css += `${css.substring(0, -1)}; ${decl.prop}: ${decl.value} }`
          } else {
            css += `.dss_${hash(decl.prop)}-${hash(decl.value)} { ${decl.prop}: ${decl.value} }`
          }
      })
    }
  }

  return await postcss(plugin()).process(src, { from: undefined }).then(() => css)
}

