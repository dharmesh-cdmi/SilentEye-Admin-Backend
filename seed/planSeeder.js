const mongoose = require('mongoose');
const Plan = require('../models/planModel'); // Adjust the path as necessary
const connectDB = require('../configs/db.config');

const planSeeder = async () => {
  connectDB();
  const plans = [
    {
      name: 'Premium',
      icon: 'path/to/premium_icon.jpg',
      mrp: 120,
      discountPercent: 20,
      status: 'live',
      paymentGatewayId: 'pg_001',
      pgPlanId: 'pg_plan_premium',
      pgPriceId: 'pg_price_premium'
    },
    {
      name: 'Standard',
      icon: 'path/to/standard_icon.jpg',
      mrp: 60,
      discountPercent: 16.67,
      status: 'live',
      paymentGatewayId: 'pg_002',
      pgPlanId: 'pg_plan_standard',
      pgPriceId: 'pg_price_standard'
    }
  ];

  // Calculate discountValue, tag, and amount before seeding
  plans.forEach(plan => {
    if (plan.discountPercent && plan.mrp) {
      plan.discountValue = (plan.mrp * plan.discountPercent) / 100;
      plan.tag = `${plan.discountPercent.toFixed(2)}% OFF`;
      plan.amount = plan.mrp - plan.discountValue;
    }
  });

  try {
    await Plan.deleteMany({});
    await Plan.insertMany(plans);
    console.log('Plans have been seeded');
  } catch (error) {
    console.error('Plan seeder error:', error);
  } finally {
    mongoose.connection.close();
  }
};

planSeeder();
