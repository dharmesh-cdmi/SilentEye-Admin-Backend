// controllers/addonController.js

const addonService = require('../services/addonService');

// Create a new addon
const createAddon = async (req, res) => {
  try {
    const addon = await addonService.createAddon(req.body);
    res.status(201).json(addon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all addons
const getAllAddons = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterStatus } = req.query;
    const addons = await addonService.getAllAddons(
      page,
      limit,
      search,
      filterStatus
    );
    res.status(200).json(addons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single addon by ID
const getAddonById = async (req, res) => {
  try {
    const addon = await addonService.getAddonById(req.params.id);
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a addon by ID
const updateAddon = async (req, res) => {
  try {
    const addon = await addonService.updateAddon(req.params.id, req.body);
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a addon by ID
const deleteAddon = async (req, res) => {
  try {
    await addonService.deleteAddon(req.params.id);
    res.status(200).json({ message: 'Addon deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAddon,
  getAllAddons,
  getAddonById,
  updateAddon,
  deleteAddon,
};
