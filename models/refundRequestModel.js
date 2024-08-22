const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const RefundRequestSchema = new Schema(
  {
    // index: {
    //   type: Number,
    //   required: true,
    // },
    // requestId: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // amount: {
    //   type: Number,
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: ['Pending', 'Approved', 'Rejected', 'Refunded', 'True Refunded'],
    // },
    // type: {
    //   type: String,
    //   required: true,
    //   // enum: ['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4', 'Reason 5'],
    // },
    // checked: {
    //   type: Boolean,
    //   required: true,
    // },
    // planId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Plan',
    //   required: false,
    // },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    targettedNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Approved', 'Rejected', 'Refunded', 'True Refunded'],
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RefundRequestSchema.pre('validate', async function (next) {
  if (this.isNew) {
    try {
      const lastRefundRequest = await mongoose
        .model('RefundRequest')
        .findOne()
        .sort({ index: -1 });
      this.index = lastRefundRequest ? lastRefundRequest.index + 1 : 1;
      this.requestId = `RE${this.index}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

RefundRequestSchema.plugin(mongoosePaginate);

const RefundRequest = mongoose.model('RefundRequest', RefundRequestSchema);

module.exports = RefundRequest;
