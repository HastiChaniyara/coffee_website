const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST - Add message (already exists)
router.post('/contact', async (req, res) => {
  try {
    const { name, subject, email, phone, message } = req.body;
    const newMessage = new ContactMessage({ name, subject, email, phone, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ GET - Fetch all contact messages
router.get('/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ✅ PUT - Update a message by ID
router.put('/contact-messages/:id', async (req, res) => {
  try {
    const updated = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// ✅ DELETE - Delete a message by ID
router.delete('/contact-messages/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
