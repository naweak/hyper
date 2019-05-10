const User = require('../models/user')
const ErrorResponse = require('@naweak/n/lib/error')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params, ip) {
    if (!params.login)
      return new ErrorResponse('Введи логин', 21)
    else if (!params.password)
      return new ErrorResponse('Введи пароль', 22)
    else if (!params.passwordVerify || params.password != params.passwordVerify)
      return new ErrorResponse('Подтверди пароль', 23)
    else {
      let user = new User()
      user.login = params.login
      user.password = params.password
      user.ip = ip
      if (user.info())
        return new ErrorResponse('Юзер уже существует', 24)
      else {
        user.register()
        return new Response(user.info())
      }
    }
  }
}
