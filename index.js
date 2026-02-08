const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/mydatabase', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const paymentsRouter = require('./routes/payments');
app.use('/payments', paymentsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});