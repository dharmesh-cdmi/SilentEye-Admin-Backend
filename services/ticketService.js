const Ticket = require("../models/ticketModel");
/**
 * 
 * @param {Number} page 
 * @param {Number} limit 
 * @param {String} searchQuery
 * @param {('Pending' | 'Active' | 'Answered' | 'Closed')} status
 * @param {('asc' | 'desc')} order
 * @returns 
 */

const fetchAllTickets = async (page = 1, limit = 10, searchQuery = "", status, order = "desc") => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const query = {};
    if (searchQuery) {
        query.message = { $regex: searchQuery, $options: 'i' };
        query.status = { $regex: searchQuery, $options: 'i' };
    }
    if (status) {
        query.status = status;
    }
    const total = await Ticket.countDocuments(query);
    // and also include last comment details
    const tickets = await Ticket.find(query)
        .sort({ createdAt: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('comments');

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
    const ticketId = await getNextTicketId();
    const ticket = new Ticket({
        ticketId,
        type: data.type,
        message: data.message,
        status: data?.status || 'Pending',
    });
    return await ticket.save();
}

/**
 * 
 * @param {String} ticketId 
 * @param {('Active' | 'Answered' | 'Closed')} status
 * @returns 
 */
const updateTicketStatus = async (id, status) => {
    let updatedData = {};
    if (status === 'Closed') {
        updatedData = {
            status,
            closedAt: Date.now(),
        }
    } else {
        updatedData = {
            status: status
        }
    }
    return await Ticket.findByIdAndUpdate(id, updatedData);
}

/**
 * 
 * @param {String} ticketId 
 * @param {String} comment 
 * @param {String} userId 
 * @returns 
 */
const addComment = async (ticketId, comment, userId) => {
    return await Ticket.findByIdAndUpdate(ticketId, {
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
    return await Ticket.findByIdAndDelete(ticketId);
}

const getNextTicketId = async () => {
    // Ticket format is ST00001
    // so first we need to get the last ticket id

    let ticketId = await Ticket.findOne({}, { ticketId: 1 }).sort({ createdAt: -1 });
    if (!ticketId) {
        return "ST00001";
    }
    ticketId = ticketId.ticketId;
    const num = parseInt(ticketId.substring(2)) + 1;
    return `ST${num.toString().padStart(5, '0')}`;
}
module.exports = {
    fetchAllTickets,
    createTicket,
    updateTicketStatus,
    addComment,
    deleteTicket
};