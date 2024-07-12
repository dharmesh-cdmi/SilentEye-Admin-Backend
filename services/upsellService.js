const Upsell = require('../models/upsellModel');

// Create a new upsell
const createUpsell = async (data) => {
  try {
    const upsell = new Upsell(data);
    await upsell.save();
    return upsell;
  } catch (error) {
    throw new Error(`Error creating upsell: ${error.message}`);
  }
};

// Get all upsells
const getAllUpsells = async () => {
  try {
    return await Upsell.find({});
  } catch (error) {
    throw new Error(`Error fetching upsells: ${error.message}`);
  }
};

// Get upsell by ID
const getUpsellById = async (id) => {
  try {
    return await Upsell.findById(id);
  } catch (error) {
    throw new Error(`Error fetching upsell: ${error.message}`);
  }
};

// Update upsell by ID
const updateUpsell = async (id, data) => {
  try {
    const upsell = await Upsell.findByIdAndUpdate(id, data, { new: true });
    return upsell;
  } catch (error) {
    throw new Error(`Error updating upsell: ${error.message}`);
  }
};

// Delete upsell by ID
const deleteUpsell = async (id) => {
  try {
    await Upsell.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting upsell: ${error.message}`);
  }
};

module.exports = {
  createUpsell,
  getAllUpsells,
  getUpsellById,
  updateUpsell,
  deleteUpsell,
};
