const withdrawalRequestService = require('../services/withdrawalRequestService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new withdrawal request
const createWithdrawalRequest = async (req, res) => {
  try {
    const withdrawalRequest =
      await withdrawalRequestService.createWithdrawalRequest(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      withdrawalRequest,
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

// Get all withdrawal requests
const getAllWithdrawalRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterStatus } = req.query;
    const withdrawalRequests =
      await withdrawalRequestService.getAllWithdrawalRequests(
        page,
        limit,
        search,
        filterStatus
      );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      withdrawalRequests,
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

// Get withdrawal request by ID
const getWithdrawalRequestById = async (req, res) => {
  try {
    const withdrawalRequest =
      await withdrawalRequestService.getWithdrawalRequestById(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      withdrawalRequest,
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
  createWithdrawalRequest,
  getAllWithdrawalRequests,
  getWithdrawalRequestById,
};
