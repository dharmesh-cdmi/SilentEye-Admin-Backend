// routes/visitor.js

const express = require('express');
const router = express.Router();
const { logVisitor, getVisitorCount, getVisitorDetails } = require('../../controllers/visitorController'); // Ensure you have the correct path to your controller

// Endpoint to log visitor data
router.post('/log', logVisitor);

// Route to get visitor count
router.get('/count', getVisitorCount);

// Route to get visitor count and other data
router.get('/details', getVisitorDetails);

module.exports = router;
 