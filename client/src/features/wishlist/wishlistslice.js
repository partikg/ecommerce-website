import { createSlice } from '@reduxjs/toolkit';

const getWishlistItems = () => {
    if (typeof window !== "undefined") {
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems'));
        return wishlist || [];
    }
    return [];
};

const initialState = {
    wishlist: getWishlistItems(),
};

const saveToLocalStorage = (wishlist) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
    }
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {

        addToWishlist: (state, action) => {
            const itemExists = state.wishlist.find(
                (item) => item.id === action.payload._id
            );

            if (!itemExists) {
                const wishlistItem = {
                    id: action.payload._id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    gender: action.payload.gender,
                    type: action.payload.type,
                    description: action.payload.description,
                    qty: 1
                };

                state.wishlist.push(wishlistItem);
            } else {
                itemExists.qty += 1;
            }

            saveToLocalStorage(state.wishlist);
        },

        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(
                item => item.id !== action.payload
            );

            saveToLocalStorage(state.wishlist);
        },

        clearWishlist: (state) => {
            state.wishlist = [];

            if (typeof window !== "undefined") {
                localStorage.removeItem('wishlistItems');
            }
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;