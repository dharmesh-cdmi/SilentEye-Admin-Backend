const mongoose = require('mongoose');
const Plan = require('../models/planModel'); // Adjust the path as necessary
const User = require('../models/userModel'); // Adjust the path as necessary
const connectDB = require('../configs/db.config');
const { ObjectId } = mongoose.Types;
const { faker } = require('@faker-js/faker');

const userSeeder = async () => {
  await connectDB();

  // Find all necessary plans
  const premiumPlan = await Plan.findOne({ name: 'Premium' });
  const standardPlan = await Plan.findOne({ name: 'Standard' });
  const demoPlan = await Plan.findOne({ name: 'Demo' });

  if (!premiumPlan || !standardPlan || !demoPlan) {
    console.error('Plans not found. Ensure plans are seeded before running user seeder.');
    return;
  }

  // Array to hold users
  const users = [];

  // Generate additional users
  for (let i = 1; i <= 20; i++) { // Change '30' to the desired number of users
    let selectedPlan;
    const randomPlanIndex = Math.floor(Math.random() * 3); // Randomly select from 0 to 2

    switch (randomPlanIndex) {
      case 0:
        selectedPlan = premiumPlan._id;
        break;
      case 1:
        selectedPlan = standardPlan._id;
        break;
      case 2:
        selectedPlan = demoPlan._id;
        break;
      default:
        selectedPlan = premiumPlan._id; // Default to premium plan if random index is out of range
        break;
    }

    users.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      email_verified_at: faker.date.past(),
      password: faker.internet.password(),
      assignedBy: new ObjectId(), // Example assignedBy ID
      userDetails: {
        profile_avatar: faker.image.avatar(),
        country: faker.address.country(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress()
      },
      status: faker.helpers.arrayElement(['active', 'inactive']),
      lastLoggedInAt: faker.date.recent(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      _id: new ObjectId(), // MongoDB will generate a unique ID
      __v: 0,
      activePlanId: selectedPlan
    });
  }

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Users have been seeded');
};

userSeeder()
  .then(() => {
    console.log('User seeder completed');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('User seeder error:', error);
    mongoose.connection.close();
  });
