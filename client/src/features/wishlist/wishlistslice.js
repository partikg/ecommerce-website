import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {

        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },

        addToWishlist: (state, action) => {
            const itemExists = state.wishlist.find(
                (item) => item.product_id === action.payload.product_id
            );

            if (!itemExists) {
                state.wishlist.push(action.payload);
            }
        },

        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(
                item => item.product_id !== action.payload
            );
        },

        clearWishlist: (state) => {
            state.wishlist = [];
        },
    },
});

export const {
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;