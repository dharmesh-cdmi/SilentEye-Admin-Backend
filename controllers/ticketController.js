const { fetchAllTickets, createTicket, updateTicketStatus, deleteTicket, addComment, fetchMyTickets, fetchTicketById, bulkUpdateTicketStatus, bulkDeleteTickets } = require("../services/ticketService");
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require("../utils/responseHelper");

const FetchAllTickets = async (req, res) => {
    try {
        const { pageIndex, limit, searchQuery, status, order } = req.query;
        const tickets = await fetchAllTickets(pageIndex, limit, searchQuery, status, order);
        apiSuccessResponse(res, 'Tickets fetched successfully', tickets, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const FetchMyTickets = async (req, res) => {
    try {
        const tickets = await fetchMyTickets(req.user._id);
        apiSuccessResponse(res, 'Tickets fetched successfully', tickets, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const FetchTicketById = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await fetchTicketById(ticketId);
        apiSuccessResponse(res, 'Ticket fetched successfully', ticket, HTTP_STATUS.OK);
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
            user: req.user._id
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
        if (!ticket) {
            return apiErrorResponse(res, 'Ticket not found', 'Ticket not found', HTTP_STATUS.NOT_FOUND);
        }
        apiSuccessResponse(res, 'Ticket status updated successfully', ticket, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const DeleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await deleteTicket(ticketId);
        if (!ticket) {
            return apiErrorResponse(res, 'Ticket not found', 'Ticket not found', HTTP_STATUS.NOT_FOUND);
        }
        apiSuccessResponse(res, 'Ticket deleted successfully', ticket, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const BulkUpdateTicketStatus = async (req, res) => {
    try {
        const { ticketIds, status } = req.body;
        const result = await bulkUpdateTicketStatus(ticketIds, status);
        apiSuccessResponse(res, 'Tickets status updated successfully', result, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const BulkDeleteTickets = async (req, res) => {
    try {
        const { ticketIds } = req.body;
        const result = await bulkDeleteTickets(ticketIds);
        apiSuccessResponse(res, 'Tickets deleted successfully', result, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const CreateTicketComment = async (req, res) => {
    let userRole = req.user ? 'user': req.admin ? 'admin': 'guest';
    try {
        const { ticketId } = req.params;
        const { comment } = req.body;
        const ticket = await addComment(ticketId, comment, userRole);
        apiSuccessResponse(res, 'Comment added successfully', ticket, HTTP_STATUS.OK);
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    FetchAllTickets,
    CreateTicket,
    UpdateTicketStatus,
    DeleteTicket,
    CreateTicketComment,
    FetchMyTickets,
    FetchTicketById,
    BulkUpdateTicketStatus,
    BulkDeleteTickets
};