const Post = require('../models/post')
const Response = require('@naweak/n/lib/response')
const { isNumeric } = require('../../lib')

module.exports = {
  run (params) {
    let page
    if (!params.page || !isNumeric(params.page))
      page = 0
    else
      page = Number(params.page)
    let posts = Post.list(page)
    let count = posts.length
    let totalCount = Post.count()
    return new Response({
      posts,
      count,
      totalCount
    })
  }
}
