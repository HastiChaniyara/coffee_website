import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/MenuPage.css';
import VideoBanner from './VideoBanner';
import Navbar from './Navbar';
import Footer from './Footer';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 3;

  useEffect(() => {
    axios.get('https://coffee-website-83vf.onrender.com/api/products')
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error("Failed to fetch menu items:", err));
  }, []);

  const nextSlide = () => {
    if (startIndex + itemsPerPage < menuItems.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <VideoBanner />
      <Navbar />

      <div className="menu-container">
        <h1 className="menu-title">☕ Our Coffee Menu</h1>
        <p className="menu-subtitle">Freshly brewed selections just for you</p>

        <div className="menu-slider">
          <button className="slider-btn" onClick={prevSlide}>&#10094;</button>

          <div className="menu-items">
            {menuItems.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
              <div className="menu-card" key={index} onClick={() => setSelectedItem(item)}>
                <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} />
                <div className="menu-overlay">
                  <h3>{item.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-btn" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      {selectedItem && (
        <div className="popup-modal">
          <div className="popup-content">
            <span className="popup-close" onClick={() => setSelectedItem(null)}>&times;</span>
            <img src={`http://localhost:5000/${selectedItem.imageUrl}`} alt={selectedItem.name} className="popup-img" />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <p className="popup-price">₹{selectedItem.price}</p>
            <button
  className="add-btn"
  onClick={() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = storedCart.find(item => item._id === selectedItem._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      storedCart.push({ ...selectedItem, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert("Item added to cart!");
    setSelectedItem(null);
  }}
>
  Add to Cart
</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MenuPage;
