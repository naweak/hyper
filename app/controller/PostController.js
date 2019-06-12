const BaseController = require('./BaseController')
const User = require('../model/UserModel')
const Section = require('../model/SectionModel')
const Post = require('../model/PostModel')
const { isNumeric } = require('../lib')

class PostController extends BaseController {
  static async create (req, res) {
    let params = req.body
    if (!params.token || !await User.tokenIsValid(params.token)) {
      res.notLogged()
    }
    else if (!params.text) {
      res.error('Вставить текст', 71)
    }
    else if (!params.section) {
      res.error('Выберите раздел в котором вставить текст', 72)
    }
    else if (!await Section.exists(params.section)) {
      res.error('Разлел не существует', 73)
    }
    else {
      let parent
      let type
      if (!params.parent) {
        parent = 0
      }
      else {
        parent = params.parent
      }
      if (parent == 0) {
        type = 'post'
      }
      else {
        type = 'comment'
        if (!await Post.exists(parent)) {
          res.error('Выбранный родительский пост не существует', 75)
          return
        }
        else {
          let postInfo = await Post.info(parent)
          console.log(postInfo)
          if (params.section != await postInfo.section) {
            res.error('Выбранный родительский пост написан в другом разделе', 76)
            return
          }
          else {
            Post.bump(parent)
          }
        }
      }
      let author = await User.infoByToken(params.token)
      if (await Post.delayExpired(author.login)) {
        let createdPost = await Post.create(
          params.text,
          params.section,
          parent,
          type,
          author.login
        )
        createdPost = await Post.info(createdPost.insertId)
        res.success(createdPost)
      }
      else {
        res.error('Обожди', 74)
      }
    }
  }
  static async list (req, res) {
    let params = req.query
    let page
    if (!params.page || !isNumeric(params.page)) {
      page = 0
    }
    else {
      page = params.page
    }
    let posts = await Post.list(page)
    let count = await Post.count()
    let totalPages = await Post.pages()
    res.success({
      posts,
      count,
      totalPages
    })
  }
  static async info (req, res) {
    let params = req.query
    if (!params.id) {
      res.error('Выбери пост', 111)
    }
    else if (!await Post.exists(params.id)) {
      res.error('Пост не существует', 112)
    }
    else {
      let postInfo = await Post.info(params.id)
      if (params.showChilds) {
        postInfo.childs = await Post.childs(params.id)
      }
      res.success(postInfo)
    }
  }
}

module.exports = PostController
