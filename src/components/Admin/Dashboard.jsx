import React from 'react';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import MainContent from './MainContent';
import './StylesAdmin/Dashboard.css';


const Dashboard = () => {
   
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="main-area">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
