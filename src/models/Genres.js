const mongoose = require('mongoose')
const genresSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
})


module.exports = mongoose.model('genres',genresSchema)