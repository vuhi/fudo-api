const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.IngredientSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, 'please add ingredient\'s index']
  },
  name: {
    type: String,
    required: [true, 'please add ingredient\'s name'],
    trim: true,
    maxlength: [255, 'ingredient\'s name cannot be more than 255 characters']
  },
  unit: {
    type: String,
    required: [true, 'please add ingredient\'s unit'],
    trim: true,
    maxlength: [100, 'ingredient\'s unit cannot be more than 100 characters']
  },
  amount: {
    type: String,
    required: [true, 'please add ingredient\'s amount'],
    trim: true,
    maxlength: [100, 'ingredient\'s amount cannot be more than 100 characters']
  },
  tip: {
    type: String,
    default: null,
    trim: true,
    maxlength: [255, 'ingredient\'s tip cannot be more than 255 characters']
  }
}, { _id: false });

module.exports.ingredientValidator = Joi.object({
  index: Joi.number().strict().required().min(1).label('ingredient\'s index'),
  name: Joi.string().required().max(255).label('ingredient\'s name'),
  unit: Joi.string().required().max(100).label('ingredient\'s unit'),
  amount: Joi.string().required().max(100).label('ingredient\'s amount'),
  tip: Joi.string().max(255).allow(null).label('ingredient\'s tip')
});
