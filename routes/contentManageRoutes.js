const router = require("express").Router();
const controller = require("../controllers/contentManageController");
const authMiddleware = require("../middleware/authMiddleware");
const contentManageSchemas = require('../validation/contentManageSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post(
    "/create-content-manage",
    // authMiddleware.verifyAdmin,
    controller.CreateContentManage
);

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
    "/fetch-all-features",
    // authMiddleware.verifyAdmin,
    controller.FetchAllFeatures
);

router.get(
    "/fetch-features",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateQuery(contentManageSchemas.fetchFeaturesSchema),
    controller.FetchFeatures
);

router.post(
    "/add-feature",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateRequest(contentManageSchemas.featureSchema),
    controller.AddFeature
);

router.put(
    "/update-feature/:featureId",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateParams(contentManageSchemas.featureIdSchema),
    validationMiddleware.validateRequest(contentManageSchemas.featureSchema),
    controller.UpdateFeature
);

router.delete(
    "/delete-feature/:featureId",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateParams(contentManageSchemas.featureIdSchema),
    controller.DeleteFeature
);

module.exports = router;
