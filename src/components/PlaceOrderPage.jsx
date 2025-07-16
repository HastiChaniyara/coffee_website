import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import VideoBanner from './VideoBanner'
import Navbar from './Navbar'
import Footer from './Footer'
import './Styles/PlaceOrderPage.css';
import axios from 'axios';

const PlaceOrderPage = ({ cartItems }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored user:", storedUser); 
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
       console.log("Parsed user from storage:", parsed);
      // setUser({ name: parsed.name, email: parsed.email });
      setUser(parsed); 
    }
  }, []);

  // const getTotal = () => cartItems.reduce((acc, item) => acc + item.price, 0);
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

 const handleConfirm = async () => {
    try {
      const orderData = {
        userId: user?._id,
        address,
        cartItems,
        totalAmount: getTotal(),
      };
      console.log("Sending orderData:", orderData);

      await axios.post('https://coffee-website-83vf.onrender.com/api/orders', orderData);

      alert('Order placed!');
      localStorage.removeItem('cart');
      navigate('/thank-you');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  // const handleConfirm = () => {
  //   alert(`Order placed!`);
  //   setShowPopup(false);
  //   setAddress('');
  //   navigate('/thank-you');
  // };


  return (
    <>
    <VideoBanner />
    <Navbar />
    <div className="order-container">
      <h1 className="order-title">🛍️ Place Your Order</h1>
      <div className="summary-box fade-in">
        <h3>Cart Summary:</h3>
        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total:</strong>
          <strong>₹{getTotal()}</strong>
        </div>
        <button className="place-btn" onClick={() => setShowPopup(true)}>Place Order</button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box slide-up">
            <h2>🚚 Shipping Details</h2>
            <textarea
              placeholder="Enter your shipping address..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            ></textarea>

            <h4>Order Items:</h4>
            <ul className="popup-items">
              {cartItems.map(item => (
                <li key={item.id}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>

            <div className="popup-footer">
              <strong>Total: ₹{getTotal()}</strong>
              <div className="popup-actions">
                <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
                <button onClick={handleConfirm} className="confirm-btn">Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default PlaceOrderPage;
