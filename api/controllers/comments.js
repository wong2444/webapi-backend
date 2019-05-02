const Comment = require('../models/comment')

const Article = require('../models/article')

const mongoose = require('mongoose')


exports.comments_create_comment = (req, res, next) => {


    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.body,
        author: req.userData.userId,
        article: req.body.articleId,
        // productImage: req.file.path

    })
    comment.save().then(result => {
        console.log(result)

        Article.findById(req.body.articleId, function (err, data) {
            console.log(data)
            data.comments.push(result._id)
            data.save()
        });
        res.status(201).json({
            message: 'Created comment success',
            createdComment: {
                title: result.body,
                _id: result._id,

            }
        })

    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


    // console.log(req.body)

}


exports.comments_delete_comment = (req, res, next) => {
    Comment.findById({_id: req.params.commentId})
        .exec()
        .then(result => {
            if (result) {
                result.is_delete = true
                result.save()
                res.status(200).json({
                    message: 'Comment deleted',

                })
            } else {
                res.status(404).json({
                    message: 'no comment',
                })
            }

        }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.comments_update_comment = (req, res, next) => {
    const id = req.params.commentId


    Comment.findById({_id: id})
        .exec()
        .then(result => {
            console.log(result)
            if (result) {

                result.body = req.body.body
                result.is_update = true
                result.update_date = Date.now()
                result.save()
                res.status(200).json({
                    message: 'Comment updated',

                })
            } else {
                res.status(404).json({message: "article not found"})
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })

}