import { createSlice } from '@reduxjs/toolkit'

const getcartitems = () => {
    const cart = JSON.parse(localStorage.getItem('cartitems'));
    return cart;
}

const getcartvalue = getcartitems();

if (getcartvalue == null) {
    var getcartvalu = [];
} else {
    var getcartvalu = getcartvalue;
}

const initialState = {
    cart: getcartvalu,
}

export const countercart = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addtocart: (state, action) => {
            let data = state.cart.filter((v, i) => v.id == action.payload.id);
            console.log("Filtered data:", data); // Log the actual filtered data
            console.log("Data length:", data.length);

            if (data.length == 0) {
                var cartitems = {
                    id: action.payload._id,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    gender: action.payload.gender,
                    type: action.payload.type,
                    description: action.payload.description,
                    qty: 1
                }

                state.cart.push(cartitems);
                localStorage.setItem('cartitems', JSON.stringify(state.cart));
                console.log("Item added to cart:", cartitems);
            } else {
                state.cart.map((v, i) => {
                    if (v.id == action.payload.id) {
                        v.qty = v.qty + 1;
                    }
                })
                localStorage.setItem('cartitems', JSON.stringify(state.cart));
            }
        },

        removecart: (state, action) => {
            // console.log(action.payload)
            let data = state.cart.filter((v, i) => v.id != action.payload);
            state.cart = data;
            localStorage.setItem('cartitems', JSON.stringify(state.cart));
        },

        emptycart: (state) => {
            localStorage.clear('cartitems')
            state.cart = []
        },

        updatecartaddqty: (state, action) => {
            // console.log(action.payload)
            state.cart.map((v, i) => {
                if (v.id == action.payload) {
                    v.qty = v.qty + 1;
                }
            })
            localStorage.setItem('cartitems', JSON.stringify(state.cart));
        },

        updatecartminusqty: (state, action) => {
            // console.log(action.payload)
            state.cart.map((v, i) => {
                if (v.qty > 1) {
                    v.qty = v.qty - 1;
                }
            })
            localStorage.setItem('cartitems', JSON.stringify(state.cart));
        },

    },
})

// Action creators are generated for each case reducer function
export const { addtocart, removecart, emptycart, updatecartaddqty, updatecartminusqty } = countercart.actions

export default countercart.reducer