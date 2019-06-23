const BaseController = require('./BaseController')
const PvdTarget = require('../model/PvdTargetModel')
const PvdChat = require('../model/PvdChatModel')
const User = require('../model/UserModel')
const { isNumeric } = require('../lib')

class PvdController extends BaseController {
  static async target (req, res) {
    let target = await PvdTarget.current()
    if (!target) {
      res.error('Цели нет', 121)
    }
    else {
      res.success(target)
    }
  }
  static async changeTarget (req, res) {
    let params = req.body
    if (!params.token || !await User.tokenIsValid(params.token)) {
      res.notLogged()
    }
    else {
      let user = await User.infoByToken(params.token)
      if (!await User.isAdmin(user.login)) {
        res.error('Не админ', 161)
      }
      else if (!params.link) {
        res.error('Вставить ссылку', 162)
      }
      else {
        let user = await User.infoByToken(params.token)
        PvdTarget.change(params.link, user.login).then(async () => {
          res.success(await PvdTarget.current())
        })
      }
    }
  }
  static async createChatMessage (req, res) {
    let params = req.body
    if (!params.token || !await User.tokenIsValid(params.token)) {
      res.notLogged()
    }
    else if (!params.text) {
      res.error('Вставить текст', 131)
    }
    else {
      let author = await User.infoByToken(params.token)
      if (await PvdChat.delayExpired(author.login)) {
        let created = await PvdChat.createMessage(params.text, author.login)
        let info = await PvdChat.info(created.insertId)
        res.success(info)
      }
      else {
        res.error('Обожди', 132)
      }
    }
  }
  static async chatMessages (req, res) {
    let params = req.query
    let page
    if (!params.page || !isNumeric(params.page)) {
      page = 0
    }
    else {
      page = params.page
    }
    let result = {
      messages: await PvdChat.messages(page),
      count: await PvdChat.messagesCount(),
      totalPagesCount: await PvdChat.totalPages()
    }
    res.success(result)
  }
  static async default (req, res) {
    let params = req.query
    let page
    if (!params.page || !isNumeric(params.page)) {
      page = 0
    }
    else {
      page = params.page
    }
    let result = {
      target: await PvdTarget.current() || null,
      chat: {
        messages: await PvdChat.messages(page),
        count: await PvdChat.messagesCount(),
        totalPagesCount: await PvdChat.totalPages()
      }
    }
    res.success(result)
  }
}

module.exports = PvdController
