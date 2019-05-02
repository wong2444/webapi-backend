const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkauth')

const UserController = require('../controllers/users')

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)


router.post('/:articleId', checkAuth, UserController.add_user_favour)
router.delete('/:articleId', checkAuth, UserController.delete_user_favour)


module.exports = router