const Discount = require('../models/discountModel');
const paymentService = require('./paymentService');

// Create a new discount
const createDiscount = async (data) => {
  try {
    const discount = new Discount(data);
    await discount.save();

    return discount;
  } catch (error) {
    throw new Error('Error in creating discount: ' + error.message);
  }
};

// Get all discounts
const getAllDiscounts = async (page, limit, search, filterValidity) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };

    const query = {};
    const andConditions = [];

    // Apply validity filter
    if (filterValidity) {
      const currentDate = new Date();
      if (filterValidity.toLowerCase() === 'active') {
        andConditions.push({
          $or: [
            { validity: 'No Limit' }, // Matches exactly 'No Limit'
            {
              validity: { $ne: 'No Limit' }, // Exclude 'No Limit'
              $expr: {
                $gt: [
                  { $dateFromString: { dateString: '$validity' } },
                  currentDate,
                ],
              }, // Active discounts with a valid date
            },
          ],
        });
      } else if (filterValidity.toLowerCase() === 'expired') {
        andConditions.push({
          validity: { $ne: 'No Limit' }, // Exclude 'No Limit'
          $expr: {
            $lte: [
              { $dateFromString: { dateString: '$validity' } },
              currentDate,
            ],
          }, // Expired discounts with a valid date
        });
      }
    }

    // Apply search filter
    if (search) {
      andConditions.push({ coupon: { $regex: search, $options: 'i' } });
    }

    // Combine all conditions
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }
    return await Discount.paginate(query, options);
  } catch (error) {
    throw new Error('Error in fetching discounts: ' + error.message);
  }
};

// Get discount by ID
const getDiscountById = async (id) => {
  try {
    return await Discount.findById(id);
  } catch (error) {
    throw new Error('Error in fetching discount: ' + error.message);
  }
};

// Update discount by ID
const updateDiscount = async (id, data) => {
  try {
    const discount = await Discount.findByIdAndUpdate(id, data, { new: true });
    if (!discount) {
      throw new Error('Discount not found!');
    }

    return discount;
  } catch (error) {
    throw new Error('Error in updating discount: ' + error.message);
  }
};

// Delete discount by ID
const deleteDiscount = async (id) => {
  try {
    const discount = await Discount.findByIdAndDelete(id);

    return discount;
  } catch (error) {
    throw new Error('Error in deleting discount: ' + error.message);
  }
};

// Apply discount
const applyDiscount = async (coupon) => {
  try {
    const discount = await Discount.findOne({ coupon });
    if (!discount) throw new Error('Discount not found');

    if (
      discount.validity !== 'no limit' &&
      new Date(discount.validity) < new Date()
    ) {
      throw new Error('Discount validity has expired');
    }

    if (discount.used >= discount.useLimit) {
      throw new Error('Discount use limit reached');
    }

    discount.used += 1;
    await discount.save();

    return discount;
  } catch (error) {
    throw new Error('Error in applying discount: ' + error.message);
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  applyDiscount,
};
