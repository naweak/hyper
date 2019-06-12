const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const history = require('connect-history-api-fallback')
const { static } = require('express')
const config = require('./config')

const app = express()
const port = 3000 || process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var requestsInSession = 0

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.success = (success) => {
    res.send({ success })
  }
  res.error = (data, code) => {
    res.send({ error: { data, code } })
  }
  res.notLogged = () => {
    res.error('Не залогинен',  12)
  }
  req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  requestsInSession++
  console.log('Total requests', requestsInSession)
  next()
})

app.use('/api/', apiRouter)
app.use(history())
app.use(static('../public/dist'))

app.listen(config.port, config.host, () => console.log(`Listening on ${config.host}:${config.port}`))
