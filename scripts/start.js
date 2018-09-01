'use strict'
require('dotenv').config()

const TERM_SIGNALS = ['SIGINT', 'SIGTERM']
const HOST = process.env.HOST || '0.0.0.0'
const PORT = parseInt(process.env.PORT, 10) || 3000
const IS_INTERACTIVE = process.stdout.isTTY 
const PROTOCOL = process.env.HTTPS ? 'https' : 'http'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

TERM_SIGNALS.forEach(sig => {
  process.on(sig, () => process.exit())
})

const server = require('../web')
const chalk = require('chalk')
const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')
const {prepareUrls} = require('react-dev-utils/WebpackDevServerUtils')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const paths = require('../config/paths')

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log()
}

const urls = prepareUrls(PROTOCOL, HOST, PORT)

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${PORT} ...
    ${chalk.bold('LAN URL')}:   ${chalk.cyan(urls.lanUrlForTerminal)}
    ${chalk.bold('Local URL')}: ${chalk.cyan(urls.localUrlForBrowser)}
  `.trim())
  // openBrowser(urls.localUrlForBrowser)
})
