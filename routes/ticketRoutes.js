const router = require("express").Router();
const controller = require("../controllers/ticketController.js");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware.verifyAdmin);
router.get(
    "/",
    controller.FetchAllTickets
);
router.post(
    "/",
    controller.CreateTicket
);
router.patch(
    "/:ticketId",
    controller.UpdateTicketStatus
);
router.delete(
    "/:ticketId",
    controller.DeleteTicket
);


module.exports = router;
