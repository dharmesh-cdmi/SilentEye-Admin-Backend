const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema(
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

PlanSchema.pre('save', function (next) {
  if (this.discountPercent && this.mrp) {
    this.discountValue = (this.mrp * this.discountPercent) / 100;
    this.tag = this.discountPercent + '% OFF';
    this.amount = this.mrp - (this.mrp * this.discountPercent) / 100;
  }
  next();
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
