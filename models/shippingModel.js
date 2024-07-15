const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    daysRange: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shipping = mongoose.model('Shipping', ShippingSchema);

module.exports = Shipping;
