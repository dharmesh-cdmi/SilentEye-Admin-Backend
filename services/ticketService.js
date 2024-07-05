const Ticket = require("../models/ticketModel");

const fetchAllTickets = async (page = 1, limit = 10, searchQuery = '') => {
    const query = {};
    if (searchQuery) {
        query.someField = { $regex: searchQuery, $options: 'i' };
    }
    const tickets = await Ticket.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    if (!tickets) {
        throw new Error('Tickets not found!');
    }
    return tickets;
}