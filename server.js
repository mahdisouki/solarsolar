const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/AuthRoute');
const blogRoutes = require('./routes/BlogRoute');
const serviceRoutes = require('./routes/ServiceRoute');
const AdminModel = require('./models/Admin.model');

// Initialize dotenv
dotenv.config();
require('./db/cnx');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', authRoutes);   // For admin authentication (register, login)
app.use('/api/blogs', blogRoutes);    // For blog operations
app.use('/api/services', serviceRoutes); // For services operations



// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
