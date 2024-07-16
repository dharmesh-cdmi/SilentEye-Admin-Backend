const mongoose = require('mongoose');
const Plan = require('../models/planModel'); // Adjust the path as necessary
const connectDB = require('../configs/db.config');

const planSeeder = async () => {
  connectDB();
  const plans = [
    {
      name: 'Premium',
      icon: 'path/to/premium_icon.jpg',
      amount: 100,
      mrp: 120,
      discountPercent: 20,
      discountValue: 20,
      tag: '20% OFF',
      status: 'live',
      paymentGatewayId: 'pg_001',
      pgPlanId: 'pg_plan_premium',
      pgPriceId: 'pg_price_premium'
    },
    {
      name: 'Standard',
      icon: 'path/to/standard_icon.jpg',
      amount: 50,
      mrp: 60,
      discountPercent: 16.67,
      discountValue: 10,
      tag: '16.67% OFF',
      status: 'live',
      paymentGatewayId: 'pg_002',
      pgPlanId: 'pg_plan_standard',
      pgPriceId: 'pg_price_standard'
    },
    {
      name: 'Demo',
      icon: 'path/to/demo_icon.jpg', // Adjust path as necessary
      amount: 0,
      mrp: 0,
      discountPercent: 0,
      discountValue: 0,
      tag: 'Free',
      status: 'live',
      paymentGatewayId: 'pg_003', // Adjust as necessary
      pgPlanId: 'pg_plan_demo', // Adjust as necessary
      pgPriceId: 'pg_price_demo' // Adjust as necessary
    }
  ];

  await Plan.deleteMany({});
  await Plan.insertMany(plans);
  console.log('Plans have been seeded');
};

planSeeder()
  .then(() => {
    console.log('Plan seeder completed');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Plan seeder error:', error);
    mongoose.connection.close();
  });
