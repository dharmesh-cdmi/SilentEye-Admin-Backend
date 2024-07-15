const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
    checked: {
      type: Boolean,
      required: true,
    },
    paymentGatewayId: {
      type: String,
      required: false,
      trim: true,
    },
    pgAddonId: {
      type: String,
      required: false,
      trim: true,
    },
    pgPriceId: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Addon = mongoose.model('Addon', AddonSchema);

module.exports = Addon;
