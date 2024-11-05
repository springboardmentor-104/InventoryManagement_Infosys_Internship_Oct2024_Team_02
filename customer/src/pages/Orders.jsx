import React from 'react';
import { useShop } from '../contexts/ShopContext';
import './Orders.css';

const Orders = () => {
  const { orderItems } = useShop();

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {orderItems.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <div className="order-items">
          {orderItems.map((item, index) => (
            <div key={index} className="order-item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
