require('dotenv').config();
const express = require('express');
const app = express();

const schemeRoutes = require('./routes/schemeRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Register API routes
app.use('/api/schemes', schemeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Akashvaani AI Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
