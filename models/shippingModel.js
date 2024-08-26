const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const ShippingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    daysMin: {
      type: Number,
      required: true,
    },
    daysMax: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
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

ShippingSchema.plugin(mongoosePaginate);

const Shipping = mongoose.model('Shipping', ShippingSchema);

module.exports = Shipping;
