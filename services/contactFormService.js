const ContactForm = require('../models/contactFormModel');

const fetchAllContactsForm = async () => {
    const contactsForm = await ContactForm.find({});
    if (!contactsForm || contactsForm.length <= 0) {
        throw new Error('Contacts form not found!');
    }
    return contactsForm;
};

const createContactForm = async (contactFormData) => {
    const contactForm = await ContactForm.create(contactFormData);
    return contactForm;
};

module.exports = {
    fetchAllContactsForm,
    createContactForm
};
