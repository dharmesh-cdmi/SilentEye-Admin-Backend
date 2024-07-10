const yup = require('yup');

const createTicketSchema = yup.object().shape({
    type: yup.string().trim().required('Type is required'),
    message: yup.string().trim().required('Message is required'),
    status: yup.string().oneOf(['Pending', 'Active', 'Answered', 'Closed'], 'Invalid status').required('Status is required')
}).noUnknown(true, 'Unknown field in ticket data');

const ticketCommentSchema = yup.object().shape({
    comment: yup.string().trim().required('Comment is required')
}).unknown(true, 'Unknown field in comment data');

const searchTicketSchema = yup.object().shape({
    pageIndex: yup.number(),
    limit: yup.number(),
    status: yup.string().oneOf(['Pending', 'Active', 'Answered', 'Closed'], 'Invalid status'),
    searchQuery: yup.string().trim(),
    order: yup.string().oneOf(['asc', 'desc'], 'Invalid order')
}).noUnknown(true, 'Unknown field in search ticket form data');

const ticketStatusUpdateSchema = yup.object().shape({
    status: yup.string().oneOf(['Active', 'Answered', 'Closed'], 'Invalid status').required('Status is required')
}).noUnknown(true, 'Unknown field in ticket status update data');

module.exports = {
    createTicketSchema,
    ticketCommentSchema,
    searchTicketSchema,
    ticketStatusUpdateSchema
};
