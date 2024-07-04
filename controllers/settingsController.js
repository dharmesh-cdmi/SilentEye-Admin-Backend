const settingsService = require('../services/settingsService');

const FetchAllSettings = async (req, res) => {
    try {
        const settings = await settingsService.fetchAllSettings();
        res.status(200).json({ settings });
    } catch (error) {
        if (error.message === 'Settings not found!') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};


module.exports = {
    FetchAllSettings,
};
