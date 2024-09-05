// routes/planRoutes.js

const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { upload } = require('../middleware/multerMiddleware');

router.post('/', upload.single('icon'), planController.createPlan);
router.get('/', planController.getAllPlans);
router.get('/:id', planController.getPlanById);
router.put('/:id', upload.single('icon'), planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;
