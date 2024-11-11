import { configureStore } from '@reduxjs/toolkit'
import countercart from '../slices/cartslice'
import wishlistReducer from '../slices/wishlistslice';

export const store = configureStore({
    reducer: {
        cart: countercart,
        wishlist: wishlistReducer,
    },
})