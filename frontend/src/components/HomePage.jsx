import React from 'react';

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your dashboard where you can manage everything.</p>
      <p className="back-to-login">
          <a href="/">logout</a>
        </p>
    </div>
    
  );
}

export default HomePage;