import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
};

const saveToLocalStorage = (cart) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('cartitems', JSON.stringify(cart));
    }
};

export const countercart = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCart: (state, action) => {
            state.cart = action.payload;
        },

        addtocart: (state, action) => {
            const selectedQty = action.payload.qty || 1;

            let existing = state.cart.find(v => v.id == action.payload._id);

            if (!existing) {
                const cartitems = {
                    id: action.payload._id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    gender: action.payload.gender,
                    type: action.payload.type,
                    description: action.payload.description,
                    qty: selectedQty
                };

                state.cart.push(cartitems);
            } else {
                 existing.qty += selectedQty;
            }

            saveToLocalStorage(state.cart);
        },

        removecart: (state, action) => {
            state.cart = state.cart.filter(v => v.id != action.payload);
            saveToLocalStorage(state.cart);
        },

        emptycart: (state) => {
            state.cart = [];
            if (typeof window !== "undefined") {
                localStorage.removeItem('cartitems');
            }
        },

        updatecartaddqty: (state, action) => {
            const item = state.cart.find(v => v.id == action.payload);
            if (item) item.qty += 1;
            saveToLocalStorage(state.cart);
        },

        updatecartminusqty: (state, action) => {
            const item = state.cart.find(v => v.id == action.payload);
            if (item && item.qty > 1) item.qty -= 1;
            saveToLocalStorage(state.cart);
        },
    },
})

export const {
    addtocart,
    removecart,
    emptycart,
    updatecartaddqty,
    updatecartminusqty,
    setCart
} = countercart.actions;

export default countercart.reducer;