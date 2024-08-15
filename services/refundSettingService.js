const RefundSetting = require('../models/refundSettingModel');

// Get refund settings
const getRefundSetting = async () => {
  try {
    return await RefundSetting.findOne(); // Assume there's only one settings document
  } catch (error) {
    throw new Error(`Error in getting refund settings: ${error.message}`);
  }
};

// Update or create refund settings
const upsertRefundSetting = async (data) => {
  try {
    let refundSetting = await getRefundSetting();

    if (refundSetting) {
      // Update existing settings
      refundSetting = Object.assign(refundSetting, data);
    } else {
      // Create new settings
      refundSetting = new RefundSetting(data);
    }

    await refundSetting.save();

    console.log('success', refundSetting);
    return refundSetting;
  } catch (error) {
    console.log('error', error);
    throw new Error(`Error in upserting refund settings: ${error.message}`);
  }
};

module.exports = {
  getRefundSetting,
  upsertRefundSetting,
};
