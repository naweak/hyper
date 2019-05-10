const ErrorResponse = require('@naweak/n/lib/error')
const User = require('../models/user')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params, ip) {
    if (!params.login)
      return new ErrorResponse('Введи логин', 31)
    else if (!params.password)
      return new ErrorResponse('Введи пароль', 32)
    else {
      let user = new User()
      user.login = params.login
      user.password = params.password
      if (!user.canLogin())
        return new ErrorResponse('Логин или пароль введены неправильно', 33)
      else {
        if (!user.hasToken())
          user.addToken()
        return new Response(user.lastToken())
      }
    }
  }
}
