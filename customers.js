const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new Customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Customer
router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// routes/customers.js

/**
* @swagger
* /customers:
*   get:
*     tags:
*       - Customers
*     summary: Retrieve a list of customers
*     responses:
*       200:
*         description: Successfully retrieved a list of customers
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                   name:
*                     type: string
*                   phone:
*                     type: string
*                   email:
*                     type: string
*   post:
*     tags:
*       - Customers
*     summary: Create a new customer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - phone
*               - email
*             properties:
*               name:
*                 type: string
*                 example: John Numbers
*               phone:
*                 type: string
*                 example: 555-555-5555
*               email:
*                 type: string
*                 example: jnum@gmail.com
*     responses:
*       201:
*         description: Customer successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                 name:
*                   type: string
*                 phone:
*                   type: string
*                 email:
*                   type: string
*                 message:
*                   type: string
*                   description: Processing message
* /customers/{id}:
*   patch:
*     tags:
*       - Customers
*     summary: Update a customer by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Customer ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               phone:
*                 type: string
*               email:
*                 type: string
*     responses:
*       200:
*         description: Customer successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                 name:
*                   type: string
*                 phone:
*                   type: string
*                 email:
*                   type: string
*       400:
*         description: Invalid request
*   delete:
*     tags:
*       - Customers
*     summary: Delete a customer by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Customer ID
*     responses:
*       200:
*         description: Customer successfully deleted
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

module.exports = router;
