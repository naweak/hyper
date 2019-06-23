const BaseModel = require('./BaseModel')
const db = require('../db')

class PvdTargetModel extends BaseModel {
  static current () {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM pvd_targets WHERE enabled = 1 ORDER BY createDate DESC LIMIT 0, 1", (err, result) => {
        if (err) reject(err)
        resolve(result[0])
      })
    })
  }
  static create (link, author) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO pvd_targets (link, author, createDate, enabled) VALUES (?, ?, ?, ?)", [
        link,
        author,
        Date.now() / 1000,
        1
      ], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  static async change (link, author) {
    await db.query("UPDATE pvd_targets SET enabled = 0")
    return await this.create(link, author)
  }
}

module.exports = PvdTargetModel
