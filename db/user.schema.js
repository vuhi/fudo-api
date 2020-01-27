const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { EMAIL_REG, PASSWORD_REG, OBJECT_ID_REG, USER_NAME_REG } = require('../utils/helpers.func');

module.exports.User = mongoose.model('User', new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'please add user\'s firstName'],
    trim: true,
    maxlength: [100, 'firstName cannot be more than 100']
  },
  lastName: {
    type: String,
    required: [true, 'please add user\'s lastName'],
    trim: true,
    maxlength: [100, 'lastName cannot be more than 100']
  },
  userName: {
    type: String,
    required: [true, 'please add username'],
    trim: true,
    unique: true,
    maxlength: [20, 'username cannot be more than 20'],
    minlength: [6, 'username minimum length is 6'],
    match: [
      USER_NAME_REG,
      'username should be alphanumeric or underscore or dash, min = 6, max = 20'
    ]
  },
  email: {
    type: String,
    required: [true, 'please add user\'s email'],
    trim: true,
    unique: true,
    match: [
      EMAIL_REG,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    // required: [true, 'please add user\'s password'],
    minlength: [10, 'password should has at least 10 character'],
    match: [
      PASSWORD_REG,
      'Password must have at least one letter, one number, one special character & minimum 10 characters'
    ],
    select: false
  },
  bio: {
    type: String,
    maxlength: [100, 'bio cannot be more than 100'],
    default: null
  },
  image: {
    type: String,
    trim: true,
    maxlength: [255, 'user\'s image cannot be more than 255'],
    match: [
      // eslint-disable-next-line no-useless-escape
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ],
    default: null
  },
  createdOn: {
    type: Date,
    // required: [true, 'Please add user\'s createdOn'],
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: null
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    default: null
  },
  role: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Role',
    required: [true, 'Please add user\'s role']
  },
  status: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Status',
    required: [true, 'Please add user\'s status']
  }
}));

module.exports.userValidator = Joi.object({
  _id: Joi.string()
    .regex(OBJECT_ID_REG).message('id should be a valid object id'),
  firstName: Joi.string().required().max(100),
  lastName: Joi.string().required().max(100),
  userName: Joi.string().required().max(20).min(6)
    .regex(USER_NAME_REG).message('username should be alphanumeric or underscore or dash, minlen = 6, maxlen = 20'),
  email: Joi.string().required().email(),
  password: Joi.string().min(10)
    .regex(PASSWORD_REG).message('Password must have at least one letter, one number, one special character & minimum 10 characters'),
  bio: Joi.string().max(100).allow(null),
  image: Joi.string().max(255).uri().allow(null),
  createdOn: Joi.date().timestamp('javascript'),
  updatedOn: Joi.date().timestamp('javascript').allow(null),
  updatedBy: Joi.string().allow(null)
    .regex(OBJECT_ID_REG).message('updated by should be a valid object id'),
  role: Joi.string()
    .regex(OBJECT_ID_REG).message('role should be a valid object id'),
  status: Joi.string()
    .regex(OBJECT_ID_REG).message('status should be a valid object id')
});
