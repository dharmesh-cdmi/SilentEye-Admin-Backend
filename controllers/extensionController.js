const extensionService = require('../services/extensionService');

const FetchExtensions = async (req, res) => {
    try {
        const extensions = await extensionService.fetchExtensions();
        res.status(200).json({ extensions });
    } catch (error) {
        if (error.message === 'Extensions not found!') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const CreateExtensions = async (req, res) => {
    try {
        const data = req.body;
        await extensionService.createExtensions(data);
        res.status(200).send('Extensions created successfully!');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const UpdateExtensions = async (req, res) => {
    try {
        const data = req.body;
        await extensionService.updateExtensions(data);
        res.status(200).send('Extensions updated successfully!');
    } catch (error) {
        if (error.message === 'Extensions not found!') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = {
    FetchExtensions,
    CreateExtensions,
    UpdateExtensions
};
