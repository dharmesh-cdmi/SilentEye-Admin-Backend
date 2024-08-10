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
        const { pageIndex, limit, searchQuery } = req.query;
        const parsedPageIndex = parseInt(pageIndex);
        const parsedLimit = parseInt(limit);
        const parsedSearchQuery = parseInt(searchQuery);
        const result = await contactFormService.searchContactsForm(parsedPageIndex, parsedLimit, parsedSearchQuery);
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

const DeleteContactForm = async (req, res, next) => {
    try {
        const { contactFormId } = req.params;
        await contactFormService.deleteContactForm(contactFormId);
        res.status(200).send('Contact form deleted successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchAllContactsForm,
    CreateContactForm,
    SearchContactsForm,
    DeleteContactForm
};
