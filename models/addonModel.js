const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
  },
  {
    timestamps: true,
  }
);

AddonSchema.plugin(mongoosePaginate);

const Addon = mongoose.model('Addon', AddonSchema);

module.exports = Addon;
