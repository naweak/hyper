const BaseController = require('./BaseController')
const User = require('../model/UserModel')
const db = require('../db')

class UserController extends BaseController {
  static async register (req, res) {
    let params = req.body
    if (!params.login) {
      res.error('Введите логин', 21)
    }
    else if (!params.password) {
      res.error('Введите пароль', 22)
    }
    else if (!params.passwordVerify || params.password != params.passwordVerify) {
      res.error('Подтвердите пароль', 23)
    }
    else {
      let user = await User.info(params.login)
      if (!user) {
        let result = await User.create(
          params.login,
          params.password,
          req.ip
        )
        let newUser = await User.getById(result.insertId)
        delete newUser.password
        delete newUser.ip
        res.success(newUser)
      }
      else {
        res.error('Юзер уже существует', 24)
      }
    }
  }
  static async getToken(req, res) {
    let params = req.query
    if (!params.login) {
      res.error('Введите логин', 31)
    }
    else if (!params.password) {
      res.error('Введите пароль', 32)
    }
    else {
      let canLogin = await User.canLogin(params.login, params.password)
      if (canLogin) {
        let hasToken = await User.hasToken(params.login)
        if (!hasToken) {
          User.addToken(params.login)
        }
        res.success(await User.lastToken(params.login))
      }
      else {
        res.error('Логин или пароль введены неправильно', 33)
      }
    }
  }
  static async info (req, res) {
    let params = req.query
    if (!params.token || !await User.tokenIsValid(params.token)) {
      res.notLogged()
    }
    else {
      let info = await User.infoByToken(params.token)
      delete info.ip
      delete info.password
      res.success(info)
    }
  }
}

module.exports = UserController
