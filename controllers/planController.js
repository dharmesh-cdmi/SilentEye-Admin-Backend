// controllers/planController.js

const planService = require('../services/planService');

// Create a new plan
const createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a plan by ID
const updatePlan = async (req, res) => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a plan by ID
const deletePlan = async (req, res) => {
  try {
    await planService.deletePlan(req.params.id);
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
