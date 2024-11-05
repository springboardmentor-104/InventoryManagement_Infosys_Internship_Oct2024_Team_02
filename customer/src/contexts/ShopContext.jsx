import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

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

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const placeOrder = () => {
    setOrderItems([...orderItems, ...cartItems]);
    setCartItems([]);  
  };

  return (
    <ShopContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      wishlistItems, addToWishlist, removeFromWishlist,
      orderItems, placeOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};
