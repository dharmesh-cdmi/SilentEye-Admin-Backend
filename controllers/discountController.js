const discountService = require('../services/discountService');

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const discount = await discountService.createDiscount(req.body);
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getAllDiscounts();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update discount by ID
const updateDiscount = async (req, res) => {
  try {
    const discount = await discountService.updateDiscount(
      req.params.id,
      req.body
    );
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete discount by ID
const deleteDiscount = async (req, res) => {
  try {
    const discount = await discountService.deleteDiscount(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply discount
const applyDiscount = async (req, res) => {
  try {
    const discount = await discountService.applyDiscount(req.body.coupon);
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
