const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.DirectionSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, 'please add ingredient\'s index']
  },
  direction: {
    type: String,
    required: [true, 'please add direction'],
    trim: true,
    maxlength: [500, 'direction cannot be more than 500 characters']
  },
  tip: {
    type: String,
    default: null,
    trim: true,
    maxlength: [255, 'ingredient\'s tip cannot be more than 255 characters']
  }
}, { _id: false });

module.exports.directionValidator = Joi.object({
  index: Joi.number().strict().required().min(1).label('direction\'s index'),
  direction: Joi.string().required().max(500).label('direction\'s direction'),
  tip: Joi.string().max(255).allow(null).label('direction\'s tip')
});
