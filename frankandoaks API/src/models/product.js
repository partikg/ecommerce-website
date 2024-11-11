const mongoose = require('mongoose');
const Category = require('./categories')
const { Schema } = mongoose;

const productschema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "please select name"],
        // minLength: [2, 'must be minimun 2 characters'],
        // // maxLength: 10,
        // match: /^[a-zA_Z ']{2,10}$/
        // enum: ['man', 'woman']
    },
    price: {
        type: String,
        default: 0,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        // required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
        default: ''
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
})


const Product = mongoose.model('Product', productschema);
module.exports = Product;