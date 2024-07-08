// const mongoose = require('mongoose');
// const Visitor = require('../models/visitorModel');
// const connectDB = require('../configs/db.config');

// async function migrate() {
//   await connectDB();

//   console.log('Connected to the database');

//   try {
//     const result = await Visitor.updateMany(
//       { date: { $exists: true } }, // Find documents where 'date' field exists (if 'date' was renamed to 'visitDate')
//       { $rename: { 'date': 'visitDate' } } // Rename 'date' field to 'visitDate'
//     );
//     console.log(`Updated ${result.nModified} documents`);
//   } catch (error) {
//     console.error('Migration failed:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// migrate();
