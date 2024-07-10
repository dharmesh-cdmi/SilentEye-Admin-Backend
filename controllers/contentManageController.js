const contentManageService = require('../services/contentManageService');

const FetchContactDetails = async (req, res, next) => {
    try {
        const contactDetails = await contentManageService.fetchContactDetails();
        res.status(200).json({ contactDetails });
    } catch (error) {
        next(error);
    }
};

const UpdateContactDetails = async (req, res, next) => {
    try {
        const data = req.body;
        await contentManageService.updateContactDetails(data);
        res.status(200).send('Contact details updated successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchContactDetails,
    UpdateContactDetails
};
