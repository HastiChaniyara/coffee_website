import React from 'react';
import './Styles/LocationPage.css';

const LocationPage = () => {
  return (
    <section className="location-section">
      <div className="location-header">
        <h1>Our Location</h1>
        <div className="underline"></div>
        <p>Visit us and experience the true aroma of Coffee Culture.</p>
      </div>

      <div className="location-content">
        <div className="location-info">
          <h2>Roaster Cultur Corporate Office</h2>
          <p>Nr Surat City Gymkhana, Piplod, Surat (Gujarat), INDIA</p>
          <p>Phone: 0261 2723330</p>
          <p>Email: info@coffeeculture.co.in</p>
        </div>

        <div className="location-map">
          <iframe
            title="Coffee Culture Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.875947205996!2d72.81229897498188!3d21.19966178046402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e933ad0ce5f%3A0x635a9b34eb0c9f86!2sCoffee%20Culture%20Surat!5e0!3m2!1sen!2sin!4v1717580254381!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationPage;
