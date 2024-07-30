const shippingService = require('../services/shippingService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new shipping
const createShipping = async (req, res) => {
  try {
    const shipping = await shippingService.createShipping(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      shipping,
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

// Get all shippings
const getAllShippings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const shippings = await shippingService.getAllShippings(page, limit);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      shippings,
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

// Get shipping by ID
const getShippingById = async (req, res) => {
  try {
    const shipping = await shippingService.getShippingById(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      shipping,
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

// Update shipping by ID
const updateShipping = async (req, res) => {
  try {
    const shipping = await shippingService.updateShipping(
      req.params.id,
      req.body
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      shipping,
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

// Delete shipping by ID
const deleteShipping = async (req, res) => {
  try {
    await shippingService.deleteShipping(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Shipping deleted successfully' },
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
  createShipping,
  getAllShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
};
