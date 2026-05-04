const mongoose = require('mongoose');

const categoryschema = new mongoose.Schema({
    name: {
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
})
const Category = mongoose.model('Category', categoryschema);
module.exports = Category;