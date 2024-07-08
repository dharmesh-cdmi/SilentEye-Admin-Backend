const router = require("express").Router();
const controller = require("../controllers/ticketController.js");
const authMiddleware = require("../middleware/authMiddleware");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware.js");
const { createTicketSchema, searchTicketSchema, ticketStatusUpdateSchema, ticketCommentSchema } = require("../validation/ticketSchema.js");

// router.use(authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin);
router.get(
    "/",
    validateQuery(searchTicketSchema),
    controller.FetchAllTickets
);
router.post(
    "/",
    validateRequest(createTicketSchema),
    controller.CreateTicket
);
router.put(
    "/:ticketId",
    validateRequest(ticketStatusUpdateSchema),
    controller.UpdateTicketStatus
);
router.delete(
    "/:ticketId",
    controller.DeleteTicket
);
router.post(
    "/:ticketId/comments",
    validateRequest(ticketCommentSchema),
    controller.CreateTicketComment
);


module.exports = router;
