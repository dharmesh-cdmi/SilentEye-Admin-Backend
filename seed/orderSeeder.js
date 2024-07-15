const mongoose = require('mongoose');
const Orders = require('../models/ordersModel');
const RefundRequest = require('../models/refundRequestModel');
const Plan = require('../models/planModel'); // Adjust the path as necessary
const User = require('../models/userModel'); // Adjust the path as necessary
const connectDB = require('../configs/db.config');
const { faker } = require('@faker-js/faker');

async function seedOrders() {
  await connectDB();

  try {
    // Fetch plans
    const plans = await Plan.find({});
    if (!plans.length) {
      console.error('No plans found. Ensure plans are seeded before running order seeder.');
      return;
    }

    // Fetch users
    const users = await User.find({});

    // Seed orders with refund data
    for (let i = 0; i < 500; i++) {
      // Randomly select a user
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Randomly select a plan
      const selectedPlan = plans[Math.floor(Math.random() * plans.length)];

      // Create fake add-ons data
      const addOns = Array.from({ length: 2 }).map(() => ({
        name: faker.commerce.productName(),
        amount: parseFloat(faker.commerce.price()),
        mrp: parseFloat(faker.commerce.price()),
        description: faker.lorem.sentence()
      }));

      // Create fake order details data
      const orderDetails = {
        email: randomUser.email,
        country: randomUser.userDetails.country,
        purchase: faker.date.past(),
        total: parseFloat(faker.commerce.price())
      };

      // Create fake refund request data
      const refundRequest = new RefundRequest({
        index: i + 1,
        requestId: `RE${i + 1}`,
        email: randomUser.email,
        amount: parseFloat(faker.commerce.price()),
        status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected', 'Refunded', 'True Refunded']),
        type: faker.helpers.arrayElement(['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4', 'Reason 5']),
        checked: faker.datatype.boolean(),
        planId: selectedPlan._id // Link the refund request to the selected plan
      });

      await refundRequest.save();

      // Determine order status and create refund details if necessary
      const orderStatus = faker.helpers.arrayElement(['Pending', 'Completed', 'Refunded']);
      let refundDetails = null;

      if (orderStatus === 'Refunded') {
        refundDetails = {
          refundRequestId: refundRequest._id,
          refundAmount: refundRequest.amount,
          refundDate: faker.date.recent(),
          refundReason: refundRequest.type
        };
      }

      // Create fake order data
      const order = new Orders({
        userId: randomUser._id,
        orderId: faker.datatype.uuid(),
        planDetails: {
          planId: selectedPlan._id,
          planName: selectedPlan.name,
          amount: selectedPlan.amount,
          mrp: selectedPlan.mrp,
          upSell: selectedPlan.upSell,
          duration: faker.helpers.arrayElement(['Monthly', 'Yearly']), // Randomly select duration
          discount: selectedPlan.discount,
          coupon: faker.helpers.arrayElement(['SAVE10', 'DISCOUNT20', 'OFFER30']), // Randomly select coupon code
          tag: 'test'
        },
        addOns: addOns,
        orderDetails: orderDetails,
        paymentMethod: faker.helpers.arrayElement(['Credit Card', 'Debit Card', 'Bank Transfer', 'Net Banking']),
        status: orderStatus,
        refundDetails: refundDetails,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });

      await order.save();
      console.log('Order seeded successfully');
    }

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedOrders();
