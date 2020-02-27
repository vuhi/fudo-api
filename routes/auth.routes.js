// const router = require('express').Router();
// const userService = require('../services/user.service');
// // const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
// const { ErrorResponse } = require('../utils/error-response.class');
//
// /**
//  *  @path: [GET] api/auth/login
//  *  @desc: Authenticate user with user & password
//  */
// router.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     throw new ErrorResponse('missing payload', 400);
//   }
//
//
//
//
//   // TODO: FILTER OUT all ADMIN & SUPER_ADMIN role
//   const users = await userService.getUsers();
//   resFun(res, 'Success get users', users);
// });