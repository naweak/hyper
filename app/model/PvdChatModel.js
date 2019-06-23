const BaseModel = require('./BaseModel')
const db = require('../db')
const config = require('../config')

class PvdChatModel extends BaseModel {
  static lastMessageOfAuthor (author) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM pvd_chat WHERE author = ? ORDER BY createDate DESC LIMIT 0, 1", [
        author
      ], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static async delayExpired (author) {
    let last = await this.lastMessageOfAuthor(author)
    return !last || last.createDate + (config.pvd.chat.delay / 1000) < (Date.now()  / 1000)
  }
  static createMessage (text, author) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO pvd_chat (text, author, createDate) VALUES (?, ?, ?)", [
        text,
        author,
        Date.now() / 1000
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static info (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM pvd_chat WHERE  id = ?", [id], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static messages (page) {
    let begin = page * config.pvd.chat.messagesOnPage
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM pvd_chat ORDER BY createDate DESC LIMIT ?, ?", [
        begin,
        config.pvd.chat.messagesOnPage
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static messagesCount () {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS count FROM pvd_chat", (err, result) => {
        if (err) reject(err)
        resolve(result[0]['count'])
      })
    })
  }
  static async totalPages () {
    let count = await this.messagesCount()
    return Math.trunc(count / config.pvd.chat.messagesOnPage)
  }
}

module.exports = PvdChatModel
