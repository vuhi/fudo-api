const router = require('express').Router();
const userService = require('../services/user.service');
const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');

// TODO: AUTH

/**
 *  @path: [GET] api/users/all
 *  @desc: Get all users
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: ADMIN cannot see other ADMIN & SUPER_ADMIN
 */
router.get('/all', async (req, res, next) => {
  // TODO: FILTER OUT all ADMIN & SUPER_ADMIN role
  const users = await userService.getUsers();
  resFun(res, 'Success get users', users);
});

/**
 *  @path: [GET] api/users/:id
 *  @desc: Get a user by id
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: ADMIN cannot see other ADMIN & SUPER_ADMIN
 */
router.get('/:id', async (req, res, next) => {
  // TODO: BASE ON ROLE OF CURRENT USER TO ADD CONDITION QUERY TO FILTER ADMIN ROLE
  // TODO: DO NOT USE THIS ROUTE TO QUERY YOUR INFO (YOURSELF)
  // TODO: SHOULD SHOW PASSWORD OR NOT? SHOULD SHOW ALL RELATED INFO? (RECIPE, RECIPE BOOK?)
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }
  const user = await userService.getUser(id);
  resFun(res, 'Success get user', user);
});

/**
 *  @path: [POST] api/users
 *  @desc: Create a new user
 *  @auth: ??
 *  @note: ??
 */
router.post('', async (req, res, next) => {
  let user = req.body;
  if (isObjectNullOrEmpty(user)) {
    throw new ErrorResponse('payload empty', 400);
  }
  // TODO: NOT SURE SHOULD USE THIS ROUTE TO REGISTER USER AS WELL?
  //  check if role & status is valid object in db

  user = await userService.createUser(user);
  resFun(res, 'Success create user', user);
});

/**
 *  @path: [PUT] api/users/:id
 *  @desc: Update a user
 *  @auth: All
 *  @note: Only SUPER_ADMIN can edit ADMIN role, purely use to edit user info (not role, status, reason)
 */
router.put('/:id', async (req, res, next) => {
  let user = req.body;
  if (isObjectNullOrEmpty(user)) {
    throw new ErrorResponse('payload empty', 400);
  }

  const id = req.params.id;
  if (!isObjectId(id) || id !== user._id) {
    throw new ErrorResponse('invalid params', 400);
  }

  // TODO: DO NOT ALLOW "role" & "status" to be edit in this route,
  //  should have other route to handle block user or promote user
  //  check if role & status is valid object in db

  user = await userService.updateUser(id, user);
  resFun(res, 'Success update user', user);
});

/**
 *  @path: [DEL] api/users/:id
 *  @desc: Delete a user
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Only SUPER_ADMIN can delete ADMIN.
 */
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }
  // TODO: Check current user role & deleted user's role for role before delete.
  // TODO: What happen to the user related data: Recipe, RecipeBook?... Cascading delete?
  //  should we backup user info + related data for the future?
  const user = await userService.deleteUser(id);
  resFun(res, 'Success delete user', user);
});

module.exports = router;
