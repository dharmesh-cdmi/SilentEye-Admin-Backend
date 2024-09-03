const ShippingTrackingSettings = require('../models/shippingTrackingModel');

// Add a new topic
const addTopic = async (data) => {
  try {
    // Find the existing settings or create a new one if not found
    let settings = await ShippingTrackingSettings.findOne({});

    if (!settings) {
      // If no settings document exists, create a new one
      settings = new ShippingTrackingSettings({
        topics: [{ name: data?.name }],
      });
    } else {
      // If settings exist, just push the new topic to the topics array
      settings.topics.push({ name: data?.name });
    }

    await settings.save();

    return {
      status: true,
      data: settings,
      message: 'Topic added successfully',
    };
  } catch (error) {
    throw new Error(
      'Error in adding the topic: ' + (error?.message ? error?.message : error)
    );
  }
};

// Delete a topic
const deleteTopic = async (topicId) => {
  try {
    const settings = await ShippingTrackingSettings.findOne({});

    // Check if the topic exists
    const topic = settings.topics.id(topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    // Use pull to remove the topic by its ID
    settings.topics.pull({ _id: topicId });
    await settings.save();

    return {
      status: true,
      data: settings,
      message: 'Topic deleted successfully',
    };
  } catch (error) {
    throw new Error(
      'Error in deleting the topic: ' +
        (error?.message ? error?.message : error)
    );
  }
};

// Add a new subtopic
const addSubTopic = async (topicId, data) => {
  try {
    const settings = await ShippingTrackingSettings.findOne({});

    // Find the topic by its ID
    const topic = settings.topics.id(topicId);

    if (!topic) {
      throw new Error('Topic not found');
    }

    // Add the subtopic to the subTopics array
    topic.subTopics.push(data?.name);
    await settings.save();

    return {
      status: true,
      data: settings,
      message: 'Subtopic added successfully',
    };
  } catch (error) {
    throw new Error(
      'Error in adding the subtopic: ' +
        (error?.message ? error?.message : error)
    );
  }
};

const deleteSubTopic = async (topicId, subTopicName) => {
  try {
    // Fetch the settings document
    const settings = await ShippingTrackingSettings.findOne({});

    if (!settings) {
      throw new Error('Settings not found');
    }

    // Find the topic by its ID
    const topic = settings.topics.id(topicId);

    if (!topic) {
      throw new Error('Topic not found');
    }

    // Log the topic object to inspect its structure
    console.log('Topic:', topic);

    // Ensure topic.subTopics is an array
    if (!Array.isArray(topic.subTopics)) {
      throw new Error('subTopics is not an array');
    }

    // Log the subTopics array for debugging
    console.log('SubTopics:', topic.subTopics);

    // Ensure subTopicName is a valid string
    if (typeof subTopicName !== 'string') {
      throw new Error('subTopicName is not a string');
    }

    // Check for exact match of the subtopic
    const subTopicIndex = topic.subTopics.findIndex(
      (subTopic) =>
        typeof subTopic === 'string' && subTopic.trim() === subTopicName.trim()
    );

    if (subTopicIndex === -1) {
      throw new Error('Subtopic not found');
    }

    // Remove the subtopic from the subTopics array
    topic.subTopics.splice(subTopicIndex, 1);

    // Save the changes
    await settings.save();

    return {
      status: true,
      data: settings,
      message: 'Subtopic deleted successfully',
    };
  } catch (error) {
    console.error('Error in deleting the subtopic:', error.message || error);
    throw new Error(
      'Error in deleting the subtopic: ' +
        (error?.message ? error?.message : error)
    );
  }
};

// Get all settings
const getSettings = async () => {
  try {
    const settings = await ShippingTrackingSettings.findOne({});
    return {
      status: true,
      data: settings,
      message: 'Settings retrieved successfully',
    };
  } catch (error) {
    throw new Error(
      'Error in retrieving settings: ' +
        (error?.message ? error?.message : error)
    );
  }
};

module.exports = {
  addTopic,
  deleteTopic,
  addSubTopic,
  deleteSubTopic,
  getSettings,
};
