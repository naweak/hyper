const db = require('../models/db')

class Section {
  info () {
    return db.query("SELECT * FROM sections WHERE address = ?", [this.address])[0]
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
