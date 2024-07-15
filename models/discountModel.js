// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const DiscountSchema = new Schema(
//   {
//     coupon: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     validity: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     useLimit: {
//       type: Number,
//       required: true,
//     },
//     used: {
//       type: Number,
//       required: true,
//     },
//     discountPercent: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: ['live', 'test'],
//     },
//     paymentGatewayId: {
//       type: Schema.Types.ObjectId,
//       ref: 'PaymentGateway',
//       required: false,
//     },
//     pgPlanId: {
//       type: String,
//       required: false,
//       trim: true,
//     },
//     pgPriceId: {
//       type: String,
//       required: false,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // DiscountSchema.pre('validate', function (next) {
// //   if (this.discountPercent && this.mrp) {
// //     this.discountValue = (this.mrp * this.discountPercent) / 100;
// //     this.tag = this.discountPercent + '% OFF';
// //     this.amount = this.mrp - (this.mrp * this.discountPercent) / 100;
// //   }
// //   next();
// // });

// const Discount = mongoose.model('Discount', DiscountSchema);

// module.exports = Discount;

const mongoose = require('mongoose');
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

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;
