const router = require("express").Router();
const controller = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const settingsSchemas = require('../validation/settingsSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/fetch-all-settings",
  authMiddleware.stripToken,
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  controller.FetchAllSettings
);
// router.post(
//   "/login",
//   validationMiddleware.validateRequest(userSchemas.loginSchema),
//   controller.Login
// );
// router.get(
//   "/fetch-user-info",
//   authMiddleware.stripToken,
//   authMiddleware.verifyAccessToken,
//   controller.FetchUserInfo
// );
// router.get(
//   "/fetch-all-users-info",
//   authMiddleware.stripToken,
//   authMiddleware.verifyAccessToken,
//   authMiddleware.verifyAdmin,
//   controller.FetchAllUsersInfo
// );
// router.post(
//   "/refresh-token",
//   controller.RefreshToken
// );
// router.post(
//   "/logout",
//   controller.Logout
// );
// router.post(
//   "/add-user",
//   authMiddleware.stripToken,
//   authMiddleware.verifyAccessToken,
//   authMiddleware.verifyAdmin,
//   validationMiddleware.validateRequest(userSchemas.addUserSchema),
//   controller.AddUser
// );
// router.patch(
//   "/update-user-info/:userId",
//   authMiddleware.stripToken,
//   authMiddleware.verifyAccessToken,
//   authMiddleware.verifyAdmin,
//   validationMiddleware.validateParams(userSchemas.userIdSchema),
//   validationMiddleware.validateRequest(userSchemas.updateUserInfoSchema),
//   controller.UpdateUser
// );
// router.delete(
//   "/delete-user/:userId",
//   authMiddleware.stripToken,
//   authMiddleware.verifyAccessToken,
//   authMiddleware.verifyAdmin,
//   validationMiddleware.validateParams(userSchemas.userIdSchema),
//   controller.DeleteUser
// );


module.exports = router;
