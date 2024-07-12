const extensionService = require('../services/extensionService');

const FetchExtensions = async (req, res, next) => {
    try {
        const extensions = await extensionService.fetchExtensions();
        res.status(200).json({ extensions });
    } catch (error) {
        next(error);
    }
};

const CreateExtensions = async (req, res, next) => {
    try {
        const data = req.body;
        await extensionService.createExtensions(data);
        res.status(200).send('Extensions created successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateExtensions = async (req, res, next) => {
    try {
        const data = req.body;
        await extensionService.updateExtensions(data);
        res.status(200).send('Extensions updated successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    FetchExtensions,
    CreateExtensions,
    UpdateExtensions
};
