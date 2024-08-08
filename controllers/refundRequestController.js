const refundRequestService = require('../services/refundRequestService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new refund request
const createRefundRequest = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.createRefundRequest(
      req.body
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      refundRequest,
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

// Get all refund requests
const getAllRefundRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const refundRequests = await refundRequestService.getAllRefundRequests(
      page,
      limit,
      search
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      refundRequests,
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

// Get refund request by ID
const getRefundRequestById = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.getRefundRequestById(
      req.params.id
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      refundRequest,
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

// Update refund request by ID
const updateRefundRequest = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.updateRefundRequest(
      req.params.id,
      req.body
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      refundRequest,
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

// Delete refund request by ID
const deleteRefundRequest = async (req, res) => {
  try {
    await refundRequestService.deleteRefundRequest(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Request deleted successfully' },
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
  createRefundRequest,
  getAllRefundRequests,
  getRefundRequestById,
  updateRefundRequest,
  deleteRefundRequest,
};
