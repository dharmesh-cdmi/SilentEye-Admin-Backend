const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const UpsellSchema = new Schema(
  {
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: false,
    },
    upsell: {
      type: new Schema(
        {
          name: { type: String, required: true, trim: true },
          count: { type: Number, required: true },
          image: { type: String, required: true, trim: true },
        },
        { _id: false }
      ),
      required: true,
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

UpsellSchema.pre('save', function (next) {
  if (this.discountPercent && this.mrp) {
    this.discountValue = (this.mrp * this.discountPercent) / 100;
    this.amount = this.mrp - (this.mrp * this.discountPercent) / 100;
  }
  next();
});

UpsellSchema.plugin(mongoosePaginate);

const Upsell = mongoose.model('Upsell', UpsellSchema);

module.exports = Upsell;
