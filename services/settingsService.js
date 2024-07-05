const Settings = require('../models/settingsModel');

const fetchSettings = async () => {
    const settings = await Settings.findOne({});
    if (!settings) {
        throw new Error('Settings not found!');
    }
    return settings;
};

const createSettings = async (settingsData) => {
    const settings = await Settings.create(settingsData);
    return settings;
};

const updateSettings = async (updatedSettingsData) => {
    const updatedSettings = await Settings.findOneAndUpdate({}, updatedSettingsData);
    return updatedSettings;
};

module.exports = {
    fetchSettings,
    createSettings,
    updateSettings
};
