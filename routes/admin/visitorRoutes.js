// routes/visitor.js

const express = require('express');
const router = express.Router();
const visitorController = require('../../controllers/visitorController'); // Ensure you have the correct path to your controller

// Route to get visitor count and other data
router.get('/count', visitorController.getVisitorCount);

module.exports = router;
 