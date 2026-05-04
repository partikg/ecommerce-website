const mongoose = require('mongoose');
const Category = require('./categories')
const { Schema } = mongoose;

const womenschema = new mongoose.Schema({
    name: {
        type: String,
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


const women = mongoose.model('women', womenschema);
module.exports = women;