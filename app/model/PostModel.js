const BaseModel = require('./BaseModel')
const db = require('../db')
const config = require('../config')
const Section = require('./SectionModel')

class PostModel extends BaseModel {
  static info (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static async exists (id) {
    let info = await this.info(id)
    let sectionExists = await Section.exists(info.section)
    return info && !info.deleted && sectionExists
  }
  static bump (id) {
    return new Promise((resolve, reject) => {
      db.query("UPDATE posts SET bumped = ? WHERE id = ?", [
        Date.now() / 1000,
        id
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static lastPostOfAuthor (author) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE author = ? ORDER BY createDate DESC", [author], (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static async delayExpired (author) {
    let last = await this.lastPostOfAuthor(author)
    return !last || last.createDate + (config.delay.post / 1000) < (Date.now() / 1000)
  }
  static create (text, section, parent, type, author) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO posts (author, text, section, type, parent, createDate, deleted, bumped) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        author,
        text,
        section,
        type,
        parent,
        Date.now() / 1000,
        false,
        Date.now() / 1000
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static list (page) {
    let begin = page * config.postsOnPage
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE deleted = 0 AND parent = 0 ORDER BY createDate DESC LIMIT ?, ?", [
        begin,
        config.postsOnPage
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static count() {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM posts WHERE deleted = 0 AND parent = 0 ORDER BY createDate DESC", (err, result) => {
        if (err) reject(err)
        resolve(result[0]['count'])
      })
    })
  }
  static async pages () {
    let count = await this.count()
    return Math.trunc(count / config.postsOnPage)
  }
  static childs (id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts WHERE parent = ? AND deleted = 0", [id], async (err, result) => {
        if (err) reject(err)
        for (let index in result) {
          result[index].childs = await this.childs(result[index].id)
        }
        resolve(result)
      })
    })
  }
}

module.exports = PostModel
