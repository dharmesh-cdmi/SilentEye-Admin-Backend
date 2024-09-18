const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const WithdrawalRequestSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    swiftCode: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        'Pending',
        'Approved',
        'Rejected',
        'Under Processing',
        'Initiated',
        'Completed',
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

WithdrawalRequestSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('WithdrawalRequest', WithdrawalRequestSchema);

const WithdrawalRequest = mongoose.model(
  'WithdrawalRequest',
  WithdrawalRequestSchema
);

module.exports = WithdrawalRequest;
