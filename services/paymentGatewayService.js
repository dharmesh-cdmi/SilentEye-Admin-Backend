// services/paymentGatewayService.js
const PaymentGateway = require('../models/paymentGatewayModel');

// Create a new payment gateway
const createPaymentGateway = async (data) => {
  const paymentGateway = new PaymentGateway(data);
  await paymentGateway.save();
  return paymentGateway;
};

// Get all payment gateways
const getAllPaymentGateways = async (page, limit, search) => {
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
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
      ];
    }

    return await PaymentGateway.paginate(query, options);
  } catch (error) {
    throw new Error('Error in fetching payment gateways: ' + error.message);
  }
};

// Get a single payment gateway by ID
const getPaymentGatewayById = async (id) => {
  const paymentGateway = await PaymentGateway.findById(id);
  if (!paymentGateway) {
    throw new Error('Payment Gateway not found!');
  }
  return paymentGateway;
};

// Update a payment gateway by ID
const updatePaymentGateway = async (id, data) => {
  const paymentGateway = await PaymentGateway.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!paymentGateway) {
    throw new Error('Payment Gateway not found!');
  }
  return paymentGateway;
};

// Delete a payment gateway by ID
const deletePaymentGateway = async (id) => {
  const paymentGateway = await PaymentGateway.findByIdAndDelete(id);
  if (!paymentGateway) {
    throw new Error('Payment Gateway not found!');
  }
  return paymentGateway;
};

module.exports = {
  createPaymentGateway,
  getAllPaymentGateways,
  getPaymentGatewayById,
  updatePaymentGateway,
  deletePaymentGateway,
};
