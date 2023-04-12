const mongoose = require('mongoose')
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    isGold: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('customer',customerSchema)