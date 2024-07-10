const router = require("express").Router();
const controller = require("../controllers/managerController.js");
const { verifyAdmin, verifyUser } = require("../middleware/authMiddleware.js");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware.js");
const { searchManagerSchema, createManagerSchema, updateManagerSchema } = require("../validation/managerSchema.js");

router.get(
    "/",
    verifyAdmin,
    validateQuery(searchManagerSchema),
    controller.FetchAllManagers
);
router.post(
    "/",
    verifyAdmin,
    validateRequest(createManagerSchema),
    controller.CreateManager
);
router.put(
    "/:managerId",
    verifyAdmin,
    validateRequest(updateManagerSchema),
    controller.UpdateManager
);
router.delete(
    "/:managerId",
    verifyAdmin,
    controller.DeleteManager
);



module.exports = router;
