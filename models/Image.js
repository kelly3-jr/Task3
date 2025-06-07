// 20. Store uploaded image metadata (filename, mimetype, size) in MongoDB

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: { 
    type: String, 
    required: true 
  },
  mimetype: {
    type: String, 
    required: true
  },
  size: { 
    type: Number, 
    required: true
  },
  uploadedAt: { 
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Image', imageSchema);
