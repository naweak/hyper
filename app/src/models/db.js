const MySQL = require('sync-mysql')
const config = require('../../config.js') // Suka
const
  host = config.mysqlHost
  user = config.mysqlUser
  password = config.mysqlPassword
  database = config.mysqlName
const db = new MySQL({ host, user, password, database })

module.exports = db
