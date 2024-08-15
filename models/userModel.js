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
  name: { type: String },
  email: { type: String, unique: false },
  email_verified_at: { type: Date, },
  password: { type: String },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  activePlanId: { type: Schema.Types.ObjectId, ref: 'Plan' },
  userDetails: userDetailsSchema,
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  refreshToken: {
    type: String,
    required: false,
  },
  lastLoggedInAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // New fields
  amountSpend: { type: Number, default: 0 },
  amountRefund: { type: Number, default: 0 },
  device: { type: String },
  ipAddress: { type: String, trim: true, required: true },
  blocked: { type: Boolean, default: false },
  userStatus: {
    type: String,
    enum: ['Demo', 'Checkout', 'Paid', 'Visitor', 'Payment_Initiated', 'Purchased', 'Logged_In', 'Refund_Requested', 'Blocked'],
    default: 'Demo'
  },
  process: {
    type: String,
    enum: ['Running', 'Pending', 'Completed'],
    default: 'Pending'
  },
  joined: { type: Date, default: Date.now },
  history: [
    {
      date: { type: Date, default: Date.now },
      action: {
        type: String,
        required: true,
        enum: ['Account Created', 'Home Page', 'Pricing Page', 'Contact Page', 'Demo Page', 'Purchased', 'Refund Requested', 'Logged In', 'Logged Out', 'Blocked']
      },
    }
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Orders'
    }
  ],
  targetedNumbers: [],
  walletAmount: { type: Number, default: 0 },
  activeDashboard: { type: Boolean, default: false },
  deviceType: { type: String },
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
