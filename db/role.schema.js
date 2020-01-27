const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { ROLES } = require('../utils/config');
const { OBJECT_ID_REG } = require('../utils/helpers.func');

module.exports.Role = mongoose.model('Role', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add role\'s name'],
    trim: true,
    unique: true,
    enum: ROLES
  }
}));

module.exports.roleValidator = Joi.object({
  _id: Joi.string()
    .regex(OBJECT_ID_REG).message('id should be a valid object id'),
  name: Joi.string().required()
});
