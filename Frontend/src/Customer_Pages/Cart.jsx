import React, { useState } from 'react';
import { useShop } from './ShopContext';
import '../Customer_Css/Cart.css'

const Cart = () => {
  const { cartItems, removeFromCart, placeOrder } = useShop();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = () => {
    placeOrder();
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000); 
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {orderPlaced && <div className="order-placed-message">Order placed successfully!</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total: ${calculateTotal()}</p>
            <button className="checkout-button" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
