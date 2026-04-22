const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paymentType: { type: String, enum: ['one_time', 'subscription'], required: true },
  squarePaymentId: { type: String, default: '' },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
