const express = require('express');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Import and use the auth routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/users', require('./routes/testAPI'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});