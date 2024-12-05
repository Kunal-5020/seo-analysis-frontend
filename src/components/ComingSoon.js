import React from 'react';
import './ComingSoon.css';  // Import the global CSS file

const ComingSoon = () => {
  return (
    <div className="comingSoonContainer">
      <div className="title">
        <h1>Coming Soon!</h1>
        <p>We are working hard to bring something amazing. Stay tuned!</p>
      </div>
      <div className="animationContainer">
        <div className="animatedElement"></div>
      </div>
      <div className="footer">
        <p>© 2024 Your Company Name. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default ComingSoon;
