const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  paymentType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;