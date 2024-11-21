import React from 'react';
import { useShop } from '../contexts/ShopContext';
import './Orders.css';

const Orders = () => {
  const { orderItems } = useShop();

  const calculateItemTotal = (item) => (item.price * item.quantity).toFixed(2);

  const calculateGrandTotal = () =>
    orderItems.reduce((acc, order) => acc + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), 0).toFixed(2);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {orderItems.length === 0 ? (
        <p className="empty-orders">No orders have been placed yet.</p>
      ) : (
        <div className="orders-container">
          {orderItems.map((order, index) => (
            <div key={index} className="order-card">
              <h2>Order #{index + 1}</h2>
              <div className="customer-details">
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-card">
                    <div className="order-item-header">
                      <h3 className="order-item-name">{item.name}</h3>
                      <span className="order-item-details">{item.details}</span>
                    </div>
                    <div className="order-item-info">
                      <p className="order-item-info-label">Price:</p>
                      <p className="order-item-info-value">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="order-item-info">
                      <p className="order-item-info-label">Quantity:</p>
                      <p className="order-item-info-value">{item.quantity}</p>
                    </div>
                    <div className="order-item-info">
                      <p className="order-item-info-label">Total:</p>
                      <p className="order-item-info-value">₹{calculateItemTotal(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <h3>Order Total: ₹
                  {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </h3>
              </div>
            </div>
          ))}
          <div className="grand-total">
            <h2>Grand Total: ₹{calculateGrandTotal()}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
