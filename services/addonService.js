// services/addonService.js
const Addon = require('../models/addonModel');
const paymentService = require('./paymentService');

// Create a new addon
const createAddon = async (data) => {
  const addon = new Addon(data);
  await addon.save();
  const stripeData = {
    paymentGatewayId: data?.paymentGatewayId,
    name: data?.title,
    amount: data?.mrp,
    currency: 'usd',
  };
  await paymentService.createStripeProduct(stripeData);
  return addon;
};

// Get all addons
const getAllAddons = async () => {
  return await Addon.find({});
};

// Get a single addon by ID
const getAddonById = async (id) => {
  const addon = await Addon.findById(id);
  if (!addon) {
    throw new Error('Addon not found!');
  }
  return addon;
};

// Update a addon by ID
const updateAddon = async (id, data) => {
  const addon = await Addon.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!addon) {
    throw new Error('Addon not found!');
  }
  return addon;
};

// Delete a addon by ID
const deleteAddon = async (id) => {
  const addon = await Addon.findByIdAndDelete(id);
  if (!addon) {
    throw new Error('Addon not found!');
  }
  return addon;
};

module.exports = {
  createAddon,
  getAllAddons,
  getAddonById,
  updateAddon,
  deleteAddon,
};
