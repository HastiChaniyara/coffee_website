import React from 'react';
import './Styles/VideoBanner.css';

const VideoBanner = () => {
  return (
    <div className="video-banner-container">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/image_slider/2909914-uhd_3840_2024_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <h1 className="video-title">Welcome to Roaster Cultur</h1>
        <p className="video-subtitle">Brewing perfection since 2004</p>
      </div>
    </div>
  );
};

export default VideoBanner;

