const express = require('express');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

//Express Server Setup
const app = express();
const port = process.env.PORT || 5111;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//Express Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Connection URL
const DB = process.env.DB_URI;
connectDB(DB);

// Import and use the auth routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/users', require('./routes/testAPI'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
