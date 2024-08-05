// controllers/paymentGatewayController.js

const paymentGatewayService = require('../services/paymentGatewayService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new payment gateway
const createPaymentGateway = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.createPaymentGateway({
      ...req.body,
      icon: req.file?.path,
    });
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      paymentGateway,
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

// Get all payment gateways
const getAllPaymentGateways = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const paymentGateways = await paymentGatewayService.getAllPaymentGateways(
      page,
      limit,
      search
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      paymentGateways,
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

// Get a single payment gateway by ID
const getPaymentGatewayById = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.getPaymentGatewayById(
      req.params.id
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      paymentGateway,
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

// Update a payment gateway by ID
const updatePaymentGateway = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.updatePaymentGateway(
      req.params.id,
      req.body
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      paymentGateway,
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

// Delete a payment gateway by ID
const deletePaymentGateway = async (req, res) => {
  try {
    await paymentGatewayService.deletePaymentGateway(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Payment Gateway deleted successfully' },
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
  createPaymentGateway,
  getAllPaymentGateways,
  getPaymentGatewayById,
  updatePaymentGateway,
  deletePaymentGateway,
};
