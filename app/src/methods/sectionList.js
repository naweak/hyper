const Section = require('../models/section')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params, ip) {
    return new Response(Section.list())
  }
}
