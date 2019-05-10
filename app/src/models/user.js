const db = require('./db')
const md5 = require('md5')
const { arrayLast, random } = require('../../lib.js')
const EXPIRES_IN = 604800000

class User {
  info () {
    return db.query("SELECT * FROM users WHERE login = ?", [this.login || ''])[0]
  }
  register () {
    db.query("INSERT INTO users (login, password, joindate, ugroup, ip) VALUES (?, ?, ?, ?, ?)", [
      this.login,
      md5(this.password),
      Date.now() / 1000,
      'users',
      this.ip
    ])
    console.log(`New user ${this.login}!`)
  }
  canLogin () {
    let password = md5(this.password)
    let can = db.query("SELECT * FROM users WHERE login = ? AND password = ?", [
      this.login,
      password
    ])[0]
    return can
  }
  tokens () {
    let tokens = db.query("SELECT * FROM tokens WHERE login = ?", [this.login])
    return tokens
  }
  lastToken () {
    let tokens = this.tokens()
    return arrayLast(tokens)
  }
  hasToken () {
    let token = this.lastToken()
    return token && token.expires > Date.now() / 1000 && this.info()
  }
  addToken () {
    db.query("INSERT INTO tokens (code, login, expires, createDate) VALUES (?, ?, ?, ?)", [
      random(64),
      this.login,
      (Date.now() + EXPIRES_IN) / 1000,
      Date.now() / 1000
    ])
  }
  tokenByCode () {
    let code = this.tokenCode || null
    return db.query("SELECT * FROM tokens WHERE code = ?", [code])[0]
  }
  infoByToken () {
    let token = this.tokenByCode()
    if (token && token.expires > (Date.now() / 1000))
      this.login = token.login
    return this.info()
  }
}

module.exports = User
