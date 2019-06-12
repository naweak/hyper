const Router = require('express').Router
var router = Router()
const UserController = require('../controller/UserController')
const SectionController = require('../controller/SectionController')
const PostController = require('../controller/PostController')

router.get('/user', UserController.info)
router.post('/user/register', UserController.register)
router.get('/user/getToken', UserController.getToken)

router.get('/section', SectionController.info)
router.post('/section/create', SectionController.create)
router.get('/section/list', SectionController.list)

router.post('/post/create', PostController.create)
router.get('/post', PostController.info)

router.use('/', PostController.list)

module.exports = router
