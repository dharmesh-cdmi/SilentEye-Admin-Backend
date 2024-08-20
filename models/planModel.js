const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const PlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    key: {
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
    duration: {
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
    paymentGatewayId: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentGateway',
      required: false,
    },
    pgPlanId: {
      type: String,
      required: false,
      trim: true,
    },
    pgPriceId: {
      type: String,
      required: false,
      trim: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

PlanSchema.pre('validate', function (next) {
  if (this.discountPercent && this.mrp) {
    this.discountValue = (this.mrp * this.discountPercent) / 100;
    this.tag = this.discountPercent + '% OFF';
    this.amount = this.mrp - (this.mrp * this.discountPercent) / 100;
  }
  next();
});

PlanSchema.plugin(mongoosePaginate);

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
