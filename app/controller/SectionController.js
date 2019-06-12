const BaseController = require('./BaseController')
const User = require('../model/UserModel')
const Section = require('../model/SectionModel')
const { isNumeric } = require('../lib')

class SectionController extends BaseController {
  static async create (req, res) {
    let params = req.body
    if (!params.token || !await User.infoByToken(params.token)) {
      res.notLogged()
    }
    else if (!params.address) {
      res.error('Введи адрес', 41)
    }
    else if (!params.name) {
      res.error('Введи имя', 42)
    }
    else if (!params.description) {
      res.error('Введи описание', 43)
    }
    else if (await Section.exists(params.address)) {
      res.error('Раздел уже существует', 44)
    }
    else {
      let admin = await User.infoByToken(params.token)
      await Section.create(params.address, params.name, params.description, admin.login)
      res.success(await Section.info(params.address))
    }
  }
  static async info (req, res) {
    let params = req.query
    if (!params.address) {
      res.error('Введи адрес', 51)
    }
    else {
      if (await Section.exists(params.address)) {
        let page
        if (!params.page || !isNumeric(params.page)) {
          page = 0
        }
        else {
          page = params.page
        }
        let info = await Section.info(params.address)
        info.posts = await Section.posts(params.address, page)
        info.totalPostsCount = await Section.postsCount(params.address)
        info.totalPagesCount = await Section.postsPages(params.address)
        res.success(info)
      }
      else {
        res.error('Раздел не существует', 52)
      }
    }
  }
  static async list (req, res) {
    res.success(await Section.list())
  }
}

module.exports = SectionController
