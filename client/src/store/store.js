import { configureStore } from '@reduxjs/toolkit'
import countercart from '../features/cart/cartslice'
import wishlistReducer from '../features/wishlist/wishlistslice';

export const store = configureStore({
    reducer: {
        cart: countercart,
        wishlist: wishlistReducer,
    },
})