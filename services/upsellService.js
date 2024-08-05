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

// // Get all upsells
// const getAllUpsells = async (page, limit) => {
//   try {
//     const options = {
//       page: parseInt(page, 10),
//       limit: parseInt(limit, 10),
//       sort: { createdAt: -1 },
//     };

//     return await Upsell.paginate({}, options);
//   } catch (error) {
//     throw new Error(`Error fetching upsells: ${error.message}`);
//   }
// };
// Get all upsells
const getAllUpsells = async (page, limit, search) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };

    // Create a query object
    const query = {};

    // If a search term is provided, add it to the query
    if (search) {
      // const lowerCaseSearch = search.toLowerCase();
      query.$or = [
        { 'planName.name': { $regex: lowerCaseSearch, $options: 'i' } },
        { 'upsell.name': { $regex: lowerCaseSearch, $options: 'i' } },
        { tag: { $regex: lowerCaseSearch, $options: 'i' } },
        { status: { $regex: lowerCaseSearch, $options: 'i' } },
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
