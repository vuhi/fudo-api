const mongoose = require('mongoose');
const tagSchema = require('./tag.schema');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add recipe name'],
    trim: true,
    maxLength: [255, 'recipe\'s name cannot be more than 255']
  },
  userId: mongoose.Schema.Types.ObjectID,
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: null
  },
  numberTried: {
    type: Number,
    min: [0, 'numberTried must be at least 0'],
    default: 0
  },
  numberLiked: {
    type: Number,
    min: [0, 'numberLiked must be at least 0'],
    default: 0
  },
  image: {
    type: String,
    trim: true,
    maxLength: [255, 'recipe\'s image cannot be more than 255']
    // default: 'recipe-placeholder.jpg'
  },
  description: {
    type: String,
    require: [true, 'Please add recipe description'],
    trim: true,
    maxLength: [500, 'recipe\'s image cannot be more than 255']
  },
  tags: [tagSchema],
  prepTime: {
    type: Number,
    require: [true, 'Please add recipe prepTime'],
    min: [0, 'prepTime must be at least 0'],
    max: [999999999, 'prepTime cannot be more than 999999999'],
    default: 0
  },
  cookTime: {
    type: Number,
    require: [true, 'Please add recipe cookTime'],
    min: [0, 'cookTime must be at least 0'],
    max: [999999999, 'cookTime cannot be more than 999999999'],
    default: 0
  },
  readyTime: {
    type: Number,
    require: [true, 'Please add recipe readyTime'],
    min: [0, 'readyTime must be at least 0'],
    default: 0
  },
  // ingredients: Ingredient[],
  // directions: Direction[],
  isPublic: {
    type: Boolean,
    default: false
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
