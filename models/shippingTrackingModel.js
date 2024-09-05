// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Shipping Tracking Topic Schema
// const TopicSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   subTopics: [
//     {
//       type: String, // Subtopics are stored as strings in an array
//     },
//   ],
// });

// // Shipping Tracking Settings Schema
// const ShippingTrackingSettingsSchema = new Schema({
//   topics: [TopicSchema], // Array of topics, each with its own subtopics
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const ShippingTrackingSettings = mongoose.model(
//   'ShippingTrackingSettings',
//   ShippingTrackingSettingsSchema
// );

// module.exports = ShippingTrackingSettings;

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Shipping Tracking Topic Schema
const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subTopics: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true }, // Subtopic ID
      name: { type: String, required: true }, // Subtopic name
    },
  ],
});

// Shipping Tracking Settings Schema
const ShippingTrackingSettingsSchema = new Schema({
  topics: [TopicSchema], // Array of topics, each with its own subtopics
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ShippingTrackingSettings = mongoose.model(
  'ShippingTrackingSettings',
  ShippingTrackingSettingsSchema
);

module.exports = ShippingTrackingSettings;
