const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
  designerId: { 
    type: String, 
    required: true 
  },
  designName: { 
    type: String, 
    required: true 
  },
  roomSpecs: {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    shape: { type: String, default: 'Rectangle' },
    colorScheme: { type: String, default: '#f8fafc' }
  },
  furniture: { 
    type: Array, 
    default: [] 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Design', DesignSchema);