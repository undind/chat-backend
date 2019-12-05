import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email adress is required'
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
