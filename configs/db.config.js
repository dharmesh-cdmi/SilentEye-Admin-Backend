require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (DB) => {
    console.log('Connecting to MongoDB...');
    const defaultDB = process.env.MONGO_URI;
    const databaseURL = DB || defaultDB;
    try {
        const conn = await mongoose.connect(databaseURL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
