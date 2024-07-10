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
  },
  {
    timestamps: true,
  }
);

const Addon = mongoose.model('Addon', AddonSchema);

module.exports = Addon;
