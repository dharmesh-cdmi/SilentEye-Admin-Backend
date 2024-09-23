const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cron = require('node-cron');
const connectDB = require('./configs/db.config');
const routes = require('./routes/index');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const {
  updateWithdrawalStatuses,
} = require('./services/withdrawalRequestService');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5111;

// const allowedOrigins = [
//     "*", 
//     // process.env.FRONTEND_URL, 
//     'http://localhost:5173'
// ];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// };

const allowedOrigins = [
    "*", 
    'http://localhost:5173',
    // process.env.FRONTEND_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


//Express Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/static', express.static(path.join(__dirname, 'static')));

// Connection URL
//Please dont pass anythign from here its auto config from .env file in db config file
connectDB();

//Server status endpoint
app.get('/', (req, res) => {
  res.send('Server is Up!');
});

// Routes
app.use('/api', routes);
app.use(errorHandlerMiddleware);

// Schedule the status updates to run every day at midnight
// cron.schedule('0 0 * * *', async () => {
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled withdrawal status update...');
  await updateWithdrawalStatuses();
});

app.listen(port, () => {
  console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
