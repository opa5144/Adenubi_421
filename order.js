const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerID: { type: String, required: true },
  product: { type: String, required: true },
  productDescription: { type: String },
  amount: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;