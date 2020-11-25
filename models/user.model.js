const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: false,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: {
      required: true,
      type: String,
      unique: false,
      trim: true,
      minlength: 8,
    },
    remember: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      default: 'read',
      enum: ['super_admin', 'team_admin', 'write', 'read'],
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
