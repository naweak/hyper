const NotLogged = require('../models/not-logged')
const ErrorResponse = require('@naweak/n/lib/error')
const Response = require('@naweak/n/lib/response')
const User = require('../models/user')
const Section = require('../models/section')

module.exports = {
  run (params, ip) {
    let user = new User()
    user.tokenCode = params.token
    if (!user.infoByToken())
      return new NotLogged()
    else if (!params.address)
      return new ErrorResponse('Введи адрес', 41)
    else if (!params.name)
      return new ErrorResponse('Введи имя', 42)
    else if (!params.description)
      return new ErrorResponse('Введи описание', 43)
    else {
      let section = new Section()
      section.address = params.address
      section.name = params.name
      section.description = params.description
      section.admin = user.login
      if (!section.info()) {
        section.create()
        return new Response(section.info())
      }
      else
        return new ErrorResponse('Раздел уже существует', 44)
    }
  }
}
