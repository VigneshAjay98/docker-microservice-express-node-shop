const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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

userSchema.set('versionKey', false)

const Product = mongoose.model('products', productSchema)

module.exports = Product