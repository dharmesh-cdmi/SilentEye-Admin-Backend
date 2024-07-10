const router = require("express").Router();
const controller = require("../controllers/ticketController.js");
const { verifyAdmin, verifyUser, authenticateUser } = require("../middleware/authMiddleware.js");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware.js");
const { createTicketSchema, searchTicketSchema, ticketStatusUpdateSchema, ticketCommentSchema } = require("../validation/ticketSchema.js");

router.get(
    "/",
    verifyAdmin,
    validateQuery(searchTicketSchema),
    controller.FetchAllTickets
);
router.get(
    "/my-tickets",
    verifyUser,
    controller.FetchMyTickets
);
router.get(
    "/:ticketId",
    verifyAdmin,
    controller.FetchTicketById
);
router.post(
    "/",
    verifyUser,
    validateRequest(createTicketSchema),
    controller.CreateTicket
);
router.put(
    "/:ticketId",
    verifyAdmin,
    validateRequest(ticketStatusUpdateSchema),
    controller.UpdateTicketStatus
);
router.delete(
    "/:ticketId",
    verifyAdmin,
    controller.DeleteTicket
);
router.post(
    "/:ticketId/comments",
    authenticateUser,
    validateRequest(ticketCommentSchema),
    controller.CreateTicketComment
);


module.exports = router;
