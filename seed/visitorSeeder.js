const mongoose = require('mongoose');
const connectDB = require('../configs/db.config');
const { faker } = require('@faker-js/faker');
const Visitor = require('../models/visitorModel'); // Adjust the path as per your project structure

// Function to seed visitors
async function seedVisitors() {
  try {
    await connectDB();
    // Clear existing data
    await Visitor.deleteMany();

    // Generate and save sample visitors
    const visitorCount = 20; // Adjust as needed
    const visitors = [];

    for (let i = 0; i < visitorCount; i++) {
      const visitor = new Visitor({
        page: faker.helpers.arrayElement(['home', 'Checkout', 'Plan']),
        date: faker.date.recent(),
        action: faker.helpers.arrayElement(['Visit', 'Checkout', 'Demo View', 'Order Placed', 'Login']),
        isVisit: faker.datatype.boolean(),
        country: faker.location.country(),
        device: faker.internet.userAgent(),
        IP: faker.internet.ip(),
      });
      visitors.push(visitor);
    }

    // Insert visitors into the database
    await Visitor.insertMany(visitors);
    console.log('Data seeding complete');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  }
}

seedVisitors();
