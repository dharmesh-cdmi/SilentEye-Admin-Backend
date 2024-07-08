const router = require("express").Router();
const controller = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const settingsSchemas = require('../validation/settingsSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');
const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExtension);
        cb(null, fileName + '-' + uniqueSuffix + fileExtension);
    },
});
const upload = multer({ storage });

router.get(
  "/fetch-settings",
  // authMiddleware.stripToken,
  // authMiddleware.verifyAccessToken,
  // authMiddleware.verifyAdmin,
  controller.FetchSettings
);

router.post(
  "/create-settings",
  upload.single('offerPopUpImage'),
  // authMiddleware.stripToken,
  // authMiddleware.verifyAccessToken,
  // authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(settingsSchemas.createSettingsSchema),
  controller.CreateSettings
);

router.put(
  "/update-settings",
  upload.single('offerPopUpImage'),
  // authMiddleware.stripToken,
  // authMiddleware.verifyAccessToken,
  // authMiddleware.verifyAdmin,
  validationMiddleware.validateRequest(settingsSchemas.createSettingsSchema),
  controller.UpdateSettings
);

module.exports = router;
