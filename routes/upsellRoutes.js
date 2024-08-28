// routes/upsellRoutes.js

const express = require('express');
const router = express.Router();
const upsellController = require('../controllers/upsellController');
const { upload } = require('../middleware/multerMiddleware');

router.post('/', upload.single('image'), upsellController.createUpsell);
router.get('/', upsellController.getAllUpsells);
router.get('/:id', upsellController.getUpsellById);
router.put('/:id', upload.single('image'), upsellController.updateUpsell);
router.delete('/:id', upsellController.deleteUpsell);

module.exports = router;
