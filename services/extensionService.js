const Extension = require('../models/extensionModel');

const fetchExtensions = async () => {
    const extensions = await Extension.findOne({});
    if (!extensions) {
        throw new Error('Extensions not found!');
    }
    return extensions;
};

const createExtensions = async (extensionsData) => {
    const extensions = await Extension.create(extensionsData);
    return extensions;
};

const updateExtensions = async (updatedExtensionsData) => {
    const updatedExtensions = await Extension.findOneAndUpdate({}, updatedExtensionsData);
    return updatedExtensions;
};

module.exports = {
    fetchExtensions,
    createExtensions,
    updateExtensions
};
