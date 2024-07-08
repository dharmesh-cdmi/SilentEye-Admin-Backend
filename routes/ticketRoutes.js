const router = require("express").Router();
const controller = require("../controllers/ticketController.js");
const { verifyAdmin, verifyUser } = require("../middleware/authMiddleware.js");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware.js");
const { createTicketSchema, searchTicketSchema, ticketStatusUpdateSchema, ticketCommentSchema } = require("../validation/ticketSchema.js");

router.get(
    "/",
    verifyAdmin,
    validateQuery(searchTicketSchema),
    controller.FetchAllTickets
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
    validateRequest(ticketCommentSchema),
    controller.CreateTicketComment
);


module.exports = router;
