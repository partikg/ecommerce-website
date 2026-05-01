const mongoose = require('mongoose');
const Category = require('./categories')
const { Schema } = mongoose;

const salesschema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
        default: 0,
    },
    gender: {
        type: String,
        enum: ['men', 'women', 'unisex'],
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: [String],
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
    qty: {
        type: Number,
        default: 1,
    },
    justIn: {
        type: String,
    },
    daysAgo: {
        type: String,
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


const sales = mongoose.model('sales', salesschema);
module.exports = sales;