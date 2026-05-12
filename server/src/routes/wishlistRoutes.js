const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.get('/:userId', getWishlist);
router.post('/:userId/add', addToWishlist);
router.post('/:userId/remove', removeFromWishlist);

module.exports = router;