
const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitorModel');

// Endpoint to log visitor data
router.post('/log', async (req, res) => {
  try {
    const { page, action, isVisit, country, device, IP } = req.body;
    const visitor = new Visitor({ page, action, isVisit, country, device, IP });
    await visitor.save();
    res.status(201).json({ message: 'Visitor data logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log visitor data' });
  }
});

// Endpoint to get visitor counts by page

// Route to get visitor count
router.get('/count', async (req, res) => {
    const { page } = req.query;
  
    try {
      let count;
      if (page) {
        // If a specific page is provided, count visitors for that page (case-insensitive)
        const regex = new RegExp(`^${page}$`, 'i');
        count = await Visitor.countDocuments({ page: regex });
        res.json({ page, count });
      } else {
        // If no specific page is provided, count visitors for all pages
        count = await Visitor.countDocuments();
        res.json({ count });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve visitor count' });
    }
  });
  
  

  
module.exports = router;
