const mongoose = require('mongoose')

const Schema = mongoose.Schema

const passportLocalMongoose = require('passport-local-mongoose');


let userSchema = new Schema({
    username: {
        type: String,
        index: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose);


let User = mongoose.model('User', userSchema)


module.exports = User

