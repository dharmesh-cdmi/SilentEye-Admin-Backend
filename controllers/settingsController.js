const settingsService = require('../services/settingsService');
const path = require("path");

const FetchSettings = async (req, res, next) => {
    try {
        const settings = await settingsService.fetchSettings();
        res.status(200).json({ settings });
    } catch (error) {
        next(error);
    }
};

const CreateSettings = async (req, res, next) => {
    try {
        const { youTubeVideoPopUp, salesNotification, emailVerification, offerPopUp } = req.body;
        const parsedYouTubeVideoPopUp = JSON.parse(youTubeVideoPopUp);
        const parsedSalesNotification = JSON.parse(salesNotification);
        const parsedEmailVerification = JSON.parse(emailVerification);
        const parsedOfferPopUp = JSON.parse(offerPopUp);
        const offerPopUpImage = req.file;
        let offerPopUpImagePath = (offerPopUpImage && offerPopUpImage.path) || null;
        const data = {
            youTubeVideoPopUp: parsedYouTubeVideoPopUp,
            salesNotification: parsedSalesNotification,
            emailVerification: parsedEmailVerification,
            offerPopUp: {
                ...parsedOfferPopUp,
                image: offerPopUpImagePath
            }
        };
        await settingsService.createSettings(data);
        res.status(200).send('Settings created successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateSettings = async (req, res, next) => {
    try {
        const { youTubeVideoPopUp, salesNotification, emailVerification, offerPopUp } = req.body;
        const parsedYouTubeVideoPopUp = JSON.parse(youTubeVideoPopUp);
        const parsedSalesNotification = JSON.parse(salesNotification);
        const parsedEmailVerification = JSON.parse(emailVerification);
        const parsedOfferPopUp = JSON.parse(offerPopUp);
        const offerPopUpImage = req.file;
        let offerPopUpImagePath = (offerPopUpImage && offerPopUpImage.path) || null;
        const data = {
            youTubeVideoPopUp: parsedYouTubeVideoPopUp,
            salesNotification: parsedSalesNotification,
            emailVerification: parsedEmailVerification,
            offerPopUp: {
                ...parsedOfferPopUp,
            }
        };
        if (offerPopUpImagePath) {
            data.offerPopUp.image = offerPopUpImagePath;
        }
        await settingsService.updateSettings(data);
        res.status(200).send('Settings updated successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchSettings,
    CreateSettings,
    UpdateSettings
};
