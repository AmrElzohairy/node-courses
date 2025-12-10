let mongoose = require('mongoose');
let validator = require('validator');
let userRoles  = require('../utils/userRoles');

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN],
    default: userRoles.USER,
    validate: {
      validator: function (v) {
        return Object.values(userRoles).includes(v);
      },
      message: props => `${props.value} is not a valid user role!`
    }
  }
  ,avater: {
    type: String,
    default: 'uploads/profile.jpg'
  }
})

module.exports = mongoose.model('User', userSchema);