const { Recipe, recipeValidator } = require('../db/recipe.schema');
const { ErrorResponse } = require('../utils/error-response.class');
const { DEFAULT_RECIPE_PAGE, DEFAULT_RECIPE_LIMIT } = require('../utils/config');

module.exports.getRecipes = (page = DEFAULT_RECIPE_PAGE, limit = DEFAULT_RECIPE_LIMIT) =>
  Recipe.find({ isPublic: true }).sort({ createdOn: 'desc' }).skip((page - 1) * limit).limit(limit)
    .populate({ path: 'createdBy', select: '-_id userName' })
    .populate({ path: 'updatedBy', select: '-_id userName' })
    .populate({ path: 'tags.color', select: '-_id name background text' });

module.exports.getRecipe = (id) => Recipe.findById(id)
  .orFail(new ErrorResponse('no recipe found with the associated id', 404));

module.exports.createRecipe = (recipe) => {
  const result = recipeValidator.validate(recipe);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return new Recipe(recipe).save();
};

module.exports.updateRecipe = (id, recipe) => {
  const result = recipeValidator.validate(recipe);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return Recipe.findByIdAndUpdate(id, recipe, { new: true, runValidators: true })
    .orFail(new ErrorResponse('failed to update, no result found with the associated id', 404));
};

module.exports.deleteRecipe = (id) => Recipe.findByIdAndDelete(id)
  .orFail(new ErrorResponse('failed to delete, no result found with the associated id', 404));
