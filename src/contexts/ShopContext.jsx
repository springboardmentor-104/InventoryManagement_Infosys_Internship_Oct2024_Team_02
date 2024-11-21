import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Place an order with customer details
  const placeOrder = (customerDetails) => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    const newOrder = {
      customer: customerDetails,
      items: [...cartItems],
      orderDate: new Date().toLocaleString(), // Add a timestamp for the order
    };

    setOrderItems((prevOrders) => [...prevOrders, newOrder]);
    setCartItems([]); // Clear the cart after placing the order
  };

  return (
    <ShopContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      wishlistItems, addToWishlist, removeFromWishlist,
      orderItems, placeOrder,
    }}>
      {children}
    </ShopContext.Provider>
  );
};
