const router = require("express").Router();
const controller = require("../controllers/contentManageController");
const authMiddleware = require("../middleware/authMiddleware");
const contentManageSchemas = require('../validation/contentManageSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/fetch-contact-details",
    // authMiddleware.verifyAdmin,
    controller.FetchContactDetails
);

router.put(
    "/update-contact-details",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateRequest(contentManageSchemas.contactDetailsSchema),
    controller.UpdateContactDetails
);

router.get(
    "/fetch-features",
    // authMiddleware.verifyAdmin,
    controller.FetchFeatures
);

router.post(
    "/add-feature",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateRequest(contentManageSchemas.featureSchema),
    controller.AddFeature
);

module.exports = router;
