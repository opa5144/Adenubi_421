const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;