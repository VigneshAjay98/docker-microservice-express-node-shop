const mongoose = require('mongoose')

const Product = mongoose.model('products', {
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cart_id: {
        type: Number,
    }
})

module.exports = Product
