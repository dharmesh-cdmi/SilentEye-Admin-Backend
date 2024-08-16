const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planDetailsSchema = new Schema({
  planId: { type: Schema.Types.ObjectId, ref: 'plan', required: true },  // Reference to Plan collection
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  mrp: { type: Number, required: true },
  upSell: String,
  duration: String,
  discount: Number,
  coupon: String,
  tag: String,
});
const addOnSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  mrp: { type: Number, required: true },
  description: String,
});

const refundDetailsSchema = new Schema({
  refundRequestId: { type: Schema.Types.ObjectId, ref: 'refund' },  // Reference to RefundRequest collection
  refundAmount: { type: Number, required: true },
  refundDate: { type: Date, default: Date.now },
  refundReason: String
});

const orderDetailsSchema = new Schema({
  email: { type: String, required: true },
  country: String,
  purchase: { type: Date, required: true },
  total: { type: Number, required: true }
});

const ordersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  orderId: { type: String, required: true },
  planDetails: planDetailsSchema,
  addOns: [addOnSchema],
  orderDetails: orderDetailsSchema,
  paymentMethod: { type: String, enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Net Banking'], required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Pending' }, //pending is if someone did checkout but didn't paid 
  refundDetails: refundDetailsSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});

module.exports = mongoose.model('Orders', ordersSchema);
