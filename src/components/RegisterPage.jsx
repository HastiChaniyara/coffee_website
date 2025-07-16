import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation
import './Styles/RegisterPage.css';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
   const handleSubmit = async e => {
    e.preventDefault();
     if (form.password !== form.confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  const data = {
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password
  };
    try {
      const res = await axios.post('http://coffee-website-83vf.onrender.com/api/auth/register', data);
      setMessage(res.data.message);
      console.log("successful")
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login'); // ✅ Redirect to login
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(/image_slider/ante-samarzija-lsmu0rUhUOk-unsplash.jpg)`
      }}
    >
      <div className="register-box">
        <h2 className="register-title">Create an Account ☕</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="register-input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={handleLoginClick}
            className="login-link-button"
          >
            Login
          </button>
        </div>
          {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
