const settingsService = require('../services/settingsService');

const FetchSettings = async (req, res) => {
    try {
        const settings = await settingsService.fetchSettings();
        res.status(200).json({ settings });
    } catch (error) {
        if (error.message === 'Settings not found!') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const CreateSettings = async (req, res) => {
    try {
        const data = req.body;
        await settingsService.createSettings(data);
        res.status(200).send('Settings created successfully!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const UpdateSettings = async (req, res) => {
    try {
        const data = req.body;
        await settingsService.updateSettings(data);
        res.status(200).send('Settings updated successfully!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    FetchSettings,
    CreateSettings,
    UpdateSettings
};
