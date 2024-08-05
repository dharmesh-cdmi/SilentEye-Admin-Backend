// controllers/planController.js

const planService = require('../services/planService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new plan
const createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      plan,
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

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const plans = await planService.getAllPlans(page, limit, search);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      plans,
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

// Get a single plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      plan,
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

// Update a plan by ID
const updatePlan = async (req, res) => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      plan,
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

// Delete a plan by ID
const deletePlan = async (req, res) => {
  try {
    await planService.deletePlan(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Plan deleted successfully' },
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
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
