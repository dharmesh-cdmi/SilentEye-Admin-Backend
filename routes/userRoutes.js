const express = require("express");
const path = require("path")
const multer = require("multer");

const { verifyAdmin, authenticateUser } = require("../middleware/authMiddleware");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware");
const { createUserSchema, updateUserSchema, addUserHistorySchema, saveVisitorSchema, downloadQuerySchema } = require("../validation/userSchemas");
const controller = require("../controllers/userController");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/avatar/');
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
    "/",
    upload.single('profile_avatar'),
    validateRequest(createUserSchema),
    // add plan vakidation function here
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
    validateRequest(updateUserSchema),
    upload.single('profile_avatar'),
    controller.UpdateUser
);

router.delete(
    "/:userId",
    verifyAdmin,
    controller.DeleteUser
);

router.post(
    "/user-history/:userId",
    validateRequest(addUserHistorySchema),
    controller.AddUserHistory
);

router.post(
    "/visitor",
    validateRequest(saveVisitorSchema),
    controller.SaveVisitor
);

router.get(
    "/visitor/:ipAddress",
    controller.FetchVisitor
);

router.put(
    "/visitor/:ipAddress",
    upload.single('profile_avatar'),
    controller.UpdateVisitor
);

router.post(
    "visitor/user-history/:ipAddress",
    validateRequest(addUserHistorySchema),
    controller.AddUserHistoryByVisitor
);

router.get(
    "/download/users-data",
    validateQuery(downloadQuerySchema),
    authenticateUser,
    controller.DownloadUsersData
);

router.delete(
    "/bulk/delete",
    verifyAdmin,
    controller.DeleteBulkUsers
);
module.exports = router;