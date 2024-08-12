const discountService = require('../services/discountService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const discount = await discountService.createDiscount(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      discount,
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

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterValidity } = req.query;
    const discounts = await discountService.getAllDiscounts(
      page,
      limit,
      search,
      filterValidity
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      discounts,
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

// Get discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id);
    if (!discount) {
      return apiErrorResponse(
        res,
        HTTP_STATUS_MESSAGE[404],
        { message: 'Discount not found' },
        HTTP_STATUS.NOT_FOUND
      );
    }
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      discount,
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

// Update discount by ID
const updateDiscount = async (req, res) => {
  try {
    const discount = await discountService.updateDiscount(
      req.params.id,
      req.body
    );
    if (!discount) {
      return apiErrorResponse(
        res,
        HTTP_STATUS_MESSAGE[404],
        { message: 'Discount not found' },
        HTTP_STATUS.NOT_FOUND
      );
    }
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      discount,
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

// Delete discount by ID
const deleteDiscount = async (req, res) => {
  try {
    const discount = await discountService.deleteDiscount(req.params.id);
    if (!discount) {
      return apiErrorResponse(
        res,
        HTTP_STATUS_MESSAGE[404],
        { message: 'Discount not found' },
        HTTP_STATUS.NOT_FOUND
      );
    }
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      null,
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

// Apply discount
const applyDiscount = async (req, res) => {
  try {
    const discount = await discountService.applyDiscount(req.body.coupon);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      discount,
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
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  applyDiscount,
};
