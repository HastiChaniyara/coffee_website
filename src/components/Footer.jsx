// import React from 'react';
// import './Styles/Footer.css';
// import { Link } from 'react-router-dom';


// const Footer = () => {
//   return (
//     <footer className="footer-section">
//       <div className="footer-container">
//         <div className="footer-logo">
//           <h2>Roaster Cultur</h2>
//           <p>Brewing moments, one cup at a time.</p>
//         </div>

//         <div className="footer-links">
//           <h4>Quick Links</h4>
//           <ul>
// <li><Link to="/MenuPage">Our Menu</Link></li>
//     <li><Link to="/HomePage">Home</Link></li>
//     <li><Link to="/AboutUs">About Us</Link></li>
//     <li><Link to="/FranchiseKnowMorePage">Franchise</Link></li>
//     <li><Link to="/CartPage">View Cart</Link></li>
//     <li><Link to="/MyOrderPage">My Orders</Link></li>
//     <li><Link to="/ContactUs">Contact</Link></li>
//           </ul>
//         </div>

//         <div className="footer-contact">
//           <h4>Contact Us</h4>
//           <p>Nr Surat City Gymkhana, Piplod, Surat</p>
//           <p>Gujarat, INDIA</p>
//           <p>Phone: 0261 2723330</p>
//           <p>Email: info@coffeeculture.co.in</p>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} Coffee Culture. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import './Styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Logo and Tagline */}
        <div className="footer-column">
          <h2 className="footer-logo-text">Roaster Cultur</h2>
          <p className="footer-tagline">Brewing moments, one cup at a time.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/HomePage">Home</Link></li>
            <li><Link to="/MenuPage">Our Menu</Link></li>
            <li><Link to="/AboutUs">About Us</Link></li>
            <li><Link to="/FranchiseKnowMorePage">Franchise</Link></li>
            <li><Link to="/CartPage">View Cart</Link></li>
            <li><Link to="/MyOrderPage">My Orders</Link></li>
            <li><Link to="/ContactUs">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>📍 Nr Surat City Gymkhana, Piplod, Surat, Gujarat, INDIA</p>
          <p>📞 0261 2723330</p>
          <p>✉️ info@coffeeculture.co.in</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Coffee Culture. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
