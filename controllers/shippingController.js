const shippingService = require('../services/shippingService');

// Create a new shipping
const createShipping = async (req, res) => {
  try {
    const shipping = await shippingService.createShipping(req.body);
    res.status(201).json(shipping);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Get all shippings
const getAllShippings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const shippings = await shippingService.getAllShippings(page, limit);
    res.status(200).json(shippings);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Get shipping by ID
const getShippingById = async (req, res) => {
  try {
    const shipping = await shippingService.getShippingById(req.params.id);
    res.status(200).json(shipping);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Update shipping by ID
const updateShipping = async (req, res) => {
  try {
    const shipping = await shippingService.updateShipping(
      req.params.id,
      req.body
    );
    res.status(200).json(shipping);
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

// Delete shipping by ID
const deleteShipping = async (req, res) => {
  try {
    await shippingService.deleteShipping(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ status: true, error: true, message: error.message });
  }
};

module.exports = {
  createShipping,
  getAllShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
};
