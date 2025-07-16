const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require('../models/Admin');

// GET: List all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password'); // Exclude passwords
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch admins', error });
  }
});

// POST: Create a new admin
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create admin', error });
  }
});


// POST: Login admin
// POST: Create a new admin (with password hashing)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("✅ Login successful for:", email);
    res.status(200).json({
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('🔥 Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT: Update an admin
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await Admin.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update admin', error });
  }
});


// DELETE: Remove an admin
router.delete('/:id', async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete admin', error });
  }
});

module.exports = router;