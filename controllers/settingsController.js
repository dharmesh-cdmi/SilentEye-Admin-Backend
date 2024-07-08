const settingsService = require('../services/settingsService');
const path = require("path");

const FetchSettings = async (req, res) => {
    try {
        const settings = await settingsService.fetchSettings();
        res.status(200).json({ settings });
    } catch (error) {
        if (error.message === 'Settings not found!') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const CreateSettings = async (req, res) => {
    try {
        console.log('Body: ', req.body);
        const { youTubeVideoPopUp, salesNotification, emailVerification, offerPopUp } = req.body;
        const parsedYouTubeVideoPopUp = JSON.parse(youTubeVideoPopUp);
        const parsedSalesNotification = JSON.parse(salesNotification);
        const parsedEmailVerification = JSON.parse(emailVerification);
        const parsedOfferPopUp = JSON.parse(offerPopUp);
        const offerPopUpImage = req.file;
        let offerPopUpImagePath = (offerPopUpImage && offerPopUpImage.path) || null;
        console.log('Image Path: ', offerPopUpImagePath);
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
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const UpdateSettings = async (req, res) => {
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
        await settingsService.updateSettings(data);
        res.status(200).send('Settings updated successfully!');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    FetchSettings,
    CreateSettings,
    UpdateSettings
};
