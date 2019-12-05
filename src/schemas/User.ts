import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email adress is required',
    validate: [isEmail, 'Invalid Email'],
    unique: true
  },
  fullname: {
    type: String,
    required: 'Fullname is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  avatar: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirm_hash: String,
  last_seen: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;
