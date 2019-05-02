const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next) => {
    User.find({$or: [{email: req.body.email}, {name: req.body.name}]})
        .exec()
        .then(user => {
            if (user.length > 1) {
                return res.status(409).json({
                    message: 'Mail exists or Name exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            favor: []
                        })
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })


}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: `Auth failed`
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: `Auth failed`
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,

                    }, 'secret', {
                        expiresIn: "1h",

                    })
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        userId: user[0]._id,
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


exports.add_user_favour = (req, res, next) => {
    User.find({email: req.userData.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: `Auth failed`
                })
            } else {
                console.log(user)
                user[0].favor.push('5cc0424adc26ae560ce2b053')
                user[0].save()

            }
            res.status(200).json({
                message: 'add favour successful',
            })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


exports.delete_user_favour = (req, res, next) => {
    User.find({email: req.userData.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: `Auth failed`
                })
            } else {
                var index = user[0].favor.indexOf(req.params.articleId);
                if (index > -1) {
                    user[0].favor.splice(index, 1);
                }
                user[0].save()

            }
            res.status(200).json({
                message: 'delete favour successful',
            })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


// exports.user_delete = (req, res, next) => {
//     User.remove({_id: req.params.userId})
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'user deleted'
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
//}