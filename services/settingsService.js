const Settings = require('../models/settingsModel');

const fetchSettings = async () => {
    const settings = await Settings.findOne({});
    if (!settings) {
        const error = new Error('Settings not found!');
        error.code = 404;
        throw error;
    }
    return settings;
};

const createSettings = async (settingsData) => {
    const settings = await Settings.create(settingsData);
    return settings;
};

const updateSettings = async (updatedSettingsData) => {
    const existingSettings = await Settings.findOne({});
    if (!existingSettings) {
        const error = new Error('Settings not found!');
        error.code = 404;
        throw error;
    }
    const mergedSettings = {
        youTubeVideoPopUp: {
            ...existingSettings.youTubeVideoPopUp.toObject(),
            ...updatedSettingsData.youTubeVideoPopUp
        },
        salesNotification: {
            ...existingSettings.salesNotification.toObject(),
            ...updatedSettingsData.salesNotification
        },
        emailVerification: {
            ...existingSettings.emailVerification.toObject(),
            ...updatedSettingsData.emailVerification
        },
        offerPopUp: {
            ...existingSettings.offerPopUp.toObject(),
            ...updatedSettingsData.offerPopUp
        }
    };

    const updatedSettings = await Settings.findOneAndUpdate({}, { $set: mergedSettings }, { new: true });
    if (!updatedSettings) {
        const error = new Error('Settings not found!');
        error.code = 404;
        throw error;
    }
    return updatedSettings;
};

module.exports = {
    fetchSettings,
    createSettings,
    updateSettings
};
