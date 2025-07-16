// // src/components/Admin/AdminList.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Pagination from '../Pagination';
// import AdminSidebar from './AdminSidebar';
// import './StylesAdmin/AdminList.css';

// const UserList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editUser, setEditUser] = useState(null);
//   const [editForm, setEditForm] = useState({ name: '', email: '' });
//   const [showAddForm, setShowAddForm] = useState(false);
// const [newUser, setNewUser] = useState({ name: '', email: '', password: '' ,confirmPassword: ''});

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/auth/users');
//       setUsers(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };


//   //delete

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
//         fetchUsers();
//       } catch (err) {
//         console.error("Error deleting user:", err);
//       }
//     }
//   };

//   //edit
//   const handleEdit = (user) => {
//     setEditUser(user._id);
//     setEditForm({ name: user.name, email: user.email });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     if (!editForm.name || !editForm.email) {
//     alert("Name and Email cannot be empty.");
//     return;
//   }
   
//     try {
//       await axios.put(`http://localhost:5000/api/auth/users/${editUser}`, editForm);
//       fetchUsers();
//       setEditUser(null);
//     } catch (err) {
//       console.error("Error updating user:", err);
//     }
//   };

// //add user

// const handleNewInputChange = (e) => {
//   setNewUser({ ...newUser, [e.target.name]: e.target.value });
// };


// const handleAddUser = async () => {
//   const { name, email, password, confirmPassword } = newUser;

//   if (!name || !email || !password || !confirmPassword) {
//     alert("All fields are required.");
//     return;
//   }

//   if (password !== confirmPassword) {
//     alert("Passwords do not match.");
//     return;
//   }

//   const payload = { name, email, password };

//   console.log("Sending new user to backend:", payload); // DEBUG

//   try {
//     await axios.post('http://localhost:5000/api/auth/register', payload);
//     fetchUsers();
//     setShowAddForm(false);
//     setNewUser({ name: '', email:   '', password: '', confirmPassword: '' });
//   } catch (err) {
//     console.error("Error adding user:", err.response?.data || err.message); // more detail
//   }
// };


// //search filter
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const currentUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   return (
//     <>
//       <AdminSidebar />
//       <div className="admin-container">
//         <h2 className="admin-title">User Management</h2>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search User..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//         </div>

// <div className="add-user-container">
//   <button className="add-user-button" onClick={() => setShowAddForm(true)}>➕ Add User</button>
// </div>

//         <div className="table-container">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user, index) => (
//                 <tr key={user._id} className="fade-in">
//                   <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                   <td>
//                     {editUser === user._id ? (
//                       <input
//                         type="text"
//                         name="name"
//                         value={editForm.name}
//                         onChange={handleEditChange}
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>
//                   <td>
//                     {editUser === user._id ? (
//                       <input
//                         type="email"
//                         name="email"
//                         value={editForm.email}
//                         onChange={handleEditChange}
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>
//                   <td>
//                     {editUser === user._id ? (
//                       <>
//                         <button className="action-button save" onClick={handleUpdate} title="Save">💾</button>
//                         <button className="action-button cancel" onClick={() => setEditUser(null)} title="Cancel">❌</button>
//                       </>
//                     ) : (
//                       <>
//                         <button className="action-button edit" onClick={() => handleEdit(user)} title="Edit">✏️</button>
//                         <button className="action-button delete" onClick={() => handleDelete(user._id)} title="Delete">🗑️</button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {currentUsers.length === 0 && (
//                 <tr><td colSpan="4" className="no-data">No data found</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <Pagination
//           totalItems={filteredUsers.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//        {showAddForm && (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h3>Add New User</h3>
//           <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleNewInputChange} />
//           <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleNewInputChange} />
//           <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleNewInputChange} />
//            <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="register-input"
//             value={newUser.confirmPassword}
//             onChange={handleNewInputChange}
//             required
//           />
//           <div className="modal-actions">
//             <button className="action-button save" onClick={handleAddUser}>💾 Save</button>
//             <button className="action-button cancel" onClick={() => setShowAddForm(false)}>❌ Cancel</button>
//           </div>
//         </div>
//       </div>
//     )}
//     </>
//   );
// };


// export default UserList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination';
import AdminSidebar from './AdminSidebar';
import './StylesAdmin/AdminList.css';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://coffee-website-83vf.onrender.com/api/auth/users');
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://coffee-website-83vf.onrender.com/api/auth/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editForm.name || !editForm.email) {
      alert("Name and Email cannot be empty.");
      return;
    }

    try {
      await axios.put(`https://coffee-website-83vf.onrender.com/api/auth/users/${editUser}`, editForm);
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleNewInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    const { name, email, password, confirmPassword } = newUser;

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = { name, email, password };

    try {
      await axios.post('https://coffee-website-83vf.onrender.com/api/auth/register', payload);
      fetchUsers();
      setShowAddForm(false);
      setNewUser({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <AdminSidebar />
      <div className="admin-container">
        <h2 className="admin-title">User Management</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search User..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="add-user-container">
          <button className="add-user-button" onClick={() => setShowAddForm(true)}>➕ Add User</button>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="fade-in">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="action-button edit" onClick={() => handleEdit(user)} title="Edit">✏️</button>
                    <button className="action-button delete" onClick={() => handleDelete(user._id)} title="Delete">🗑️</button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr><td colSpan="4" className="no-data">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editForm.email}
              onChange={handleEditChange}
            />
            <div className="modal-actions">
              <button className="action-button save" onClick={handleUpdate}>💾 Save</button>
              <button className="action-button cancel" onClick={() => setEditUser(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleNewInputChange} />
            <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleNewInputChange} />
            <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleNewInputChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={handleNewInputChange} />
            <div className="modal-actions">
              <button className="action-button save" onClick={handleAddUser}>💾 Save</button>
              <button className="action-button cancel" onClick={() => setShowAddForm(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
