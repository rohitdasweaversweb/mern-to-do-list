const express = require('express');
const dotenv = require('dotenv');
const connectDB= require('../server/Models/db'); 
const TaskRouter=require('../server/Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors=require('cors');
// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send(`It's Running`);
});
app.use('/task',TaskRouter);
// app.use(TaskRouter);
// Define the port to listen on
const PORT = process.env.PORT || 8050;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
