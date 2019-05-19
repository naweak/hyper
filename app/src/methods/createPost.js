const User = require('../models/user')
const NotLogged = require('../models/not-logged')
const ErrorResponse = require('@naweak/n/lib/error')
const Section = require('../models/section')
const Post = require('../models/post')
const Response = require('@naweak/n/lib/response')

module.exports = {
  run (params) {
    let user = new User()
    user.tokenCode = params.token
    if (!user.infoByToken())
      return new NotLogged()
    else if (!params.text)
      return new ErrorResponse('Вставить текст', 71)
    else if (!params.section)
      return new ErrorResponse('Выберите раздел в котором вставить текст', 72)
    else {
      let section = new Section()
      section.address = params.section
      if (!section.info())
        return new ErrorResponse('Раздел не существует', 73)
      else {
        let post = new Post()
        post.text = params.text
        post.section = params.section
        post.author = user.login
        if (!params.parent)
          post.parent = 0
        else
          post.parent = params.parent
        if (post.parent == 0)
          post.type = 'post'
        else {
          post.type = 'comment'
          let parent = new Post()
          parent.id = post.parent
          if (!parent.exists())
            return new ErrorResponse('Выбранный родительский пост не существует', 75)
          else if (parent.info().section != post.section)
            return new ErrorResponse('Выбранный родительский пост написан в другом разделе', 76)
          else
            parent.bump()
        }
        if (post.delayExpired()) {
          post.create()
          return new Response(post.info())
        }
        else
          return new ErrorResponse('Обожди', 74)
      }
    }
  }
}
