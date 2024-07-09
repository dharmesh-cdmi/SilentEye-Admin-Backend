const Extension = require('../models/extensionModel');

const fetchExtensions = async () => {
    const extensions = await Extension.findOne({});
    if (!extensions) {
        const error = new Error('Extensions not found!');
        error.code = 404;
        throw error;
    }
    return extensions;
};

const createExtensions = async (extensionsData) => {
    const extensions = await Extension.create(extensionsData);
    return extensions;
};

const updateExtensions = async (updatedExtensionsData) => {
    const updatedExtensions = await Extension.findOneAndUpdate({}, updatedExtensionsData);
    if (!updatedExtensions) {
        const error = new Error('Extensions not found!');
        error.code = 404;
        throw error;
    }
    return updatedExtensions;
};

module.exports = {
    fetchExtensions,
    createExtensions,
    updateExtensions
};
