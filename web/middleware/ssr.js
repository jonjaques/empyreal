const path = require('path')

module.exports = function ssr (opts = {}) {
  return function ssrMiddleware (req, res, next) {
    res.sendFile(path.resolve('public/index.html'))
  }
}