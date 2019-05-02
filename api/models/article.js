const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    is_delete: {type: Boolean, default: false},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    is_update: {type: Boolean, default: false},
    area: {type: String}
})
module.exports = mongoose.model('Article', articleSchema)