const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { TagSchema, tagValidator } = require('./tag.schema');
const { IngredientSchema, ingredientValidator } = require('./ingredient.schema');
const { DirectionSchema, directionValidator } = require('./direction.schema');
const { OBJECT_ID_REG } = require('../utils/helpers.func');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add recipe\'s name'],
    trim: true,
    maxlength: [255, 'recipe\'s name cannot be more than 255']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: [true, 'Please add recipe\'s user']
  },
  createdOn: {
    type: Date,
    required: [true, 'Please add recipe\'s createdOn'],
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
  // numberTried: {
  //   type: Number,
  //   required: [true, 'Please add recipe\'s numberTried'],
  //   min: [0, 'numberTried must be at least 0'],
  //   default: 0
  // },
  // numberLiked: {
  //   type: Number,
  //   required: [true, 'Please add recipe\'s numberLiked'],
  //   min: [0, 'numberLiked must be at least 0'],
  //   default: 0
  // },
  image: {
    type: String,
    trim: true,
    maxlength: [255, 'recipe\'s image cannot be more than 255'],
    default: null
  },
  description: {
    type: String,
    required: [true, 'Please add recipe\'s description'],
    trim: true,
    maxlength: [500, 'recipe\'s description cannot be more than 255'],
    minlength: [20, 'recipe\'s description should be at least 20 characters']
  },
  prepTime: {
    type: Number,
    required: [true, 'Please add recipe\'s prepTime'],
    min: [0, 'prepTime must be at least 0'],
    max: [999999999, 'prepTime cannot be more than 999999999']
  },
  cookTime: {
    type: Number,
    required: [true, 'Please add recipe\'s cookTime'],
    min: [0, 'cookTime must be at least 0'],
    max: [999999999, 'cookTime cannot be more than 999999999']
  },
  readyTime: {
    type: Number,
    required: [true, 'Please add recipe\'s readyTime'],
    min: [0, 'readyTime must be at least 0']
  },
  tags: [TagSchema],
  ingredients: [IngredientSchema],
  directions: [DirectionSchema],
  isPublic: {
    type: Boolean,
    required: [true, 'Please add recipe\'s isPublic'],
    default: false
  }
});

module.exports.recipeValidator = Joi.object({
  _id: Joi.string()
    .regex(OBJECT_ID_REG).message('id should be a valid object id'),
  name: Joi.string().required().max(255),
  createdBy: Joi.string().required()
    .regex(OBJECT_ID_REG).message('created by should be a valid object id'),
  createdOn: Joi.date().required().timestamp('javascript'),
  updatedOn: Joi.date().timestamp('javascript').allow(null),
  updatedBy: Joi.string().allow(null)
    .regex(OBJECT_ID_REG).message('updated by should be a valid object id'),
  image: Joi.string().max(255).uri().allow(null),
  description: Joi.string().required().min(20).max(500),
  prepTime: Joi.number().strict().required().min(0).max(999999999),
  cookTime: Joi.number().strict().required().min(0).max(999999999),
  readyTime: Joi.number().strict().required().min(0),
  tags: Joi.array().items(tagValidator).min(1),
  ingredients: Joi.array().items(ingredientValidator).min(1),
  directions: Joi.array().items(directionValidator).min(1),
  isPublic: Joi.boolean().required()
});

module.exports.Recipe = mongoose.model('Recipe', recipeSchema);
