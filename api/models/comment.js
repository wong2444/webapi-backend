const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    body: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    is_delete: {type: Boolean, default: false},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    is_update: {type: Boolean, default: false}
})
module.exports = mongoose.model('Comment', commentSchema)