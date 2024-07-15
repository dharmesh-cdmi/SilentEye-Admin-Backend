const refundRequestService = require('../services/refundRequestService');

// Create a new refund request
const createRefundRequest = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.createRefundRequest(
      req.body
    );
    res.status(201).json(refundRequest);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Get all refund requests
const getAllRefundRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const refundRequests = await refundRequestService.getAllRefundRequests(
      page,
      limit
    );
    res.status(200).json(refundRequests);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Get refund request by ID
const getRefundRequestById = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.getRefundRequestById(
      req.params.id
    );
    res.status(200).json(refundRequest);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Update refund request by ID
const updateRefundRequest = async (req, res) => {
  try {
    const refundRequest = await refundRequestService.updateRefundRequest(
      req.params.id,
      req.body
    );
    res.status(200).json(refundRequest);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Delete refund request by ID
const deleteRefundRequest = async (req, res) => {
  try {
    await refundRequestService.deleteRefundRequest(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

module.exports = {
  createRefundRequest,
  getAllRefundRequests,
  getRefundRequestById,
  updateRefundRequest,
  deleteRefundRequest,
};
