import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/'); // ✅ Redirect to login
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
     const res = await axios.post("https://coffee-website-83vf.onrender.com/api/auth/login", { email, password });

      localStorage.setItem('user', JSON.stringify(res.data));
      // If login successful
      setMessage(res.data.message);
      navigate('/HomePage');
    } catch (err) {
      // If login failed
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(/image_slider/ante-samarzija-lsmu0rUhUOk-unsplash.jpg)` }}>
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
         <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span>don't have an account? </span>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="login-link-button"
          >
            Register
          </button>
        </div>
        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
