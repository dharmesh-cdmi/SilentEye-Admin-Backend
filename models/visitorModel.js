// models/visitorModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitorSchema = new Schema({
  page: { type: String, enum: ['home', 'Checkout', 'Plan'], required: true },
  date: { type: Date, default: Date.now },
  action: { type: String, enum: ['Visit', 'Checkout', 'Demo View', 'Order Placed', 'Login'], required: true },
  isVisit: { type: Boolean, default: true },
  country: { type: String },
  device: { type: String },
  IP: { type: String }
});

module.exports = mongoose.model('Visitor', visitorSchema);
