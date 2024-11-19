import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import '../Customer_Css/Cart.css'


function OrderSummary() {
    const dispatch=useDispatch();
    const products=useSelector((store)=>store.cart.products);
    const { selectedItems,
        totalPrice,
        grandTotal}=useSelector((store)=>store.cart);
    
  return (
    <div className="cart-summary">
    <h2>Order Summary</h2>
    <p>Selected items: {selectedItems}</p>
    <p>Total: ${totalPrice.toFixed(2)}</p>
  
   <div className=" pb-6">
      {" "}
       
        <button
          onClick={(e) => {
            e.stopPropagation();
            makePayment();
          }}
          className="wd-full bg-green-600 px-3 py-1.5 text-white  mt-5 rounded-md flex justify-end items-end"
        >
          <div className="mr-2 text-xl font-bold">Place Order</div>
         
        </button>
   </div>
   
   </div>
  )
}

export default OrderSummary
