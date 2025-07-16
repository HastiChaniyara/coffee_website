import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import './StylesAdmin/Dashboard.css';

const Header = () => {
  const handleLogout = () => {
    // Clear tokens, user data, etc. — adjust as needed
    localStorage.clear();
    window.location.href = '/Admin'; // or use useNavigate() if using react-router
  };

  return (
    <div className="header">
      <h2>Welcome to Coffee Dashboard</h2>
      <div className="header-icons" onClick={handleLogout} title="Logout" style={{ cursor: 'pointer' }}>
        <FaSignOutAlt size={25} />
      </div>
    </div>
  );
};

export default Header;
