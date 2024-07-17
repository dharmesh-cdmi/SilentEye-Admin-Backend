// controllers/paymentGatewayController.js

const paymentGatewayService = require('../services/paymentGatewayService');

// Create a new payment gateway
const createPaymentGateway = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.createPaymentGateway(
      {...req.body, icon: req.file?.path}
    );
    res.status(201).json(paymentGateway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all payment gateways
const getAllPaymentGateways = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const paymentGateways = await paymentGatewayService.getAllPaymentGateways(
      page,
      limit
    );
    res.status(200).json(paymentGateways);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single payment gateway by ID
const getPaymentGatewayById = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.getPaymentGatewayById(
      req.params.id
    );
    res.status(200).json(paymentGateway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a payment gateway by ID
const updatePaymentGateway = async (req, res) => {
  try {
    const paymentGateway = await paymentGatewayService.updatePaymentGateway(
      req.params.id,
      req.body
    );
    res.status(200).json(paymentGateway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a payment gateway by ID
const deletePaymentGateway = async (req, res) => {
  try {
    await paymentGatewayService.deletePaymentGateway(req.params.id);
    res.status(200).json({ message: 'Payment Gateway deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPaymentGateway,
  getAllPaymentGateways,
  getPaymentGatewayById,
  updatePaymentGateway,
  deletePaymentGateway,
};
