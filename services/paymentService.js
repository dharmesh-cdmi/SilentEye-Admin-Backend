// services/paymentService.js

const stripe = require('stripe');
require('dotenv').config();
const PaymentGateway = require('../models/paymentGatewayModel');

const createCheckoutSession = async (data) => {
  try {
    const { paymentGatewayId, amount } = data;
    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return session;
  } catch (error) {
    throw new Error(`Error creating Checkout session: ${error.message}`);
  }
};

module.exports = {
  createCheckoutSession,
};
