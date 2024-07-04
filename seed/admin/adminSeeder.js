const mongoose = require('mongoose');
const connectDB = require('../../configs/db.config');
const Admin = require('../../models/admin/adminModel');

// Sample Admin Data
const admins = [
  {
    name: 'Admin 1',
    email: 'admin@gmail.com',
    email_verified_at: new Date(),
    password: '123456',  // Remember to hash passwords in a real application
    role: 'admin',
    status: 'active',
    remember_token:null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Admin 2',
    email: 'manager@gmail.com',
    email_verified_at: new Date(),
    password: '123456',  // Remember to hash passwords in a real application
    role: 'manager',
    status: 'active',
    remember_token:null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to Seed Admin Data
const seedAdmins = async () => {
  try {
    await connectDB();  // Connect to MongoDB
    await Admin.deleteMany();  // Clear existing data
    const insertedAdmins = await Admin.insertMany(admins);  // Insert new data
    console.log('Admins seeded successfully');
  } catch (err) {
    console.error('Error seeding admins:', err);
  } finally {
    mongoose.disconnect();  // Disconnect from MongoDB
  }
};

// Run the Seeder
seedAdmins();
