const router = require("express").Router();
const controller = require("../controllers/contentManageController");
const authMiddleware = require("../middleware/authMiddleware");
const contentManageSchemas = require('../validation/contentManageSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/fetch-contact-details",
    authMiddleware.verifyAdmin,
    controller.FetchContactDetails
);
router.put(
    "/update-contact-details",
    authMiddleware.verifyAdmin,
    validationMiddleware.validateRequest(contentManageSchemas.contactDetailsSchema),
    controller.UpdateContactDetails
);



module.exports = router;
