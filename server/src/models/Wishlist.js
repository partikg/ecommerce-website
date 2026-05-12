const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product_id: String,
                name: String,
                image: [String],
                price: String,
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);