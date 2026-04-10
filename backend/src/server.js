require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const schemeRoutes = require('./routes/schemeRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Middleware to parse JSON bodies and enable CORS
app.use(cors());
app.use(express.json());

// Register API routes
app.use('/api/schemes', schemeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "akashvaani-backend"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
