const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet');

// Create outlet
router.post('/', async (req, res) => {
  try {
    const outlet = new Outlet(req.body);
    await outlet.save();
    res.status(201).json(outlet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all outlets
router.get('/', async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Update outlet
// router.put('/:id', async (req, res) => {
//   const updated = await Outlet.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });
// Update Outlet
router.put('/:id', async (req, res) => {
  try {
    const updated = await Outlet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete outlet
router.delete('/:id', async (req, res) => {
  await Outlet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Outlet deleted' });
});

module.exports = router;
