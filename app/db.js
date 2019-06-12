const mysql = require('mysql')
const config = require('./config')

const db = mysql.createConnection({
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlName
})

module.exports = db
