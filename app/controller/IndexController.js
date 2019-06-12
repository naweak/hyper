const BaseController = require('./BaseController')

class IndexController extends BaseController {
  static async default (req, res) {
    // TODO all posts
    res.success('мать шлюха')
  }
}

module.exports = IndexController
