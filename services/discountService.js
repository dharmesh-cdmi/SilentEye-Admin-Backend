const Discount = require('../models/discountModel');
const paymentService = require('./paymentService');

// Create a new discount
const createDiscount = async (data) => {
  try {
    const discount = new Discount(data);
    await discount.save();

    const stripeDiscount = await paymentService.createStripeDiscount(discount);

    discount.pgDiscountId = stripeDiscount.id;
    await discount.save();

    return discount;
  } catch (error) {
    throw new Error('Error in creating discount: ' + error.message);
  }
};

// Get all discounts
const getAllDiscounts = async () => {
  try {
    return await Discount.find();
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
    // Update corresponding discount in Stripe
    await paymentService.updateStripeDiscount(discount);

    return discount;
  } catch (error) {
    throw new Error('Error in updating discount: ' + error.message);
  }
};

// Delete discount by ID
const deleteDiscount = async (id) => {
  try {
    const discount = await Discount.findByIdAndDelete(id);

    // Delete corresponding discount in Stripe
    await paymentService.deleteStripeDiscount(
      discount.paymentGatewayId,
      discount?.pgDiscountId
    );

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
