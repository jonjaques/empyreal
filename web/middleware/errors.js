exports.errors = function errors (opts = {}) {
  return function errorHandler (err, req, res, next) {
    res.status(err.status || 500)
    res.type('text').send(err.stack)
  }
}

exports.notFound = function notFound (opts = {}) {
  return function notFoundHandler (req, res, next) {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  }
}