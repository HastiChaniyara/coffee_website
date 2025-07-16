import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StylesAdmin/AdminContact.css';
import AdminSidebar from "./AdminSidebar";

const AdminContactList = () => {
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/api/contact-messages');
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`http://localhost:5000/api/contact-messages/${id}`);
      fetchMessages();
    }
  };

  const handleEdit = (msg) => {
    setEditing(msg);
  };

  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/contact-messages/${editing._id}`, editing);
    setEditing(null);
    fetchMessages();
  };

  return (
    <>
     <AdminSidebar />
    <div className="admin-contact-panel">
      <h2>📬 Contact Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{editing?._id === msg._id ? <input name="name" value={editing.name} onChange={handleChange} /> : msg.name}</td>
              <td>{editing?._id === msg._id ? <input name="subject" value={editing.subject} onChange={handleChange} /> : msg.subject}</td>
              <td>{editing?._id === msg._id ? <input name="email" value={editing.email} onChange={handleChange} /> : msg.email}</td>
              <td>{editing?._id === msg._id ? <input name="phone" value={editing.phone} onChange={handleChange} /> : msg.phone}</td>
              <td>{editing?._id === msg._id ? <textarea name="message" value={editing.message} onChange={handleChange} /> : msg.message}</td>
              <td>
                {editing?._id === msg._id ? (
                  <>
                    <button onClick={handleUpdate}>💾 Save</button>
                    <button onClick={() => setEditing(null)}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(msg)}>✏️</button>
                    <button onClick={() => handleDelete(msg._id)}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminContactList;
