const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Details Schema
const userDetailsSchema = new Schema({
  profile_avatar: { type: String },
  country: { type: String },
  phone: { type: Number },
  address: { type: String },
}, { _id: false });

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  email_verified_at: { type: Date, required: true },
  password: { type: String, required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  userDetails: userDetailsSchema,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  remember_token: { type: String },
  lastLoggedInAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // New fields
  amountSpend: { type: Number, default: 0 },
  amountRefund: { type: Number, default: 0 },
  device: { type: String },
  ipAddress: { type: String },
  manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
  blocked: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['Demo', 'Checkout', 'Paid'],
    default: 'Demo'
  },
  process: {
    type: String,
    enum: ['Running', 'Pending', 'Completed'],
    default: 'Pending'
  },
  joined: { type: Date, default: Date.now },
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
