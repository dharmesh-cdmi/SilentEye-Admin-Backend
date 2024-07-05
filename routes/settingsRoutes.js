const router = require("express").Router();
const controller = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const settingsSchemas = require('../validation/settingsSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/fetch-settings",
  authMiddleware.stripToken,
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  controller.FetchSettings
);

router.post(
  "/create-settings",
  authMiddleware.stripToken,
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(settingsSchemas.createSettingsSchema),
  controller.CreateSettings
);

router.put(
  "/update-settings",
  authMiddleware.stripToken,
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(settingsSchemas.createSettingsSchema),
  controller.UpdateSettings
);

module.exports = router;
