const express = require('express');
const router = express.Router();
const Design = require('../models/Design');


router.post('/create', async (req, res) => {
  try {
    const { designerId, designName, width, length, shape, colorScheme } = req.body;

    // Basic Validation
    if (!designerId || !designName || !width || !length) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }


    
    const existingDesign = await Design.findOne({ designerId: designerId, designName: designName });
    
    if (existingDesign) {
     
      return res.status(400).json({ error: 'A design with this name already exists. Please choose a different name.' });
    }
    

    const newDesign = new Design({
      designerId,
      designName,
      roomSpecs: { width, length, shape, colorScheme },
      furniture: []
    });

    const savedDesign = await newDesign.save();
    res.status(201).json({ message: 'Room configured successfully!', design: savedDesign });
  } catch (error) {
    console.error("Error creating design:", error);
    res.status(500).json({ error: 'Server error while creating design.' });
  }
});



router.put('/update/:id', async (req, res) => {
  try {
    const { furniture } = req.body;
    
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      { $set: { furniture: furniture } },
      { new: true }
    );

    if (!updatedDesign) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.status(200).json({ message: 'Design updated successfully!', design: updatedDesign });
  } catch (error) {
    console.error("Error updating design: ", error);
    res.status(500).json({ error: 'Server error while updating design' });
  }
});


// 3. Fetch all designs for Dashboard
router.get('/designer/:id', async (req, res) => {
  try {
    const designs = await Design.find({ designerId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(designs);
  } catch (error) {
    console.error("Error fetching designs: ", error);
    res.status(500).json({ error: 'Server error while fetching designs' });
  }
});

module.exports = router;