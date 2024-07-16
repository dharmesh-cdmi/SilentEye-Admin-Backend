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

const createStripeItem = async (data) => {
  try {
    const {
      paymentGatewayId,
      name,
      amount,
      currency = 'usd',
      description,
      images,
    } = data;
    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    let item = await stripeInstance.products.create({
      name,

      description,
      images,
    });

    const price = await stripeInstance.prices.create({
      product: item.id,
      unit_amount: amount * 100, // Amount in cents
      currency,
    });

    return {
      status: true,
      data: price,
      message: 'Stripe item created successfully',
    };
  } catch (error) {
    console.error('Error creating on stripe:', error);
    throw new Error(`Error creating on Stripe: ${error.message}`);
  }
};

const updateStripeItem = async (data) => {
  try {
    const {
      paymentGatewayId,
      itemId,
      name,
      itemMetadata,
      priceId,
      amount,
      priceMetadata,
    } = data;
    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    // Prepare the update object for the product
    const itemUpdateData = {};
    if (name) itemUpdateData.name = name;
    if (itemMetadata) itemUpdateData.metadata = itemMetadata;

    // Update the product if there are fields to update
    let item;
    if (Object.keys(itemUpdateData).length > 0) {
      item = await stripeInstance.products.update(itemId, itemUpdateData);
    }

    // Prepare the update object for the price
    const priceUpdateData = {};
    if (priceMetadata) priceUpdateData.metadata = priceMetadata;

    // Update the price if there are fields to update
    if (priceId && Object.keys(priceUpdateData).length > 0) {
      await stripeInstance.prices.update(priceId, priceUpdateData);
      console.log('Stripe Product Price updated');
    }

    return {
      status: true,
      message: 'Stripe item updated successfully',
    };
  } catch (error) {
    console.error('Error updating on stripe:', error);
    throw new Error(`Error updating on Stripe: ${error.message}`);
  }
};

const deleteStripeItem = async (data) => {
  try {
    const { paymentGatewayId, itemId } = data;

    const paymentGateway = await PaymentGateway.findById(paymentGatewayId);
    if (!paymentGateway) {
      throw new Error('Payment gateway not found!');
    }

    const stripeInstance = stripe(paymentGateway.saltKey);

    await stripeInstance.products.del(itemId);

    return {
      status: true,
      message: 'Stripe item deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting on stripe:', error);
    throw new Error(`Error deleting on Stripe: ${error.message}`);
  }
};

module.exports = {
  createCheckoutSession,
  createStripeItem,
  updateStripeItem,
  deleteStripeItem,
};
