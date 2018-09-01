module.exports = function dev(opts = {}) {
  return function devMiddleware (req, res, next) {
    next()
  }
}