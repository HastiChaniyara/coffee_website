import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCoffee, FaHome, FaUsers, FaUserShield, FaBoxOpen, FaStoreAlt, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import './StylesAdmin/Dashboard.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <FaCoffee size={30} /> <span>Coffee Admin</span>
      </div>
      <ul>
        <li>
          <NavLink to="/Admin/Dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/AdminList" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUserShield /> Admins
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/UserList" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/Product" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaBoxOpen /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/OrderList" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaShoppingCart /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/OutletList" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaStoreAlt /> Franchise
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin/ContactList" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaPhoneAlt /> Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;