const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Processing
function processOrder(order) {
  return new Promise((resolve) => {
    console.log(`Processing order ${order._id}...`);
    setTimeout(() => {
      resolve(`Order ${order._id} processed successfully!`);
    }, 2000);
  });
}

// Create a new Order
router.post('/', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    const processingMessage = await processOrder(newOrder);
    
    res.status(201).json({ order: newOrder, message: processingMessage });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Order
router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Order
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;