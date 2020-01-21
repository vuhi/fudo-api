const router = require('express').Router();
// const recipeService = require('../services/recipe.service');
const { ErrorResponse, resFun, isObjectNullOrEmpty } = require('../utils');

router.get('/all', async (req, res, next) => {
  const recipes = await recipeService.getRecipes();

  resFun(res, 'Success get recipes', recipes);
});

router.post('', async (req, res, next) => {
  // TODO: ONLY LOGIN USER CAN CREATE RECIPE, VALIDATION?
  const recipe = req.body;
  if (isObjectNullOrEmpty(recipe)) {
    throw new ErrorResponse('payload empty', 400);
  }

  recipe.createdOn = Date.now();

  const newRecipe = await recipeService.createRecipe(recipe);

  resFun(res, 'Success create recipes', newRecipe);
});

module.exports = router;
