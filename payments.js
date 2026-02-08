const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// Processing
function processPayment(payment) {
  return new Promise((resolve) => {
    console.log(`Processing payment ${payment._id}...`);
    setTimeout(() => {
      resolve(`Payment ${payment._id} processed successfully!`);
    }, 2000);
  });
}

// Create a new Payment
router.post('/', async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    const processingMessage = await processPayment(newPayment);
    
    res.status(201).json({ payment: newPayment, message: processingMessage });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Payment
router.patch('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Payment
router.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;