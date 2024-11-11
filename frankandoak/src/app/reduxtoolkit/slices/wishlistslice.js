import { createSlice } from '@reduxjs/toolkit';

// Load wishlist items from localStorage
const getWishlistItems = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems'));
    return wishlist;
};

const getwishlistvalue = getWishlistItems();

if (getwishlistvalue == null) {
    var getwishlistvalu = [];
} else {
    var getwishlistvalu = getwishlistvalue;
}

const initialState = {
    wishlist: getwishlistvalu,
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // Add to Wishlist
        addToWishlist: (state, action) => {
            const itemExists = state.wishlist.filter((item, i) => item.id === action.payload.id);
            console.log("Filtered data:", itemExists);
            console.log("Data length:", itemExists.length);

            if (itemExists.length == 0) {
                const wishlistItems = {
                    id: action.payload._id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    gender: action.payload.gender,
                    type: action.payload.type,
                    description: action.payload.description,
                    qty: 1
                };

                state.wishlist.push(wishlistItems);
                localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
                console.log('Item added to wishlist:', wishlistItems);
            } else {
                console.log('Item already in wishlist:', action.payload.name);
                state.wishlist.map((item, i) => {
                    if (item.id == action.payload.id) {
                        item.qty = item.qty + 1;
                    }
                })
                localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));

            }
        },

        // Remove from Wishlist
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
            console.log('Item removed from wishlist:', action.payload);
        },


        // Clear Wishlist
        clearWishlist: (state) => {
            state.wishlist = [];
            localStorage.removeItem('wishlistItems');
            console.log('Wishlist cleared');
        },
    },
});

// Export actions and reducer
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
