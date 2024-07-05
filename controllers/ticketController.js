const { fetchAllTickets, createTicket, updateTicketStatus, deleteTicket } = require("../services/ticketService");
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require("../utils/responseHelper");

const FetchAllTickets = async (req, res) => {
    try {
        const { page, limit, searchQuery } = req.query;
        const tickets = await fetchAllTickets(page, limit, searchQuery);
        apiSuccessResponse(res, 'Tickets fetched successfully', tickets, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const CreateTicket = async (req, res) => {
    try {
        const { type, message } = req.body;
        const ticket = await createTicket({
            type,
            message,
        });
        apiSuccessResponse(res, 'Ticket created successfully', ticket, HTTP_STATUS.CREATED);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const UpdateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;
        const ticket = await updateTicketStatus(ticketId, status);
        apiSuccessResponse(res, 'Ticket status updated successfully', ticket, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const DeleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await deleteTicket(ticketId);
        apiSuccessResponse(res, 'Ticket deleted successfully', ticket, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    FetchAllTickets,
    CreateTicket,
    UpdateTicketStatus,
};