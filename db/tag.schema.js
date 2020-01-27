const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { OBJECT_ID_REG, HEX_COLOR_REG } = require('../utils/helpers.func');

module.exports.TagColor = mongoose.model('TagColor', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add tag\'s colorName'],
    trim: true,
    maxlength: [20, 'tag\'s colorName cannot be more than 20']
  },
  background: {
    type: String,
    required: [true, 'please add tag\'s background color'],
    match: [
      HEX_COLOR_REG,
      'color must start with # & has 7 characters'
    ]
  },
  text: {
    type: String,
    required: [true, 'please add tag\'s text color'],
    match: [
      HEX_COLOR_REG,
      'color must start with # & has 7 characters'
    ]
  }
}));

module.exports.tagColorValidator = Joi.object({
  _id: Joi.string()
    .regex(OBJECT_ID_REG).message('id should be a valid object id'),
  name: Joi.string().required().max(20),
  background: Joi.string().required().max(7)
    .regex(HEX_COLOR_REG).message('"background" should be a hex color'),
  text: Joi.string().required().max(7)
    .regex(HEX_COLOR_REG).message('"text" should be a hex color')
});

module.exports.TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add tag name'],
    trim: true,
    maxlength: [15, 'tag\'s name cannot be more than 15']
  },
  color: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'TagColor'
  }
}, { _id: false });

module.exports.tagValidator = Joi.object({
  name: Joi.string().required().max(15).label('tag\'s name'),
  color: Joi.string().required().label('tag\'s color')
    .regex(OBJECT_ID_REG).message('tag color should be a valid object id')
});
