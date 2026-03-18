const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Routes
const authRoutes = require('./routes/auth');
const designRoutes = require('./routes/designs');
const contactRoutes = require('./routes/contact'); 

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/designs', designRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/furniture-app';

mongoose.connect(MONGO_URI)
  .then(async () => {
      console.log('MongoDB Connected Successfully!');
      
      
      try {
        await mongoose.connection.collection('users').dropIndex('email_1');
        console.log('Old email index fixed successfully!');
      } catch (error) {
       
      }
      
  })
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Basic test route
app.get('/', (req, res) => {
    res.send('Furniture App Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});