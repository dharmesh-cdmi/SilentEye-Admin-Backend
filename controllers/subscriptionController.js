// controllers/subscriptionController.js

const subscriptionService = require('../services/subscriptionService');

// Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single subscription by ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(
      req.params.id
    );
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a subscription by ID
const updateSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.updateSubscription(
      req.params.id,
      req.body
    );
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a subscription by ID
const deleteSubscription = async (req, res) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(200).json({ message: 'subscription deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
