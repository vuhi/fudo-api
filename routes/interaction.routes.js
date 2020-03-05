// const router = require('express').Router();
// // const recipeService = require('../services/recipe.service');
// // const { auth } = require('../utils/middlewares/auth.middleware');
// const { isObjectId, resFun } = require('../utils/helpers.func');
// const { ErrorResponse } = require('../utils/error-response.class');
//
// /**
//  *  @path: [GET] api/recipes/:id/interaction
//  *  @desc: Get user interaction with the current recipe
//  *  @auth: Login required
//  */
// router.get('/:id/interaction', async (req, res, next) => {
//   // TODO: Add AuthMiddleware
//   const id = req.params.id;
//   if (!isObjectId(id)) {
//     throw new ErrorResponse('invalid params', 400);
//   }
//
//   resFun(res, 'Success get recipe\'s interaction', { delicous: false, cooked: true });
// });
