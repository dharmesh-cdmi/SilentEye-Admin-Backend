// routes/visitor.js

const express = require('express');
const router = express.Router();
const visitorController = require('../../controllers/visitorController'); // Ensure you have the correct path to your controller

// Endpoint to log visitor data
router.post('/log', visitorController.logVisitor);

// Route to get visitor count
router.get('/count', visitorController.getVisitorCount);

// Route to get visitor count and other data
router.get('/details', visitorController.getVisitorDetails);

module.exports = router;
 