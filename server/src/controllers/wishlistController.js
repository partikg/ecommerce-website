const wishlistModel = require('../models/Wishlist');

const getWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;

        const wishlist = await wishlistModel.findOne({ user_id: userId });

        res.status(200).json({
            success: true,
            data: wishlist ? wishlist.products : []
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { product_id, name, image, price } = req.body;

        let wishlist = await wishlistModel.findOne({ user_id: userId });

        if (!wishlist) {
            wishlist = new wishlistModel({
                user_id: userId,
                products: [{ product_id, name, image, price }]
            });
        } else {
            const exists = wishlist.products.find(p => p.product_id === product_id);
            if (!exists) {
                wishlist.products.push({ product_id, name, image, price });
            }
        }

        await wishlist.save();
        res.status(200).json({ success: true, data: wishlist.products });
    } catch (err) {
        res.status(500).json({ message: 'Error adding to wishlist' });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { product_id } = req.body;

        const wishlist = await wishlistModel.findOne({ user_id: userId });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(p => p.product_id !== product_id);
            await wishlist.save();
        }

        res.status(200).json({ success: true, data: wishlist ? wishlist.products : [] });
    } catch (err) {
        res.status(500).json({ message: 'Error removing from wishlist' });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};