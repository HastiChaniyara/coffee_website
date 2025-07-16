import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from "./AdminSidebar";
import AdminOutletForm from './AdminOutletForm';
import './StylesAdmin/AdminOutlet.css';

const AdminOutletList = () => {
  const [outlets, setOutlets] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchOutlets = async () => {
    const res = await axios.get('https://coffee-website-83vf.onrender.com/api/outlets');
    setOutlets(res.data);
  };

  useEffect(() => {
    fetchOutlets();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://coffee-website-83vf.onrender.com/api/outlets/${id}`);
    fetchOutlets();
  };

  const handleEdit = (data) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
     <AdminSidebar />
    <div className="admin-outlet-panel">
      <h2>☕ Manage Franchise Outlets</h2>
      <button className="add-outlet-btn" onClick={handleAdd}>+ Add Outlet</button>

      <table className="outlet-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Outlet</th>
            <th>City</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Year</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outlets.map((o,index) => (
            <tr key={o._id}>
          <td>{index+1}</td>
              <td>{o.outlet}</td>
              <td>{o.city}</td>
              <td>{o.address}</td>
              <td>{o.phone}</td>
              <td>{o.year}</td>
              <td>
                <iframe
                  src={o.map}
                  width="200"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`Map-${o._id}`}
                ></iframe>
              </td>
              <td>
                <button onClick={() => handleEdit(o)}>✏️</button>
                <button onClick={() => handleDelete(o._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            <AdminOutletForm onSave={() => { fetchOutlets(); handleCloseForm(); }} editData={editData} />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminOutletList;
