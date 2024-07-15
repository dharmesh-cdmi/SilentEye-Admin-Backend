const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Details Schema
const userDetailsSchema = new Schema({
  profile_avatar: { type: String },
  country: { type: String },
  phone: { type: String },
  address: { type: String },
}, { _id: false });

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  email_verified_at: { type: Date, required: true },
  password: { type: String, required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  activePlanId: { type: Schema.Types.ObjectId, ref: 'Plan' },
  userDetails: userDetailsSchema,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  refreshToken: {
    type: String,
    required: false,
  },
  lastLoggedInAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
