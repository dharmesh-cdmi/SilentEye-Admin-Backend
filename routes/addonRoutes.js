// routes/addonRoutes.js

const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addonController');

router.post('/', addonController.createAddon);
router.get('/', addonController.getAllAddons);
router.get('/:id', addonController.getAddonById);
router.put('/:id', addonController.updateAddon);
router.delete('/:id', addonController.deleteAddon);

module.exports = router;
