// Modules
const Framework = require('@naweak/n')
const { static } = require('express')
const history = require('connect-history-api-fallback')

// Config
const config = require('./config.js')

// Init app
const parasha = new Framework({
  methodsDir: __dirname + '/src/methods/',
  host: config.host,
  port: config.port
})
parasha.app.use(history())
parasha.app.use(static('../public/dist/'))
parasha.runServer()
