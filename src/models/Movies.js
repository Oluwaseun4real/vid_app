const mongoose = require('mongoose')
const moviesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   genre: {
       type: genresSchema,
   },
   numberInStock: {
       type: number,
   },

});

module.exports = mongoose.model('movies', moviesSchema)