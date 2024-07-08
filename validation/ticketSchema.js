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
    pageIndex: yup.number().required('Page index is required'),
    limit: yup.number().required('Limit is required'),
    searchQuery: yup.string().trim(),
}).noUnknown(true, 'Unknown field in search ticket form data');


module.exports = {
    createTicketSchema,
    ticketCommentSchema,
    searchTicketSchema
};
