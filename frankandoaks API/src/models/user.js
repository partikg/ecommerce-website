const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    email: { type: String },
    mobileno: { type: Number },
    password: { type: String },
    status: { type: Boolean },
    order: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
})

module.exports = mongoose.model('user', userschema)
