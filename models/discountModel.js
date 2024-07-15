const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
  {
    coupon: {
      type: String,
      required: true,
      trim: true,
    },
    validity: {
      type: Schema.Types.Mixed, // This can be either a string or a date
      required: true,
      trim: true,
    },
    useLimit: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPercent: {
      type: Number, // Storing as a number, which will include "% OFF"
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
    paymentGatewayId: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentGateway',
      required: false,
    },
    pgDiscountId: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to validate discount and increment used count
DiscountSchema.pre('save', function (next) {
  if (this.validity !== 'no limit' && new Date(this.validity) < new Date()) {
    return next(new Error('Discount validity has expired'));
  }
  next();
});

DiscountSchema.plugin(mongoosePaginate);

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;
