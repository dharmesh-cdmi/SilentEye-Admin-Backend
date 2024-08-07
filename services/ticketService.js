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
        query.$or = [
            { message: { $regex: searchQuery, $options: 'i' } },
            { status: { $regex: searchQuery, $options: 'i' } },
            { type: { $regex: searchQuery, $options: 'i' } },
        ];
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
        .populate('comments')
        .populate("user", "name email");

    return {
        tickets,
        page,
        limit,
        total,
    };
}

// get my tickets
const fetchMyTickets = async (userId) => {
    return await Ticket.find({ user: userId }).populate('comments');
}

// get ticket by id
const fetchTicketById = async (ticketId) => {
    return await Ticket.findById(ticketId).populate('comments');
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
        user: data.user,
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
    let res = await Ticket.findByIdAndUpdate(id, updatedData, {
        returnOriginal: false
    });
    return res;
}

/**
 * 
 * @param {String} ticketId 
 * @param {String} comment 
 * @param {('user', 'admin')} role 
 * @returns 
 */
const addComment = async (ticketId, comment, role) => {
    return await Ticket.findByIdAndUpdate(ticketId, {
        $push: {
            comments: {
                text: comment,
                createdBy: role,
                createdAt: Date.now()
            }
        },
    }, {
        returnOriginal: false
    });
}

/**
 * 
 * @param {String} ticketId 
 * @returns 
 */
const deleteTicket = async (ticketId) => {
    return await Ticket.findByIdAndDelete(ticketId, { returnOriginal: false });
}

/**
 * 
 * @param {Array<String>} ticketIds 
 * @param {('Active' | 'Answered' | 'Closed')} status
 * @returns 
 */
const bulkUpdateTicketStatus = async (ticketIds, status) => {
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
    let res = await Ticket.updateMany({ _id: { $in: ticketIds } }, updatedData, {
        returnOriginal: false
    });
    return res;
}

/**
 * 
 * @param {Array<String>} ticketIds 
 * @returns 
 */
const bulkDeleteTickets = async (ticketIds) => {
    let res = await Ticket.deleteMany({ _id: { $in: ticketIds } });
    return res;
}
const getNextTicketId = async () => {
    let ticketId = await Ticket.findOne({}, { ticketId: 1 }).sort({ createdAt: -1 });
    if (!ticketId) {
        return "ST00001";
    }
    ticketId = ticketId.ticketId;
    const num = parseInt(ticketId.substring(2)) + 1;
    return `ST${num.toString().padStart(5, '0')}`;
}

/**
 * Fetch total count of tickets with optional date filter.
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {Promise<Number>} Total count of tickets
 */
const getTotalTicketsCount = async (startDate, endDate) => {
    const query = {};

    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    } else if (startDate) {
        query.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
        query.createdAt = { $lte: new Date(endDate) };
    }

    // Get total count of tickets based on the query
    const total = await Ticket.countDocuments(query);
    return total;
};


module.exports = {
    fetchAllTickets,
    createTicket,
    updateTicketStatus,
    addComment,
    deleteTicket,
    fetchMyTickets,
    fetchTicketById,
    getTotalTicketsCount,
    bulkUpdateTicketStatus,
    bulkDeleteTickets
};