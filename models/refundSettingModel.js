const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefundSettingSchema = new Schema(
  {
    underProcessing: {
      type: Number,
      required: true,
      default: 0, // Duration in hours
    },
    initiated: {
      type: Number,
      required: true,
      default: 0, // Duration in hours
    },
    refunded: {
      type: Number,
      required: true,
      default: 0, // Duration in hours
    },
  },
  {
    timestamps: true,
  }
);

const RefundSetting = mongoose.model('RefundSetting', RefundSettingSchema);

module.exports = RefundSetting;
