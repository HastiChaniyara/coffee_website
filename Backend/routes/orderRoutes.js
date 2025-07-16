const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { userId, address, cartItems, totalAmount } = req.body;

    if (!userId) {
  return res.status(400).json({ message: 'User ID is required' });
}
    const newOrder = new Order({
      user: userId,
      address,
      cartItems,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Order Save Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
});

// PUT: Update address
router.put('/:id', async (req, res) => {
  try {
    const { address, cartItems } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { address, cartItems },
      { new: true }
    );

    res.json({ message: 'Order updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
});

module.exports = router;
