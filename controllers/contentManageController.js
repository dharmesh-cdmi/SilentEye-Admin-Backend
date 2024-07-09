const contentManageService = require('../services/contentManageService');

const FetchContactDetails = async (req, res, next) => {
    try {
        const contactDetails = await contentManageService.fetchContactDetails();
        res.status(200).json({ contactDetails });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    FetchContactDetails,
};
