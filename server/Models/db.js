const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URL from environment variables
const DB_URL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(DB_URL).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('Error Connecting to MongoDB', err);
});
