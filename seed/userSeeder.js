const mongoose = require('mongoose');
const connectDB = require('../configs/db.config');
const User = require('../models/userModel');
const { hashPasswords } = require('../utils'); // Adjust the path accordingly

// Define user data
const users = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        email_verified_at: new Date(),
        password: '123456', // Plain password (will be hashed before insertion)
        assignedBy: '60d3b41abdacab0026a733c6',
        userDetails: {
            profile_avatar: 'path/to/avatar.jpg',
            country: 'USA',
            phone: 1234567890,
            address: '1234 Elm Street',
        },
        status: 'active',
        remember_token: 'random_token',
        lastLoggedInAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        email_verified_at: new Date(),
        password: '123456', // Plain password (will be hashed before insertion)
        assignedBy: '60d3b41abdacab0026a733c7',
        userDetails: {
            profile_avatar: 'path/to/avatar2.jpg',
            country: 'India',
            phone: 9876543210,
            address: '5678 Oak Street',
        },
        status: 'active',
        remember_token: 'random_token2',
        lastLoggedInAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // Add more user data as needed
];

async function seedUsers() {
    try {
        await connectDB(); // Connect to MongoDB
        await hashPasswords(users); // Hash passwords before inserting
        await User.deleteMany(); // Delete existing users
        const insertedUsers = await User.insertMany(users); // Insert new users
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    } finally {
        mongoose.connection.close(); // Close MongoDB connection
    }
}

// Run the seeder
seedUsers();
