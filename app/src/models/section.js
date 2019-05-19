const db = require('../models/db')
const config = require('../../config')

class Section {
  info () {
    return db.query("SELECT * FROM sections WHERE address = ?", [this.address])[0]
  }
  posts (page) {
    let postsOnPage = config.postsOnPage
    let begin = page * postsOnPage
    return db.query("SELECT * FROM posts WHERE deleted = 0 AND section = ? AND type = 'post' ORDER BY bumped DESC LIMIT ?,?", [
      this.address,
      begin,
      postsOnPage
    ])
  }
  postsCount () {
    return db.query("SELECT COUNT(*) AS count FROM posts WHERE deleted = 0 AND section = ? AND type = 'post'", [this.address])[0]['count']
  }
  postsPagesCount () {
    return Math.trunc(this.postsCount() / config.postsOnPage)
  }
  create () {
    db.query("INSERT INTO sections (address, name, description, admin, createDate) VALUES (?, ?, ?, ?, ?)", [
      this.address,
      this.name,
      this.description,
      this.admin,
      Date.now() / 1000
    ])
  }
  static list () {
    return db.query("SELECT * FROM sections ORDER BY createDate DESC")
  }
}

module.exports = Section
