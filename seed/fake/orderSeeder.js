const mongoose = require('mongoose');
const Orders = require('../../models/ordersModel');
const RefundRequest = require('../../models/refundRequestModel');
const connectDB = require('../../configs/db.config');
const { faker } = require('@faker-js/faker');

async function seedOrders() {
  await connectDB();

  try {
    // Seed orders with refund data
    for (let i = 0; i < 10; i++) {
      // Create fake plan data
      const planDetails = {
        planId: new mongoose.Types.ObjectId(),
        planName: faker.commerce.productName(),
        amount: faker.finance.amount(),
        mrp: faker.finance.amount(),
        upSell: faker.commerce.productAdjective(),
        duration: 'Monthly',  // Set to 'Monthly' or 'Yearly' as needed
        discount: faker.finance.amount(),  // Set to your desired discount amount
        coupon: 'ABC5%',     // Set to your desired coupon code
        tag: 'test'
      };

      // Create fake add-ons data
      const addOns = Array.from({ length: 2 }).map(() => ({
        name: faker.commerce.productName(),
        amount: faker.finance.amount(),
        mrp: faker.finance.amount(),
        description: faker.lorem.sentence()
      }));

      // Create fake order details data
      const orderDetails = {
        email: faker.internet.email(),
        country: 'INDIA',
        purchase: faker.date.past(),
        total: faker.finance.amount()
      };

      // Create fake refund request data
      const refundRequest = new RefundRequest({
        index: i + 1,
        requestId: `RE${i + 1}`,
        email: faker.internet.email(),
        amount: faker.finance.amount(),
        status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected', 'Refunded', 'True Refunded']),
        type: faker.helpers.arrayElement(['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4', 'Reason 5']),
        checked: faker.datatype.boolean(),
        planId: new mongoose.Types.ObjectId()
      });

      await refundRequest.save();

      // Create fake order data
      const order = new Orders({
        userId: new mongoose.Types.ObjectId(),
        orderId: faker.datatype.uuid(),
        planDetails: planDetails,
        addOns: addOns,
        orderDetails: orderDetails,
        paymentMethod: 'Net Banking',
        status: 'Completed',
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        refundRequestId: refundRequest._id  // Link the refund request to the order
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
