const router = require("express").Router();
const controller = require("../controllers/contentManageController");
const authMiddleware = require("../middleware/authMiddleware");
const contentManageSchemas = require('../validation/contentManageSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/fetch-contact-details",
    // authMiddleware.stripToken,
    // authMiddleware.verifyAccessToken,
    // authMiddleware.verifyAdmin,
    controller.FetchContactDetails
);
router.get(
    "/fetch-features",
    // authMiddleware.stripToken,
    // authMiddleware.verifyAccessToken,
    // authMiddleware.verifyAdmin,
    controller.FetchContactDetails
);



module.exports = router;
