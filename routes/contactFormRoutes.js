const router = require("express").Router();
const controller = require("../controllers/contactFormController");
const authMiddleware = require("../middleware/authMiddleware");
const contactFormSchemas = require('../validation/contactFormSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
    "/fetch-all-contacts-form",
    // authMiddleware.stripToken,
    // authMiddleware.verifyAccessToken,
    // authMiddleware.verifyAdmin,
    controller.FetchAllContactsForm
);

router.post(
    "/search-contact-form",
    validationMiddleware.validateRequest(contactFormSchemas.searchContactSchema),
    controller.SearchContactsForm
);

router.post(
    "/create-contact-form",
    validationMiddleware.validateRequest(contactFormSchemas.createContactSchema),
    controller.CreateContactForm
);

module.exports = router;
