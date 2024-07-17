// services/addonService.js
const Addon = require('../models/addonModel');
const paymentService = require('./paymentService');

// Create a new addon
const createAddon = async (data) => {
  try {
    const pgData = {
      paymentGatewayId: data?.paymentGatewayId,
      name: data?.title,
      amount: data?.mrp,
      currency: 'usd',
      description: data?.description,
    };

    const pgProduct = await paymentService.createStripeItem(pgData);

    data = {
      ...data,
      paymentGatewayId: data?.paymentGatewayId,
      pgProductId: pgProduct?.data?.product,
      pgPriceId: pgProduct?.data?.id,
    };

    const addon = new Addon(data);
    await addon.save();

    return {
      status: true,
      data: addon,
      message: 'Addon created successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in creating addon: ' + error,
    };
  }
};

// Get all addons
const getAllAddons = async (page, limit) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };
    return await Addon.find({}, options);
  } catch (error) {
    throw new Error('Error in fetching addons: ' + error.message);
  }
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
  try {
    let addon = await getAddonById(id);

    const pgData = {
      paymentGatewayId: addon?.paymentGatewayId,
      productId: addon?.pgProductId,
      name: data?.title,
      productMetadata: data?.productMetadata ? data.productMetadata : undefined,
      priceId: addon?.pgPriceId,
      amount: data?.mrp ? data.mrp : undefined,
      priceMetadata: data?.priceMetadata ? data.priceMetadata : undefined,
    };

    const pgProduct = await paymentService.updateStripeProduct(pgData);
    if (!pgProduct) {
      throw new Error('Addon not updated on stripe!');
    }

    addon = await Addon.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!addon) {
      throw new Error('Addon not found!');
    }

    return {
      status: true,
      data: addon,
      message: 'Addon updated successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in updating addon: ' + error,
    };
  }
};

// Delete a addon by ID
const deleteAddon = async (id) => {
  try {
    let addon = await getAddonById(id);
    if (!addon) {
      throw new Error('Addon not found!');
    }

    const pgData = {
      paymentGatewayId: addon?.paymentGatewayId,
      itemId: addon?.pgAddonId,
    };

    const pgAddon = await paymentService.deleteStripeItem(pgData);

    if (!pgAddon) {
      throw new Error('Addon not deleted on stripe!');
    }

    addon = await Addon.findByIdAndDelete(id);

    return {
      status: true,
      data: addon,
      message: 'Addon deleted successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in deleting addon: ' + error,
    };
  }
};

module.exports = {
  createAddon,
  getAllAddons,
  getAddonById,
  updateAddon,
  deleteAddon,
};
