const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ['Pending', 'Active', 'Answered', 'Closed'] },
    type: { type: String, required: true },
    message: { type: String, required: true },
    comments: [{
        text: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date }
    }],
    closedAt: { type: Date }
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;

