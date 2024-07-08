const router = require("express").Router();
const controller = require("../controllers/ticketController.js");
const authMiddleware = require("../middleware/authMiddleware");
const { validateRequest, validateQuery } = require("../middleware/validationMiddleware.js");
const { createTicketSchema, searchTicketSchema } = require("../validation/ticketSchema.js");

router.use(authMiddleware.verifyAdmin);
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
    controller.UpdateTicketStatus
);
router.delete(
    "/:ticketId",
    controller.DeleteTicket
);


module.exports = router;
