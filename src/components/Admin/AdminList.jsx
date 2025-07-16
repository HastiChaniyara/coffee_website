import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination';
import './StylesAdmin/AdminList.css';
import AdminSidebar from './AdminSidebar';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
const [editAdminId, setEditAdminId] = useState(null);
  const itemsPerPage = 5;

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('https://coffee-website-83vf.onrender.com/api/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async () => {
    try {
      await axios.post('https://coffee-website-83vf.onrender.com/api/admins', newAdmin);
      setNewAdmin({ name: '', email: '', password: '' });
      setShowPopup(false);
      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || 'Add admin failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://coffee-website-83vf.onrender.com/api/admins/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (admin) => {
  setEditMode(true);
  setEditAdminId(admin._id);
  setNewAdmin({ name: admin.name, email: admin.email, password: '' }); // password can be re-entered or skipped
  setShowPopup(true);
};

const handleUpdateAdmin = async () => {
  try {
    await axios.put(`https://coffee-website-83vf.onrender.com/api/admins/${editAdminId}`, newAdmin);
    setNewAdmin({ name: '', email: '', password: '' });
    setEditMode(false);
    setShowPopup(false);
    fetchAdmins();
  } catch (error) {
    alert(error.response?.data?.message || 'Update admin failed');
  }
};
  return (
    <>
      <AdminSidebar />
      <div className="admin-container">
        <h2 className="admin-title">Admin Management</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Admin..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => setShowPopup(true)}>
            ➕ Add Admin
          </button>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin, index) => (
                <tr key={admin._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    {/* <button onClick={() => handleDelete(admin._id)}>🗑 Delete</button> */}
                     <button className="action-button edit" onClick={() => handleEdit(admin)} title="Edit">✏️</button>
                        <button className="action-button delete" onClick={() => handleDelete(admin._id)} title="Delete">🗑️</button>
                      
                  </td>
                </tr>
              ))}
              {currentAdmins.length === 0 && (
                <tr><td colSpan="4" className="no-data">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={filteredAdmins.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Add New Admin</h3>
            <input
              type="text"
              name="name"
              placeholder="Admin Name"
              value={newAdmin.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={newAdmin.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={handleInputChange}
            />
            <div className="popup-actions">
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="confirm-btn" onClick={editMode ? handleUpdateAdmin : handleAddAdmin}>
  {editMode ? 'Update Admin' : 'Add Admin'}
</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminList;
