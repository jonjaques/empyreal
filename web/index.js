const Express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const {json, urlencoded} = require('body-parser')
const dev = require('./middleware/dev')
const ssr = require('./middleware/ssr')
const {errors, notFound} = require('./middleware/errors')

const app = Express()
module.exports = app

app.use(compression())
app.use(favicon('public/favicon.ico'))
app.use(json())
app.use(urlencoded({extended: false}))
app.use('/public',
  Express.static('build'),
  Express.static('public', {fallthrough: false}))

if (process.env.NODE_ENV === 'development') {
  app.use(dev())
}

app.get('/*', ssr())
app.use(notFound())
app.use(errors())