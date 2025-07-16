import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/FranchisePage.css';

const FranchisePage = () => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate('/FranchiseKnowMorePage');
  };
  return (
    <div
      className="franchise-section"
      style={{ backgroundImage: `url(././public/image_slider/coffee-15994_1280.jpg)` }}
    >
      <div className="overlay">
        <div className="franchise-content">
          <h1 className="fade-in">Franchise</h1>
          <p className="fade-in delay">
            If your ideology meets our vision, Coffee Culture offers you to be an owner of your own outlet.
          </p>
          <p className="fade-in delay">
            <strong>Contact:</strong> <span className="contact-number">(+91-70431-13330)</span>
          </p>
          <button className="know-more-button slide-in" onClick={handleKnowMore}>KNOW MORE...</button>
        </div>

        <div className="franchise-stats fade-in delay-2">
          <div><h2>17+</h2><p>Years</p></div>
          <div><h2>20+</h2><p>Cities</p></div>
          <div><h2>30+</h2><p>Outlets</p></div>
        </div>
      </div>
    </div>
  );
};

export default FranchisePage;
