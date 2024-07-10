const Subscription = require('../models/subscriptionModel');

// Create a new subscription
const createSubscription = async (data) => {
  try {
    const subscription = new Subscription(data);
    await subscription.save();
    return subscription;
  } catch (error) {
    throw new Error(`Error creating subscription: ${error.message}`);
  }
};

// Get all subscriptions
const getAllSubscriptions = async () => {
  try {
    return await Subscription.find({});
  } catch (error) {
    throw new Error(`Error fetching subscriptions: ${error.message}`);
  }
};

// Get subscription by ID
const getSubscriptionById = async (id) => {
  try {
    return await Subscription.findById(id);
  } catch (error) {
    throw new Error(`Error fetching subscription: ${error.message}`);
  }
};

// Update subscription by ID
const updateSubscription = async (id, data) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(id, data, {
      new: true,
    });
    return subscription;
  } catch (error) {
    throw new Error(`Error updating subscription: ${error.message}`);
  }
};

// Delete subscription by ID
const deleteSubscription = async (id) => {
  try {
    await Subscription.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting subscription: ${error.message}`);
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
