const router = require("express").Router();
const controller = require("../controllers/extensionController");
const authMiddleware = require("../middleware/authMiddleware");
const extensionSchemas = require('../validation/extensionSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/fetch-extensions",
  // authMiddleware.verifyAdmin,
  controller.FetchExtensions
);

router.post(
  "/create-extensions",
  // authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(extensionSchemas.createAndUpdateExtenionsSchema),
  controller.CreateExtensions
);

router.put(
  "/update-extensions",
  // authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(extensionSchemas.createAndUpdateExtenionsSchema),
  controller.UpdateExtensions
);

module.exports = router;
