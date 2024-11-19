import React from 'react';
import { useShop } from '../contexts/ShopContext';
import '../Customer_Css/Wishlist.css'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useShop();

  return (
    <div className="wishlist">
      <h1>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
