const router = require("express").Router();
const controller = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const settingsSchemas = require('../validation/settingsSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/fetch-all-settings",
  authMiddleware.stripToken,
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  controller.FetchAllSettings
);


module.exports = router;
