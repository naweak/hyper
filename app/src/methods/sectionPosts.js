const ErrorResponse = require('@naweak/n/lib/error')
const Section = require('../models/section')
const { isNumeric } = require('../../lib')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params) {
    if (!params.section)
      return new ErrorResponse('Не выбран раздел', 81)
    else {
      let section = new Section()
      section.address = params.section
      if (!section.info())
        return new ErrorResponse('Раздел не существует', 82)
      else {
        let page
        if (!params.page || !isNumeric(params.page))
          page = 0
        else
          page = Number(params.page)
        let posts = section.posts(page)
        let count = posts.length
        let totalCount = section.postsCount()
        return new Response({
          count,
          posts,
          totalCount
        })
      }
    }
  }
}
