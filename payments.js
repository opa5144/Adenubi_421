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

// routes/payments.js

/**
* @swagger
* /payments:
*   get:
*     tags:
*       - Payments
*     summary: Retrieve a list of payments
*     responses:
*       200:
*         description: Successfully retrieved a list of payments
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                   orderID:
*                     type: string
*                   paymentType:
*                     type: string
*                   amount:
*                     type: number
*                   date:
*                     type: string
*                     format: date-time
*   post:
*     tags:
*       - Payments
*     summary: Create a new payment
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - orderID
*               - paymentType
*               - amount
*               - date
*             properties:
*               orderID:
*                 type: string
*                 example: 698908c516d56bafb4769f6d
*               paymentType:
*                 type: string
*                 example: Credit
*               amount:
*                 type: number
*                 example: 50
*               date:
*                 type: string
*                 format: date-time
*                 example: 2025-08-24T04:00:00.000Z
*     responses:
*       201:
*         description: Payment successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 payment:
*                   type: object
*                   description: The created payment
*                 message:
*                   type: string
*                   description: Processing message
* /payments/{id}:
*   patch:
*     tags:
*       - Payments
*     summary: Update a payment by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Payment ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               orderID:
*                 type: string
*               paymentType:
*                 type: string
*               amount:
*                 type: number
*               date:
*                 type: string
*                 format: date-time
*     responses:
*       200:
*         description: Payment successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                 orderID:
*                   type: string
*                 paymentType:
*                   type: string
*                 amount:
*                   type: number
*                 date:
*                   type: string
*                   format: date-time
*       400:
*         description: Invalid request
*   delete:
*     tags:
*       - Payments
*     summary: Delete a payment by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Payment ID
*     responses:
*       200:
*         description: Payment successfully deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       400:
*         description: Invalid request
*/

module.exports = router;
