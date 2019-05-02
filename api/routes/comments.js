const express = require('express')



const router = express.Router()
const checkAuth = require('../middleware/checkauth')
const CommentsController = require('../controllers/comments')




// const upload = multer({dest: 'uploads/'})








router.post('/', checkAuth, CommentsController.comments_create_comment)



router.put('/:commentId',checkAuth ,CommentsController.comments_update_comment)


router.delete('/:commentId',checkAuth ,CommentsController.comments_delete_comment)

module.exports = router