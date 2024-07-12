const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
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
    discountPercent: {
      type: Number,
      required: true,
      default: 0,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['live', 'test'],
    },
  },
  {
    timestamps: true,
  }
);

SubscriptionSchema.pre('save', function (next) {
  if (this.discountPercent && this.mrp) {
    this.discountValue = (this.mrp * this.discountPercent) / 100;
    this.tag = this.discountPercent + '% OFF';
    this.amount = this.mrp - (this.mrp * this.discountPercent) / 100;
  }
  next();
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
