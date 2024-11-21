import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-container">
    <h1>Welcome to InvenTrackUp</h1>
    <p>Navigate through products, add to cart, wishlist, and manage your orders!</p>

    {/* Link to navigate to the customer profile page */}
    <Link to="/profile" className="profile-link">
      Go to Profile
    </Link>
  </div>
);

export default Home;
