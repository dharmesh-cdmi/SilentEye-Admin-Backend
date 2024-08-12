const Upsell = require('../models/upsellModel');

// Create a new upsell
const createUpsell = async (req) => {
  try {
    const image = req.file ? req.file.path : '';
    const { name, count } = req.body;
    const upsell = new Upsell({
      ...req.body,
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
      populate: { path: 'plan', select: 'name icon' },
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
    return await Upsell.findById(id).populate('plan', 'name icon');
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
