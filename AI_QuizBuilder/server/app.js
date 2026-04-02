require('dotenv').config(); // This loads your .env variables
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware to read JSON data from requests
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('AI Quiz Builder API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors()); // Add this before your routes

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

