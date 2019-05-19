const ErrorResponse = require('@naweak/n/lib/error')
const Post = require('../models/post')
const Section = require('../models/section')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params) {
    if (!params.id)
      return new ErrorResponse('Выберите пост', 131)
    else {
      let post = new Post()
      post.id = params.id
      if (post.exists()) {
        let section = new Section()
        section.address = post.info().section
        if (section.info()) {
          let postInfo = post.info()
          if (params.showChilds)
            postInfo.childs = Post.childs(post.id)
          return new Response(postInfo)
        }
        else
          return new ErrorResponse('Раздел, в котором выложен пост, не существует', 133)
      }
      else
        return new ErrorResponse('Пост не существует', 132)
    }
  }
}
