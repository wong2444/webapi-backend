const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},//{match:} 正則
    name: {type: String,},
    password: {type: String, required: true},
    favor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
})
module.exports = mongoose.model('User', userSchema)
