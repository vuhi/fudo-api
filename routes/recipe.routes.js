const router = require('express').Router();
const recipeService = require('../services/recipe.service');
const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');

// TODO: AUTH
/**
 *  @path: [GET] api/recipes/all
 *  @desc: Get all recipes
 *  @auth: All
 *  @note: Show only public recipe. Filter by "limit" & "page" (potential "blocked")
 */
router.get('/all', async (req, res, next) => {
  let { page, limit } = req.query;

  if (Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
    throw new ErrorResponse('missing or invalid query input!', 400);
  }

  page = Number.parseInt(page, 10);
  limit = Number.parseInt(limit, 10);

  const recipes = await recipeService.getRecipes(page, limit);
  resFun(res, 'Success get recipes', recipes);
});

/**
 *  @path: [GET] api/recipes/:id
 *  @desc: Get all recipes
 *  @auth: All
 *  @note: Show only public recipe (potential "blocked")
 */
router.get('/:id', async (req, res, next) => {
  // TODO: Show only public recipe, private recipe only show when user (own recipe) login
  //  all recipes will show if ADMIN or SUPER_ADMIN ???
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }

  const recipe = await recipeService.getRecipe(id);
  resFun(res, 'Success get recipe', recipe);
});

/**
 *  @path: [POST] api/recipes
 *  @desc: Create a recipe
 *  @auth: All, Login Required
 */
router.post('', async (req, res, next) => {
  let recipe = req.body;
  if (isObjectNullOrEmpty(recipe)) {
    throw new ErrorResponse('payload empty', 400);
  }

  // TODO: Set required props here: numLike ??
  recipe = await recipeService.createRecipe(recipe);
  resFun(res, 'Success create recipe', recipe);
});

/**
 *  @path: [PUT] api/recipes/:id
 *  @desc: Update a recipe
 *  @auth: Owner, ADMIN, SUPER_ADMIN
 */
router.put('/:id', async (req, res, next) => {
  let recipe = req.body;
  if (isObjectNullOrEmpty(recipe)) {
    throw new ErrorResponse('payload empty', 400);
  }

  const id = req.params.id;
  if (!isObjectId(id) || id !== recipe._id) {
    throw new ErrorResponse('invalid params', 400);
  }

  // TODO: What props we should allow to update? May need to rewrite update func? or delete unneeded props
  recipe = await recipeService.updateRecipe(id, recipe);
  resFun(res, 'Success update recipe', recipe);
});

/**
 *  @path: [DEL] api/recipes/:id
 *  @desc: Delete a recipe
 *  @auth: Owner, ADMIN, SUPER_ADMIN
 */
router.delete('/:id', async (req, res, next) => {
  // TODO: What happen to related props? Cascading delete?
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }

  const recipe = await recipeService.deleteRecipe(id);
  resFun(res, 'Success delete recipe', recipe);
});

module.exports = router;
