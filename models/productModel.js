const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    image: {
      type: String,
      required: true,
      trim: true,
    },
    paymentGatewayId: {
      type: String,
      required: false,
      trim: true,
    },
    pgProductId: {
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

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
