const mongoose = require('mongoose')

const Schema = mongoose.Schema

let movieSchema = new Schema({
    title: String,
    tmdb_id: {
        type: String,
        index: true,
        unique: true
    },
    user: String
})

let Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
