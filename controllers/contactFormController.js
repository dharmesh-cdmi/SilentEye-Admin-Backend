const contactFormService = require('../services/contactFormService');

const FetchAllContactsForm = async (req, res) => {
    try {
        const contactsForm = await contactFormService.fetchAllContactsForm();
        res.status(200).json({ contactsForm });
    } catch (error) {
        if (error.message === 'Contacts form not found!') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const CreateContactForm = async (req, res) => {
    try {
        const data = req.body;
        await contactFormService.createContactForm(data);
        res.status(200).send('Contact form created successfully!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    FetchAllContactsForm,
    CreateContactForm,
};
