const express = require('express')


const router = express.Router()
const checkAuth = require('../middleware/checkauth')
const ArticlesController = require('../controllers/articles')


// const upload = multer({dest: 'uploads/'})


router.get('/', ArticlesController.articles_get_all)


router.post('/', checkAuth, ArticlesController.articles_create_article)

router.get('/:articleId', ArticlesController.articles_get_article)

router.put('/:articleId', checkAuth, ArticlesController.articles_update_article)


router.delete('/:articleId', checkAuth, ArticlesController.articles_delete_article)

module.exports = router