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
    const { page = 1, limit = 10, search, filterStatus } = req.query;
    const refundRequests = await refundRequestService.getAllRefundRequests(
      page,
      limit,
      search,
      filterStatus
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

// Bulk update refund requests
const bulkUpdateRefundRequests = async (req, res) => {
  try {
    const { ids, data } = req.body;
    const updatedRequests = await refundRequestService.bulkUpdateRefundRequests(
      ids,
      data
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      updatedRequests,
      HTTP_STATUS.OK
    );
    // res.status(200).json(updatedRequests);
  } catch (error) {
    // res.status(500).json({ message: error.message });
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
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Bulk delete refund requests
const bulkDeleteRefundRequests = async (req, res) => {
  try {
    const { ids } = req.body;
    await refundRequestService.bulkDeleteRefundRequests(ids);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], HTTP_STATUS.OK);
    // res.status(200).json({ message: 'Refund requests deleted successfully.' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
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
  bulkUpdateRefundRequests,
  deleteRefundRequest,
  bulkDeleteRefundRequests,
};
