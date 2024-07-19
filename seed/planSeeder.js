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
      paymentGatewayId: null, // Set to null or remove if not applicable
      pgPlanId: 'pg_plan_premium',
      pgPriceId: 'pg_price_premium'
    },
    {
      name: 'Standard',
      icon: 'path/to/standard_icon.jpg',
      mrp: 60,
      discountPercent: 16.67,
      status: 'live',
      paymentGatewayId: null, // Set to null or remove if not applicable
      pgPlanId: 'pg_plan_standard',
      pgPriceId: 'pg_price_standard'
    }
  ];

  // No need to manually calculate discountValue, tag, and amount since it's handled in pre-validate hook
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
