const mongoose = require('mongoose');
const Orders = require('../../models/ordersModel');
const connectDB = require('../../configs/db.config');
const { faker } = require('@faker-js/faker');


async function seedOrders() {
  await connectDB();

  try {
    // Create fake plan data
    const planDetails = {
      planId: new mongoose.Types.ObjectId(),
      planName: faker.commerce.productName(),
      amount: faker.finance.amount(),
      mrp: faker.finance.amount(),
      upSell: faker.commerce.productAdjective(),
      duration: 'Monthly',  // Set to 'Monthly' or 'Yearly' as needed
      discount: faker.finance.amount(),         // Set to your desired discount amount
      coupon: 'ABC5%',     // Set to your desired coupon code
      tag: 'test'
    };

    // // Create fake refund data
    // const refundDetails = {
    //   refundRequestId: new mongoose.Types.ObjectId(),
    //   refundAmount: faker.finance.amount(),
    //   refundDate: faker.date.past(),
    //   refundReason: faker.lorem.sentence()
    // };

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

    // Create fake order data
    const order = new Orders({
      userId: new mongoose.Types.ObjectId(),
      orderId: faker.string.uuid(),
      planDetails: planDetails,
      addOns: addOns,
      orderDetails: orderDetails,
      paymentMethod: 'Net Banking',
      status: 'Completed',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
    });

    await order.save();
    console.log('Order seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedOrders();
