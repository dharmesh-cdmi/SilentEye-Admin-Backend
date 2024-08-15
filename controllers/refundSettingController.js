const refundSettingService = require('../services/refundSettingService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Get refund settings
const getRefundSetting = async (req, res) => {
  try {
    const setting = await refundSettingService.getRefundSetting();
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      setting,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upsert refund settings
const upsertRefundSetting = async (req, res) => {
  try {
    const setting = await refundSettingService.upsertRefundSetting(req.body);
    return apiSuccessResponse(
      res,
      'Request Setting added/updated successfully', // message
      setting, // body/data
      HTTP_STATUS.CREATED // status
    );
  } catch (error) {
    console.log('error', error);
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  getRefundSetting,
  upsertRefundSetting,
};
