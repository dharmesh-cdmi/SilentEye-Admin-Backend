const shippingTrackingSettingsService = require('../services/shippingTrackingService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Add a new topic
const addTopic = async (req, res) => {
  try {
    const settings = await shippingTrackingSettingsService.addTopic(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      settings,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete a topic
const deleteTopic = async (req, res) => {
  try {
    const settings = await shippingTrackingSettingsService.deleteTopic(
      req.params.topicId
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      settings,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Add a new subtopic
const addSubTopic = async (req, res) => {
  try {
    const settings = await shippingTrackingSettingsService.addSubTopic(
      req.params.topicId,
      req.body
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      settings,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete a subtopic
const deleteSubTopic = async (req, res) => {
  try {
    const { topicId, subTopicId } = req.params;
    const settings = await shippingTrackingSettingsService.deleteSubTopic(
      topicId,
      subTopicId
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      settings,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Get all settings
const getSettings = async (req, res) => {
  try {
    const settings = await shippingTrackingSettingsService.getSettings();
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      settings,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  addTopic,
  deleteTopic,
  addSubTopic,
  deleteSubTopic,
  getSettings,
};
