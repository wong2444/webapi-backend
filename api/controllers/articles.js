const Article = require('../models/article')

const mongoose = require('mongoose')
exports.articles_get_all = (req, res, next) => {
    Article.find({is_delete: false}).skip((req.params.page - 1) * 10).limit(10)
        .populate('author', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                articles: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        body: doc.body,
                        author: doc.author,
                        create_date: doc.create_date,
                        request: {
                            type: 'GET',
                            url: `http://127.0.0.1:3000/articles/${doc._id}`
                        }
                    }
                }),

            })
        }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.articles_create_article = (req, res, next) => {


    // console.log(req.file)
    const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        author: req.userData.userId,
        comments: [],
        // productImage: req.file.path

    })
    article.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Created article success',
            createdArticle: {
                title: result.title,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: `http://127.0.0.1:3000/articles/${result._id}`
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })


    // console.log(req.body)

}

exports.articles_get_article = (req, res, next) => {
    Article.findById(req.params.articleId)
        .populate({path: 'author', select: '_id email name', model: 'User'})
        .populate({
            path: 'comments',
            model: 'Comment',
            match: {'is_delete': false},
            populate: {path: 'author', select: '_id email name', model: 'User'}
        })
        .exec()
        .then(article => {
            if (!article) {
                return res.status(404).json({message: "order not found"})
            }
            res.status(200).json({
                article: article,
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/articles/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.articles_delete_article = (req, res, next) => {
    Article.findById({_id: req.params.articleId})
        .exec()
        .then(result => {
            if (result) {
                result.is_delete = true
                result.save()
                res.status(200).json({
                    message: 'Article deleted',
                    request: {
                        type: 'POST',
                        url: 'http://127.0.0.1:3000/articles/',
                    }
                })
            } else {
                res.status(404).json({
                    message: 'no article',
                })
            }

        }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.articles_update_article = (req, res, next) => {
    const id = req.params.articleId


    Article.findById({_id: id})
        // .populate({path: 'author', select: '_id email name', model: 'User'})
        .exec()
        .then(result => {
            console.log(result)
            // if (result.author._id != req.userData._id) {
            //     res.status(203).json({message: "you no right to edit"})
            // }
            if (result) {
                result.title = req.body.title
                result.body = req.body.body
                result.is_update = true
                result.update_date = Date.now()
                result.save()
                res.status(200).json({
                    message: 'Article updated',
                    request: {
                        type: 'GET',
                        url: `http://127.0.0.1:3000/articles/${id}`
                    }
                })
            } else {
                res.status(404).json({message: "article not found",res:res})
                console.log(res)
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })

}