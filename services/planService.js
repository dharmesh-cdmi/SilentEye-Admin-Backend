const Plan = require('../models/planModel');

// Create a new plan
const createPlan = async (data) => {
  try {
    const plan = new Plan(data);
    await plan.save();
    return plan;
  } catch (error) {
    throw new Error(`Error creating plan: ${error.message}`);
  }
};

// Get all plans
const getAllPlans = async () => {
  try {
    return await Plan.find({});
  } catch (error) {
    throw new Error(`Error fetching plans: ${error.message}`);
  }
};

// Get plan by ID
const getPlanById = async (id) => {
  try {
    return await Plan.findById(id);
  } catch (error) {
    throw new Error(`Error fetching plan: ${error.message}`);
  }
};

// Update plan by ID
const updatePlan = async (id, data) => {
  try {
    const plan = await Plan.findByIdAndUpdate(id, data, {
      new: true,
    });
    return plan;
  } catch (error) {
    throw new Error(`Error updating plan: ${error.message}`);
  }
};

// Delete plan by ID
const deletePlan = async (id) => {
  try {
    await Plan.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting plan: ${error.message}`);
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
