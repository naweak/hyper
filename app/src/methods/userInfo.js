const User = require('../models/user')
const Response = require('@naweak/n/lib/response')
const NotLogged = require('../models/not-logged')

module.exports = {
  run (params, ip) {
    let user = new User()
    user.tokenCode = params.token
    let userInfo = user.infoByToken()
    if (!userInfo)
      return new NotLogged()
    else {
      delete userInfo.password
      delete userInfo.ip
      return new Response(userInfo)
    }
  }
}
