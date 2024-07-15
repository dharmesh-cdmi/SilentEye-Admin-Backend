// controllers/upsellController.js

const upsellService = require('../services/upsellService');

// Create a new upsell
const createUpsell = async (req, res) => {
  try {
    const upsell = await upsellService.createUpsell(req.body);
    res.status(201).json(upsell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all upsells
const getAllUpsells = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const upsells = await upsellService.getAllUpsells(page, limit);
    res.status(200).json(upsells);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single upsell by ID
const getUpsellById = async (req, res) => {
  try {
    const upsell = await upsellService.getUpsellById(req.params.id);
    res.status(200).json(upsell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a upsell by ID
const updateUpsell = async (req, res) => {
  try {
    const upsell = await upsellService.updateUpsell(req.params.id, req.body);
    res.status(200).json(upsell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a upsell by ID
const deleteUpsell = async (req, res) => {
  try {
    await upsellService.deleteUpsell(req.params.id);
    res.status(200).json({ message: 'Upsell deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUpsell,
  getAllUpsells,
  getUpsellById,
  updateUpsell,
  deleteUpsell,
};
