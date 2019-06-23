const BaseModel = require('./BaseModel')
const db = require('../db')
const md5 = require('md5')
const { arrayLast, random } = require('../lib')

class UserModel extends BaseModel {
  static info (login) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE login = ?", [login], (err, result, fields) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static create (login, password, ip) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users (login, password, ip, joinDate, ugroup) VALUES (?, ?, ?, ?, ?)", [
        login,
        md5(password),
        ip,
        Date.now() / 1000,
        'users'
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static getById (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static canLogin (login, password) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE login = ? AND password = ?", [login, md5(password)], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static tokens (login) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tokens WHERE login = ?", [
        login
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static async lastToken (login) {
    let tokens = await this.tokens(login)
    return arrayLast(tokens)
  }
  static tokenInfo(code) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tokens WHERE code = ?", [code], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static async tokenIsValid (token) {
    if (typeof token == 'string') {
      token = await this.tokenInfo(token)
    }
    return token && token.expires > Date.now() / 1000 && await this.info(token.login)
  }
  static async hasToken (login) {
    let lastToken = await this.lastToken(login)
    let tokenIsValid = await this.tokenIsValid(lastToken)
    return lastToken && tokenIsValid
  }
  static addToken(login) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO tokens (login, code, expires, createDate) VALUES (?, ?, ?, ?)", [
        login,
        random(64),
        (Date.now () / 1000) + 604800,
        Date.now() / 1000
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static async infoByToken (token) {
    if (typeof token == 'string') {
      token = await this.tokenInfo(token)
    }
    return await this.info(token.login)
  }
  static async groups (login) {
    let info = await this.info(login)
    return info.ugroup.split(',')
  }
  static async inGroup (login, group) {
    let groups = await this.groups(login)
    return groups.indexOf(group) > -1
  }
  static async isAdmin (login) {
    return await this.inGroup(login, 'admins')
  }
}

module.exports = UserModel
