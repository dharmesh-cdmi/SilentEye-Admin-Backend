const Settings = require('../models/settingsModel');

const fetchAllSettings = async () => {
    const settings = await Settings.findOne({});
    if (!settings) {
        throw new Error('Settings not found!');
    }
    return settings;
};

module.exports = {
    fetchAllSettings,
};
