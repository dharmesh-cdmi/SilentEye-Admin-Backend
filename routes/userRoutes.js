const express = require("express");
const { verifyAdmin } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validationMiddleware");
const { createUserSchema } = require("../validation/userSchemas");
const controller = require("../controllers/userController");
const router = express.Router();

router.post(
    "/",
    verifyAdmin,
    validateRequest(createUserSchema),
    controller.RegisterUser
);

router.get(
    "/",
    verifyAdmin,
    controller.FetchAllUsers
);

router.get(
    "/:userId",
    verifyAdmin,
    controller.FetchUserById
);

router.put(
    "/:userId",
    verifyAdmin,
    controller.UpdateUser
);

router.delete(
    "/:userId",
    verifyAdmin,
    controller.DeleteUser
);

module.exports = router;