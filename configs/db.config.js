const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (DB=process.env.MONGO_URI) => {
    console.log('DB URI:', DB); 
    console.log('Connecting to MongoDB...');
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

