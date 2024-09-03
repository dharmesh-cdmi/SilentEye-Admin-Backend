const Upsell = require('../models/upsellModel');

// Create a new upsell
const createUpsell = async (req) => {
  try {
    const image = req.file ? req.file.path : '';
    const { name, count } = req.body;
    const upsell = new Upsell({
      ...req.body,
      products: JSON.parse(req?.body?.products),
      upsell: {
        name,
        count,
        image,
      },
    });
    await upsell.save();
    return upsell;
  } catch (error) {
    throw new Error(`Error creating upsell: ${error.message}`);
  }
};

// Get all upsells
const getAllUpsells = async (page, limit, search, filterStatus) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: [
        { path: 'plan', select: 'name icon' },
        { path: 'products', select: 'title' },
      ],
    };

    const query = {};
    if (filterStatus) {
      query.status = filterStatus;
    }
    if (search) {
      query.$or = [
        { 'upsell.name': { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
      ];
    }

    return await Upsell.paginate(query, options);
  } catch (error) {
    throw new Error(`Error fetching upsells: ${error.message}`);
  }
};

// Get upsell by ID
const getUpsellById = async (id) => {
  try {
    return await Upsell.findById(id)
      .populate('plan', 'name icon')
      .populate('products', 'title');
  } catch (error) {
    throw new Error(`Error fetching upsell: ${error.message}`);
  }
};

// Update upsell by ID
const updateUpsell = async (id, req) => {
  try {
    const data = req.body;
    const image = req.file ? req.file.path : undefined; // Get the new image if it was uploaded

    // Find the existing upsell
    let upsell = await Upsell.findById(id);
    if (!upsell) {
      throw new Error('Upsell not found!');
    }

    // Update fields
    upsell.upsell.name = data.name || upsell.upsell.name;
    upsell.upsell.count = data.count || upsell.upsell.count;

    // Update image if a new one is provided
    if (image) {
      upsell.upsell.image = image;
    }

    // Update other fields
    upsell.plan = data.plan || upsell.plan;
    upsell.order = data.order || upsell.order;
    upsell.key = data.key || upsell.key;
    upsell.amount = data.amount || upsell.amount;
    upsell.mrp = data.mrp || upsell.mrp;
    upsell.discountPercent = data.discountPercent || upsell.discountPercent;
    upsell.discountValue = data.discountValue || upsell.discountValue;
    upsell.device = data.device || upsell.device;
    upsell.tag = data.tag || upsell.tag;
    upsell.status = data.status || upsell.status;
    upsell.products = data.products || upsell.products;

    // Save the updated upsell
    await upsell.save();

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
