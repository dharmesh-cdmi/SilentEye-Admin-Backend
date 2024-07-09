const contactFormService = require('../services/contactFormService');

const FetchAllContactsForm = async (req, res, next) => {
    try {
        const contactsForm = await contactFormService.fetchAllContactsForm();
        res.status(200).json({ contactsForm });
    } catch (error) {
        next(error);
    }
};

const SearchContactsForm = async (req, res, next) => {
    try {
        const { pageIndex, limit, searchQuery } = req.body;
        const result = await contactFormService.searchContactsForm(pageIndex, limit, searchQuery);
        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

const CreateContactForm = async (req, res, next) => {
    try {
        const data = req.body;
        await contactFormService.createContactForm(data);
        res.status(200).send('Contact form created successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchAllContactsForm,
    CreateContactForm,
    SearchContactsForm
};
