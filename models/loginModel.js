const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  country: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  IP: {
    type: String,
    required: true
  },
  loggedInAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
