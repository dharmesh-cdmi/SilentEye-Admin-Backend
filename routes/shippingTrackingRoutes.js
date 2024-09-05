const express = require('express');
const router = express.Router();
const shippingTrackingSettingsController = require('../controllers/shippingTrackingController');

router.post('/topics', shippingTrackingSettingsController.addTopic); // Add a new topic
router.delete(
  '/topics/:topicId',
  shippingTrackingSettingsController.deleteTopic
); // Delete a topic
router.post(
  '/topics/:topicId/subtopics',
  shippingTrackingSettingsController.addSubTopic
); // Add a new subtopic
router.delete(
  '/topics/:topicId/subtopics/:subTopicId',
  shippingTrackingSettingsController.deleteSubTopic
); // Delete a subtopic
router.get('/settings', shippingTrackingSettingsController.getSettings); // Get all settings

module.exports = router;
