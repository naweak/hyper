const BaseModel = require('./BaseModel')
const db = require('../db')
const config = require('../config')

class SectionModel extends BaseModel {
  static info (address) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM sections WHERE address = ?", [address], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static async exists (address) {
    return await this.info(address)
  }
  static create (address, name, description, admin) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO sections (address, name, description, admin, createDate) VALUES (?, ?, ?, ?, ?)", [
        address,
        name,
        description,
        admin,
        Date.now() / 1000
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static list () {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM sections ORDER BY createDate DESC', (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static posts (address, page) {
    let begin = page * config.postsOnPage
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE section = ? AND deleted = 0 AND parent = 0 ORDER BY createDate DESC LIMIT ?, ? ", [
        address,
        begin,
        config.postsOnPage
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static postsCount (address) {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM posts WHERE section = ? AND deleted = 0 AND parent = 0", [
        address
      ], (err, result) => {
        if (err) reject(err)
        resolve(result[0].count)
      })
    })
  }
  static async postsPages (address) {
    let postsCount = await this.postsCount(address)
    return Math.trunc( postsCount / config.postsOnPage)
  }
}

module.exports = SectionModel
