const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
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
    mrp: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
    mainImage: {
      type: String,
      required: true,
      trim: true,
    },
    image2: {
      type: String,
      required: false,
      trim: true,
    },
    paymentGatewayId: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentGateway',
      required: false,
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
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
