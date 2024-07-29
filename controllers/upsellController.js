// controllers/upsellController.js

const upsellService = require('../services/upsellService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new upsell
const createUpsell = async (req, res) => {
  try {
    const upsell = await upsellService.createUpsell(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      upsell,
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

// Get all upsells
const getAllUpsells = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const upsells = await upsellService.getAllUpsells(page, limit);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      upsells,
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

// Get a single upsell by ID
const getUpsellById = async (req, res) => {
  try {
    const upsell = await upsellService.getUpsellById(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      upsell,
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

// Update a upsell by ID
const updateUpsell = async (req, res) => {
  try {
    const upsell = await upsellService.updateUpsell(req.params.id, req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      upsell,
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

// Delete a upsell by ID
const deleteUpsell = async (req, res) => {
  try {
    await upsellService.deleteUpsell(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Upsell deleted successfully' },
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
  createUpsell,
  getAllUpsells,
  getUpsellById,
  updateUpsell,
  deleteUpsell,
};
