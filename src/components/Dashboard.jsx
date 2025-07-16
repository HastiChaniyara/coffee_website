import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import ImageSlider from "./ImageSlider";
import Navbar from "./Navbar";
import { Container } from 'react-bootstrap';
import './Styles/AboutUs.css';
import './Styles/FranchisePage.css';
import './Styles/MenuPage.css';
import './Styles/ContactUs.css';
import LocationPage from "./LocationPage";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import FranchisePage from './FranchisePage';

const Dashboard = () => {
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

    const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://coffee-website-83vf.onrender.com/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', subject: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    }
  };
  return (
    <>
      <Navbar />
      <ImageSlider />
      
      
      {/* aboutus section */}
       <div className="about-us-page">
      <div className="hero-section">
        <Container>
          <h1 className="text-center text-black">About Roaster Cultur</h1>
          <p className="text-center text-black">
            Your daily dose of happiness, in a cup.
          </p>
        </Container>
      </div>
        <div className="about-content">

        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            At CoffeeCraft, we're passionate about delivering an unforgettable coffee experience. 
            From ethically sourced beans to artisan brewing methods, every cup tells a story of quality and love. 
            Our journey began in a small neighborhood shop and has grown into a vibrant community of coffee enthusiasts.
          </p>

          <h2>Our Mission</h2>
          <p>
            To serve freshly brewed joy in every cup while supporting sustainable and fair-trade practices around the world.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>🌱 Ethically Sourced Beans</li>
            <li>☕ Expertly Brewed by Passionate Baristas</li>
            <li>🏆 Award-winning Coffee Blends</li>
            <li>💚 Community and Sustainability Focused</li>
          </ul>
        </div>

        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93" alt="Coffee Shop" />
        </div>
      </div>
    </div>

      <br />
      <br />
      <br />
      <br />

{/* FranchisePage section */}
    <FranchisePage /> 
      <br />
      <br />
     

     {/* menu section */}
     <div className="menu-container">
        <h1 className="menu-title">☕ Our Coffee Menu</h1>
        <p className="menu-subtitle">Freshly brewed selections just for you</p>

        <div className="menu-slider">
          <button className="slider-btn" onClick={prevSlide}>&#10094;</button>

          <div className="menu-items">
            {menuItems.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
              <div className="menu-card" key={index} onClick={() => setSelectedItem(item)}>
                <img src={`https://coffee-website-83vf.onrender.com/${item.imageUrl}`} alt={item.name} />
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
            <img src={`https://coffee-website-83vf.onrender.com/${selectedItem.imageUrl}`} alt={selectedItem.name} className="popup-img" />
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


{/* Location page section */}

      <div>
        <LocationPage />
      </div>

      {/* contactus section */}
      <div className="contact-section">
      <h2 className="contact-title">CONTACT US</h2>
      <div className="underline"></div>
      <p className="contact-subtitle">We'd love to hear from you</p>

      <div className="contact-container">
        <div className="contact-info">
          <h3><strong>Roaster Culture Corporate Office</strong></h3>
          <p>
            Roaster Cultur Corporate Office, Nr Surat City Gymkhana, Piplod,<br />
            Surat. (Gujarat) INDIA.<br />
            <strong>Phone:</strong> 0261 2723330
          </p>
          <p><strong>Marketing:</strong> <span className="email">cgm@coffeeculture.co.in</span></p>
          <p><strong>HR:</strong> <span className="email">hr@coffeeculture.co.in</span></p>
          <p><strong>Franchise:</strong> <span className="email">franchise@coffeeculture.co.in</span></p>
        </div>

         <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name (required)" required />
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
      </div>
      <div className="form-row">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email (required)" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone (required)" required />
      </div>
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" required></textarea>
      <button type="submit" className="send-button">Send</button>
    </form>
      </div>
    </div>
    {/* footer section */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
