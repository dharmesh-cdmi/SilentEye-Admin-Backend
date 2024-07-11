const router = require("express").Router();
const controller = require("../controllers/contentManageController");
const authMiddleware = require("../middleware/authMiddleware");
const contentManageSchemas = require('../validation/contentManageSchemas');
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
    upload.single('icon'),
    validationMiddleware.validateFile({ required: true }),
    validationMiddleware.validateRequest(contentManageSchemas.featureSchema),
    controller.AddFeature
);

router.put(
    "/update-feature/:featureId",
    // authMiddleware.verifyAdmin,
    upload.single('icon'),
    validationMiddleware.validateFile({ required: false }),
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

router.get(
    "/fetch-all-pages",
    // authMiddleware.verifyAdmin,
    controller.FetchAllPages
);

router.get(
    "/fetch-pages",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateQuery(contentManageSchemas.fetchPagesSchema),
    controller.FetchPages
);

router.post(
    "/add-page",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateRequest(contentManageSchemas.pageSchema),
    controller.AddPage
);

router.put(
    "/update-page/:pageId",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateParams(contentManageSchemas.pageIdSchema),
    validationMiddleware.validateRequest(contentManageSchemas.pageSchema),
    controller.UpdatePage
);

router.delete(
    "/delete-page/:pageId",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateParams(contentManageSchemas.pageIdSchema),
    controller.DeletePage
);

router.get(
    "/fetch-all-reviews",
    // authMiddleware.verifyAdmin,
    controller.FetchAllReviews
);

router.get(
    "/fetch-reviews",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateQuery(contentManageSchemas.fetchReviewsSchema),
    controller.FetchReviews
);

router.post(
    "/add-review",
    // authMiddleware.verifyAdmin,
    upload.single('profile'),
    validationMiddleware.validateFile({ required: true }),
    validationMiddleware.validateRequest(contentManageSchemas.reviewSchema),
    controller.AddReview
);

router.put(
    "/update-review/:reviewId",
    // authMiddleware.verifyAdmin,
    upload.single('profile'),
    validationMiddleware.validateFile({ required: false }),
    validationMiddleware.validateParams(contentManageSchemas.reviewIdSchema),
    validationMiddleware.validateRequest(contentManageSchemas.reviewSchema),
    controller.UpdateReview
);

router.delete(
    "/delete-review/:reviewId",
    // authMiddleware.verifyAdmin,
    validationMiddleware.validateParams(contentManageSchemas.reviewIdSchema),
    controller.DeleteReview
);

module.exports = router;
