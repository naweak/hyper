const Section = require('../models/section')
const Response = require('@naweak/n/lib/response')
const ErrorResponse = require('@naweak/n/lib/error')

module.exports = {
  run (params) {
    if (!params.address)
      return new ErrorResponse('Введи адрес', 51)
    else {
      let section = new Section()
      section.address = params.address
      return section.info() ? new Response(section.info()) : new ErrorResponse('Раздел не существует', 52)
    }
  }
}
