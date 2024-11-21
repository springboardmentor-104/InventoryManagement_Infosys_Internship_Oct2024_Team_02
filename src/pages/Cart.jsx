import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, placeOrder } = useShop();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // State for order confirmation message
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const openCheckoutForm = () => {
    setIsCheckoutOpen(true);
  };

  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill all customer details');
      return;
    }

    placeOrder(customerDetails); // Place the order with customer details
    setOrderPlaced(true); // Show confirmation message
    setIsCheckoutOpen(false);
    setCustomerDetails({ name: '', phone: '', address: '' });

    // Hide the message after 3 seconds
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="cart">
      <h1>Your Cart ({cartItems.length} items)</h1>

      {/* Order confirmation message */}
      {orderPlaced && <div className="order-placed-message">Order placed successfully!</div>}

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h2>{item.name}</h2>
                  {item.details && <p className="item-details-info">{item.details}</p>}
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
                <div className="quantity-selector">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
                <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: ₹{calculateTotal()}</p>
            <p>Sales Tax: ₹{(calculateTotal() * 0.1).toFixed(2)}</p> {/* Assuming 10% tax */}
            <p>Total: ₹{(calculateTotal() * 1.1).toFixed(2)}</p> {/* Subtotal + tax */}
            <button className="checkout-button" onClick={openCheckoutForm}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="checkout-popup">
          <div className="checkout-form">
            <h2 className="checkout-title">Enter Your Details</h2>
            <label className="checkout-label">
              Name:
              <input
                className="checkout-input"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={customerDetails.name}
                onChange={handleInputChange}
              />
            </label>
            <label className="checkout-label">
              Phone:
              <input
                className="checkout-input"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={customerDetails.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="checkout-label">
              Address:
              <textarea
                className="checkout-textarea"
                name="address"
                placeholder="Enter your address"
                value={customerDetails.address}
                onChange={handleInputChange}
              />
            </label>
            <button className="confirm-button" onClick={handleSubmit}>
              Continue to payment
            </button>
            <button className="cancel-button" onClick={() => setIsCheckoutOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
