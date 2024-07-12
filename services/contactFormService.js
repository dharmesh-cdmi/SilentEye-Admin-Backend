const ContactForm = require('../models/contactFormModel');

/**
 * Fetch total count of contact forms submitted with optional date filter.
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {Promise<Number>} Total count of contact forms
 */
const getTotalContactFormsCount = async (startDate, endDate) => {
    const query = {};

    // Add date filters if provided
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

    // Get total count of contact forms based on the query
    const totalCount = await ContactForm.countDocuments(query);
    return totalCount;
};

module.exports = {
    getTotalContactFormsCount,
};
