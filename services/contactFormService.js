const ContactForm = require('../models/contactFormModel');

const fetchAllContactsForm = async () => {
    const contactsForm = await ContactForm.find({});
    if (!contactsForm || contactsForm.length <= 0) {
        const error = new Error('Contacts form not found!');
        error.code = 404;
        throw error;
    }
    return contactsForm;
};

const searchContactsForm = async (pageIndex, limit, searchQuery) => {
    const skip = (pageIndex - 1) * limit;
    let query = {};
    if (searchQuery && searchQuery !== '') {
        query = {
            $or: [
                { email: { $regex: searchQuery, $options: 'i' } },
                { name: { $regex: searchQuery, $options: 'i' } }
            ]
        };
    }
    const totalCount = await ContactForm.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const contactsForm = await ContactForm.find(query)
        .sort({ createdAt: -1 })  // Sort by createdAt descending (-1)
        .skip(skip)
        .limit(limit);

    if (!contactsForm || contactsForm.length <= 0) {
        const error = new Error('Contacts form not found!');
        error.code = 404;
        throw error;
    }

    return {
        contactsForm,
        totalPages
    };
};

const createContactForm = async (contactFormData) => {
    const contactForm = await ContactForm.create(contactFormData);
    return contactForm;
};

module.exports = {
    fetchAllContactsForm,
    createContactForm,
    searchContactsForm
};
