import React from 'react';
import './Styles/ContactUs.css';
import VideoBanner from './VideoBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useState } from 'react';


const ContactUs = () => {
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
    <VideoBanner />
    <Navbar />
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
    <Footer />
    </>
  );
};

export default ContactUs;
