import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StylesAdmin/LoginPage.css';

const Login = ({ setAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log("📤 Sending login data:", { email: trimmedEmail, password: trimmedPassword });

    try {
      const res = await axios.post('http://localhost:5000/api/admins/login', {
        email: trimmedEmail,
        password: trimmedPassword
      });

      const admin = res.data.admin;
      setAdmin(admin); // Store in context or parent state
      setMessage(res.data.message);
      console.log("✅ Login Success:", admin);

      // Optionally store in localStorage
      localStorage.setItem('admin', JSON.stringify(admin));

      navigate('/Admin/Dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
      console.error("❌ Login failed:", err.response?.data?.message || err.message);
      // alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(/image_slider/ante-samarzija-lsmu0rUhUOk-unsplash.jpg)`
      }}
    >
      <div className="login-box">
        <h2 className="login-title">Welcome to CoffeeHub ☕</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
         {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </div>
      
    </div>
  );
};

export default Login;

