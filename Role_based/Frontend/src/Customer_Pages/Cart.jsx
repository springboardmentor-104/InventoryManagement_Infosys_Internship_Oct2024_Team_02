import React, { useState } from 'react';

import '../Customer_Css/Cart.css';
import { useSelector,useDispatch } from 'react-redux';
import OrderSummary from '../Customer_Pages/OrderSummary'
import {removeFromCart,updateQuantity} from '../redux/features/cartSlice';
import { clearCart } from '../redux/features/cartSlice';

const Cart = () => {
  const products=useSelector((state)=>state.cart.products);
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    // console.log(id)
    const payload = { type, id }
    dispatch(updateQuantity(payload))
  }
  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };
  const handleClearCart=()=>{
    dispatch(clearCart());
}
 

  return (
    <div className="cart">
      <div className="cart-container">
      <div className='cart-head'>
      <h1>Your Cart ({products.length} items)</h1>
      <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
          className="bg-red-500 px-3 py-3 text-white  mt-2 rounded-md flex justify-between items-center mb-5 text-xl font-bold"
        >
          <span className="mr-2">Clear Cart</span>

          <i className="ri-delete-bin-7-line"></i>
        </button>
      </div>
      {products.length === 0 ? (
        <p className='font-bold text-xl '>Your cart is empty.</p>
      ) : (
         
        products.map((item,index)=>(
            
              <div key={index} className="cart-item">
                <div className="item-details">           
                  <div className='product-info'>
                    <div className='product-img'><img src={item.image} alt="" /></div>
                  
                    <p className='product-name'>{item.name}</p>
                  <p>${Number(item.price).toFixed(2)}</p>
                  </div>
                  <div className="quantity-selector">
                  <button onClick={() => handleQuantity("decrement", item._id)}
                      className="size-12 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 text-xl hover:bg-red-500 hover:text-white ">
                        -</button>
                  <span>{item.quantity}</span>
                  <button
                      onClick={() => handleQuantity("increment", item._id)}
                      className="size-12 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700  hover:bg-red-500 hover:text-white"
                    >
                      +
                    </button>
                    <button
                        onClick={(e) => handleRemove(e, item._id)}
                        className="text-red-500 hover:text-red-700 mr-4 text-xl font-bold">Remove</button>
                </div>
                 
                </div>
              
               
               
               
              </div>
              
            ))
      
         
      
           )}
       
     </div>

     {/*calculate*/}
     {
         products.length > 0 && (
          <OrderSummary/>
     )}
    </div>
    
  );
};

export default Cart;