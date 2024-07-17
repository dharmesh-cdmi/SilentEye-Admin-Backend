const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const PaymentGatewaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      trim: true,
    },
    saltKey: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

PaymentGatewaySchema.plugin(mongoosePaginate);

const PaymentGateway = mongoose.model('PaymentGateway', PaymentGatewaySchema);

module.exports = PaymentGateway;
