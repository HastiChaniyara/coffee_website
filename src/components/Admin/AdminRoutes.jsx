// components/Admin/AdminRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const storedAdmin = JSON.parse(localStorage.getItem('admin'));

  if (!storedAdmin) {
    return <Navigate to="/Admin" replace />;
  }

  return children;
};

export default AdminRoute;
