// controllers/paymentController.js

const paymentService = require('../services/paymentService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS_MESSAGE, HTTP_STATUS } = require('../utils/responseHelper')

// Create a new checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const session = await paymentService.createCheckoutSession(req.body);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], session, HTTP_STATUS.CREATED)
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error?.message ?? error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

// Create a new stripe product
const createStripeProduct = async (req, res) => {
  try {
    const product = await paymentService.createStripeProduct(req.body);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], product, HTTP_STATUS.CREATED)
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error?.message ?? error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

// Create a new stripe plan
const createStripePlan = async (req, res) => {
  try {
    const plan = await paymentService.createStripePlan(req.body);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], plan, HTTP_STATUS.CREATED)
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error?.message ?? error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

module.exports = {
  createCheckoutSession,
  createStripeProduct,
  createStripePlan,
};
