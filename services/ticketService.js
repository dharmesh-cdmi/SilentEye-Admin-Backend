const Ticket = require("../models/ticketModel");
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {String} searchQuery
 * @param {('Pending' | 'Active' | 'Answered' | 'Closed')} status
 * @returns 
 */

const fetchAllTickets = async (page = 1, limit = 10, searchQuery = "", status = "") => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const query = {};
    if (searchQuery) {
        query.someField = { $regex: searchQuery, $options: 'i' };
    }
    if (status) {
        query.status = status;
    }
    const total = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        tickets,
        page,
        limit,
        total,
    };
}

/**
 * 
 * @param {Object} data 
 * @returns 
 */
const createTicket = async (data) => {
    const ticketId = `SK${Date.now()}`;
    const ticket = new Ticket({
        ticketId,
        type: data.type,
        message: data.message,
        status: 'Pending',
    });
    return await ticket.save();
}

/**
 * 
 * @param {String} ticketId 
 * @param {('Active' | 'Answered' | 'Closed')} status
 * @returns 
 */
const updateTicketStatus = async (ticketId, status) => {
    let updatedData = {};
    if (status === 'Closed') {
        updatedData = {
            status,
            closedAt: Date.now(),
        }
    } else {
        updatedData = {
            status
        }
    }
    return await Ticket.findOneAndUpdate({
        ticketId
    }, updatedData);

}

/**
 * 
 * @param {String} ticketId 
 * @param {String} comment 
 * @param {String} userId 
 * @returns 
 */
const addComment = async (ticketId, comment, userId) => {
    return await Ticket.findOneAndUpdate({
        ticketId
    }, {
        $push: {
            comments: {
                text: comment,
                createdBy: userId,
                createdAt: Date.now()
            }
        }
    });
}

/**
 * 
 * @param {String} ticketId 
 * @returns 
 */
const deleteTicket = async (ticketId) => {
    return await Ticket.findOneAndDelete({
        ticketId
    });
}
module.exports = {
    fetchAllTickets,
    createTicket,
    updateTicketStatus,
    addComment,
    deleteTicket
};