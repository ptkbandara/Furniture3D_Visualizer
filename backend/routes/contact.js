const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); 


router.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    
    const newMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;