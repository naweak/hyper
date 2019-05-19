const ErrorResponse = require('@naweak/n/lib/error')
const Post = require('../models/post')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run () {
    return new Response(Post.pagesCount())
  }
}
