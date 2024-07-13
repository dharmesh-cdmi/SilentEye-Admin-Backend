const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require("./configs/db.config");
const routes = require('./routes/index');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

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
app.use('/static', express.static(path.join(__dirname, 'static')));

// Connection URL
const DB = process.env.MONGO_URI;
console.log(DB);
connectDB(DB);

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Server is Up!');
});

// Routes
app.use("/api", routes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
