import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[],
  selectedItems:0,
  totalPrice:0,
  grandTotal:0
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const isExist=state.products.find(
                (product)=>product._id===action.payload.id);
            if(!isExist){
                state.products.push({...action.payload,quantity:1})
            }else{
                console.log("Item is added already");
            };
            state.selectedItems = selectSelectedItems(state);
            state.totalPrice = selectTotalPrice(state);
            state.grandTotal = selectGrandTotal(state);
        },
        updateQuantity: (state, action) => {
            const products = state.products.map((product) => {
              if (product._id === action.payload.id) {
                if (action.payload.type === "increment") {
                  product.quantity += 1;
                } else if (action.payload.type === "decrement") {
                  if (product.quantity > 1) {
                    product.quantity -= 1;
                  }
                }
              }
              return product;
            });
            state.selectedItems = selectSelectedItems(state);
            state.totalPrice = selectTotalPrice(state);
            state.grandTotal = selectGrandTotal(state);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(
              (product) => product._id !== action.payload.id
            );
            state.selectedItems = selectSelectedItems(state);
            state.totalPrice = selectTotalPrice(state);
            state.grandTotal = selectGrandTotal(state);
        },
        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.grandTotal = 0;
        },
    },
});

export const selectSelectedItems = (state) =>
    state.products.reduce((total, product) => {
      return Number(total + product.quantity);
    }, 0);

export const selectTotalPrice = (state) =>
    state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
    }, 0);



export const selectGrandTotal = (state) => {
    return selectTotalPrice(state) ;
  };

export const {addToCart, updateQuantity, removeFromCart, clearCart }=cartSlice.actions;


export default cartSlice.reducer;