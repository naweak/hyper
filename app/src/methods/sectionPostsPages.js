const ErrorResponse = require('@naweak/n/lib/error')
const Section = require('../models/section')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params) {
    if (!params.section)
      return new ErrorResponse('Не выбран раздел', 101)
    else {
      let section = new Section()
      section.address = params.section
      if (!section.info())
        return new ErrorResponse('Раздел не существует', 102)
      else
        return new Response(section.postsPagesCount())
    }
  }
}
