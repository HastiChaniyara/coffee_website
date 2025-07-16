import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StylesAdmin/AdminOutlet.css';

const AdminOutletForm = ({ onSave, editData }) => {
  const [outlet, setOutlet] = useState({
    city: '',
    outlet: '',
    address: '',
    phone: '',
    year: '',
    map: '',
  });

  useEffect(() => {
    if (editData) {
      setOutlet(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutlet({ ...outlet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await axios.put(`http://localhost:5000/api/outlets/${editData._id}`, outlet);
      } else {
        await axios.post('http://localhost:5000/api/outlets', outlet);
      }
      onSave(); // refresh list + close modal
    } catch (err) {
      console.error('Error saving outlet:', err);
    }
  };

  return (
   <form className="admin-outlet-form" onSubmit={handleSubmit}>
  <h3>{editData ? '✏️ Edit Outlet' : '➕ Add New Outlet'}</h3>

  <div className="form-group">
    <label>City</label>
    <input type="text" name="city" value={outlet.city} onChange={handleChange} required />
  </div>

  <div className="form-group">
    <label>Outlet</label>
    <input type="text" name="outlet" value={outlet.outlet} onChange={handleChange} required />
  </div>

  <div className="form-group">
    <label>Address</label>
    <textarea name="address" value={outlet.address} onChange={handleChange} required />
  </div>

  <div className="form-row">
    <div className="form-group half">
      <label>Phone</label>
      <input type="text" name="phone" value={outlet.phone} onChange={handleChange} required />
    </div>

    <div className="form-group half">
      <label>Year</label>
      <input type="number" name="year" value={outlet.year} onChange={handleChange} required />
    </div>
  </div>

  <div className="form-group">
    <label>Google Maps Embed Link</label>
    <input type="text" name="map" value={outlet.map} onChange={handleChange} required />
  </div>

  <button type="submit" className="save-btn">
    {editData ? 'Update Outlet' : 'Add Outlet'}
  </button>
</form>

  );
};

export default AdminOutletForm;
