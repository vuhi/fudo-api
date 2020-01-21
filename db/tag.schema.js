const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const colorValidateObject = {
  validator: (v) => v.length === 7 && v[0] === '#',
  message: 'color must start with # & has 7 characters'
};

module.exports.TagColor = mongoose.model('TagColor', mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please add tag\'s colorName'],
    trim: true,
    maxLength: [20, 'tag\'s colorName cannot be more than 20']
  },
  background: {
    type: String,
    require: [true, 'please add tag\'s background color'],
    validate: colorValidateObject
  },
  text: {
    type: String,
    require: [true, 'please add tag\'s text color'],
    validate: colorValidateObject
  }
}));

module.exports.tagColorValidator = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().max(20).required(),
  background: Joi.string().required().max(7).regex(/^#[A-Fa-f0-9]{6}$/),
  text: Joi.string().required().max(7).regex(/^#[A-Fa-f0-9]{6}$/)
});

module.exports.tagSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add tag name'],
    trim: true,
    maxLength: [15, 'tag\'s name cannot be more than 15']
  },
  color: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'TagColor'
  }
}, { _id: false });
