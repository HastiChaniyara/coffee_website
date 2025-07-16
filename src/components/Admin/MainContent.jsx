import './StylesAdmin/Dashboard.css';
import './StylesAdmin/MainContent.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainContent = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://coffee-website-83vf.onrender.com/api/admin/dashboard-stats');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="main-content">
      <h2 className="dashboard-title">☕ Dashboard Summary</h2>
      <div className="stats-container">
        <div className="stat-card coffee">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card mocha">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card latte">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
