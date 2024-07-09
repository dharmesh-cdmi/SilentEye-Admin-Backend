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
    // const updatedSettings = await Settings.findOneAndUpdate({}, updatedSettingsData), { new: true };
    const updatedSettings = await Settings.findOneAndUpdate({}, { $set: updatedSettingsData }, { new: true });
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
