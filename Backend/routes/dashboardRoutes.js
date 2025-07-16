// routes/admin.js or routes/dashboard.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Dashboard summary
router.get('/admin/dashboard-stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments(); // or Order.count() for MySQL
    const totalUsers = await User.countDocuments();
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    res.json({ totalOrders, totalUsers, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
