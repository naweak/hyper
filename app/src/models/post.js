const db = require('./db')
const config = require('../../config')

class Post {
  info () {
    return db.query("SELECT * FROM posts WHERE id = ?", [this.id])[0]
  }
  exists () {
    return this.info() && !this.info().deleted
  }
  lastPostOfAuthor () {
    return db.query("SELECT * FROM posts WHERE author = ? ORDER BY createDate DESC", [this.author])[0]
  }
  delayExpired () {
    return !this.lastPostOfAuthor()
    || this.lastPostOfAuthor().createDate + (config.delay.post / 1000) < (Date.now() / 1000)
  }
  create () {
    let post = db.query("INSERT INTO posts (author, text, section, createDate, deleted, bumped, type, parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      this.author,
      this.text,
      this.section,
      Date.now() / 1000,
      0,
      Date.now() / 1000,
      this.type,
      this.parent
    ])
    this.id = post.insertId
    console.log(`New post #${this.id} in section /${this.section}/`)
  }
  static list (page) {
    let postsOnPage = config.postsOnPage
    let begin = page * postsOnPage
    return db.query("SELECT * FROM posts WHERE deleted = 0 AND type = 'post' ORDER BY bumped DESC LIMIT ?,?", [
      begin,
      postsOnPage
    ])
  }
  static count () {
    return db.query("SELECT COUNT(*) as count FROM posts WHERE deleted = 0 AND type = 'post'")[0]['count']
  }
  static pagesCount () {
    return Math.trunc(this.count() / config.postsOnPage)
  }
  bump () {
    db.query('UPDATE posts SET bumped = ? WHERE id = ?', [
      Date.now() / 1000,
      this.id
    ])
  }
  static childs (id) {
    let childs = db.query("SELECT * FROM posts WHERE parent = ? AND deleted = 0 AND type = 'comment'", [
      id
    ])
    for (let child in childs) {
      childs[child].childs = this.childs(childs[child].id)
    }
    return childs
  }
}

module.exports = Post
