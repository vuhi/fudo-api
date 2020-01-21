const mongoose = require('mongoose');
const { tagSchema } = require('./tag.schema');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add recipe\'s name'],
    trim: true,
    maxLength: [255, 'recipe\'s name cannot be more than 255']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    default: null
  },
  createdOn: {
    type: Date,
    require: [true, 'Please add recipe\'s createdOn'],
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: null
  },
  numberTried: {
    type: Number,
    require: [true, 'Please add recipe\'s numberTried'],
    min: [0, 'numberTried must be at least 0'],
    default: 0
  },
  numberLiked: {
    type: Number,
    require: [true, 'Please add recipe\'s numberLiked'],
    min: [0, 'numberLiked must be at least 0'],
    default: 0
  },
  image: {
    type: String,
    trim: true,
    maxLength: [255, 'recipe\'s image cannot be more than 255'],
    default: null
  },
  description: {
    type: String,
    require: [true, 'Please add recipe\'s description'],
    trim: true,
    maxLength: [500, 'recipe\'s image cannot be more than 255']
  },
  tags: [tagSchema],
  prepTime: {
    type: Number,
    require: [true, 'Please add recipe\'s prepTime'],
    min: [0, 'prepTime must be at least 0'],
    max: [999999999, 'prepTime cannot be more than 999999999']
  },
  cookTime: {
    type: Number,
    require: [true, 'Please add recipe\'s cookTime'],
    min: [0, 'cookTime must be at least 0'],
    max: [999999999, 'cookTime cannot be more than 999999999']
  },
  readyTime: {
    type: Number,
    require: [true, 'Please add recipe\'s readyTime'],
    min: [0, 'readyTime must be at least 0']
  },
  // ingredients: Ingredient[],
  // directions: Direction[],
  isPublic: {
    type: Boolean,
    require: [true, 'Please add recipe\'s isPublic'],
    default: false
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
