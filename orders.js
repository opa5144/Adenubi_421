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

// routes/orders.js

/**
* @swagger
* /orders:
*   get:
*     tags:
*       - Orders
*     summary: Retrieve a list of orders for customers
*     responses:
*       200:
*         description: Successfully retrieved a list of orders
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                   customerID:
*                     type: string
*                   product:
*                     type: string
*                   productDescription:
*                     type: string
*                   amount:
*                     type: integer
*                   price:
*                     type: number
*   post:
*     tags:
*       - Orders
*     summary: Create a new order for a customer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - customerID
*               - product
*               - productDescription
*               - amount
*               - price
*             properties:
*               customerID:
*                 type: string
*                 example: 6988fe7c0139d18a927596cb
*               product:
*                 type: string
*                 example: Laptop
*               productDescription:
*                 type: string
*                 example: A laptop
*               amount:
*                 type: integer
*                 example: 1
*               price:
*                 type: number
*                 example: 100
*     responses:
*       201:
*         description: Order successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                 customerID:
*                   type: string
*                 product:
*                   type: string
*                 productDescription:
*                   type: string
*                 amount:
*                   type: integer
*                 price:
*                   type: number
*                 message:
*                   type: string
*                   description: Processing message
* /orders/{id}:
*   patch:
*     tags:
*       - Orders
*     summary: Update an order by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Order ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               customerID:
*                 type: string
*               product:
*                 type: string
*               productDescription:
*                 type: string
*               amount:
*                 type: integer
*               price:
*                 type: number
*     responses:
*       200:
*         description: Order successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                 customerID:
*                   type: string
*                 product:
*                   type: string
*                 productDescription:
*                   type: string
*                 amount:
*                   type: integer
*                 price:
*                   type: number
*       400:
*         description: Invalid request
*   delete:
*     tags:
*       - Orders
*     summary: Delete an order by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Order ID
*     responses:
*       200:
*         description: Order successfully deleted
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
