const Shipping = require('../models/shippingModel');

// Create a new shipping
const createShipping = async (data) => {
  try {
    const shipping = new Shipping(data);
    await shipping.save();
    return shipping;
  } catch (error) {
    throw new Error(`Error in creating shipping: ${error.message}`);
  }
};

// Get all shippings
const getAllShippings = async (page, limit) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };
    return await Shipping.find({}, options);
  } catch (error) {
    throw new Error(`Error in getting shippings: ${error.message}`);
  }
};

// Get shipping by ID
const getShippingById = async (id) => {
  try {
    return await Shipping.findById(id);
  } catch (error) {
    throw new Error(`Error in getting shipping: ${error.message}`);
  }
};

// Update shipping by ID
const updateShipping = async (id, data) => {
  try {
    return await Shipping.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Error in updating shipping: ${error.message}`);
  }
};

// Delete shipping by ID
const deleteShipping = async (id) => {
  try {
    return await Shipping.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error in deleting shipping: ${error.message}`);
  }
};

module.exports = {
  createShipping,
  getAllShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
};
