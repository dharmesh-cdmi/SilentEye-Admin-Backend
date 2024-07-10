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
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    });
    return {
      status: true,
      data: session,
      message: 'Stripe session created successfully',
    };
  } catch (error) {
    throw new Error(`Error creating Checkout session: ${error.message}`);
  }
};

const createStripeProduct = async (data) => {
  try {
    const { paymentGatewayId, name, amount, currency = 'usd' } = data;
    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    const product = await stripeInstance.products.create({
      name,
    });
    console.log('Stripe Product created:', product);

    const price = await stripeInstance.prices.create({
      product: product.id,
      unit_amount: amount, // Amount in cents
      currency,
    });
    console.log('Stripe Product Price created:', price);

    return {
      status: true,
      data: price,
      message: 'Stripe product/addon created successfully',
    };
  } catch (error) {
    console.error('Error creating on stripe:', error);
    throw new Error(`Error creating on Stripe: ${error.message}`);
  }
};

const createStripePlan = async (data) => {
  try {
    const { paymentGatewayId, name, amount, currency = 'usd' } = data;
    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    const product = await stripeInstance.products.create({
      name,
    });

    const price = await stripeInstance.prices.create({
      product: product.id,
      unit_amount: amount, // Amount in cents
      currency,
    });
    console.log('Stripe Product Price created:', price);

    return {
      status: true,
      data: price,
      message: 'Stripe product/addon created successfully',
    };
  } catch (error) {
    console.error('Error creating on stripe:', error);
    throw new Error(`Error creating on Stripe: ${error.message}`);
  }
};

module.exports = {
  createCheckoutSession,
  createStripeProduct,
  createStripePlan,
};
