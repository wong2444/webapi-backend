const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const articleRoutes = require('./api/routes/articles')
const commentRoutes = require('./api/routes/comments')
const userRoutes = require('./api/routes/user')
mongoose.connect(`mongodb+srv://root:root@cluster0-zguww.mongodb.net/test?retryWrites=true`, {
    useMongoClient: true
})
//mongodb+srv://root:root@test-zguww.mongodb.net/test?retryWrites=true
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     })
// })
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/articles', articleRoutes)//以products開頭的url轉到此路由處理
app.use('/comments', commentRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app