// Modules
const Framework = require('@naweak/n')

// Config
const config = require('./config.js')

// Init app
const parasha = new Framework({
  methodsDir: __dirname + '/src/methods/',
  host: config.host,
  port: config.port
})
parasha.app.use('/', (req, res) => {
  res.send('Main')
})
parasha.runServer()
