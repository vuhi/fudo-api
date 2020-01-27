const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { STATUSES } = require('../utils/config');
const { OBJECT_ID_REG } = require('../utils/helpers.func');

module.exports.Status = mongoose.model('Status', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add status\'s name'],
    trim: true,
    unique: true,
    enum: STATUSES
  }
}));

module.exports.statusValidator = Joi.object({
  _id: Joi.string()
    .regex(OBJECT_ID_REG).message('id should be a valid object id'),
  name: Joi.string().required().valid(...STATUSES)
});
