// controllers/paymentController.js

const paymentService = require('../services/paymentService');

// Create a new checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const session = await paymentService.createCheckoutSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new stripe product
const createStripeProduct = async (req, res) => {
  try {
    const product = await paymentService.createStripeProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new stripe plan
const createStripePlan = async (req, res) => {
  try {
    const plan = await paymentService.createStripePlan(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
  createStripeProduct,
  createStripePlan,
};
