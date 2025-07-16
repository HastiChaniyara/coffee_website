// ThankYouPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/HomePage');
  };

  return (
    <div className="thankyou-container" style={{ backgroundImage: `url(././public/image_slider/coffee-15994_1280.jpg)` }}>
      <div className="thankyou-box">
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your coffee is on its way. ☕</p>
        <button className="home-btn" onClick={handleBackHome}>🏠 Back to Home</button>
      </div>
    </div>
  );
};

export default ThankYouPage;
