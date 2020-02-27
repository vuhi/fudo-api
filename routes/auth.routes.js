const router = require('express').Router();
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const { sign } = require('../utils/token.handler');
const { isObjectNullOrEmpty, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');
const { USER, ACTIVE } = require('../utils/config');

/**
 *  @path: [POST] api/auth/login
 *  @desc: Authenticate user with username or email & password
 */
router.post('/login', async (req, res, next) => {
  const { identify, password } = req.body;
  if (!identify || !password) {
    throw new ErrorResponse('missing payload', 401);
  }

  const user = await userService.getUserByIdentify(identify);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse('invalid credential', 401);
  }

  const token = sign({ id: user.id }, user.email);
  resFun(res, 'Success login in', { token });
});

/**
 *  @path: [POST] api/auth/register
 *  @desc: Register a user
 */
router.post('/register', async (req, res, next) => {
  let user = req.body;
  if (isObjectNullOrEmpty(user)) {
    throw new ErrorResponse('payload empty', 400);
  }

  user.role = USER;
  user.status = ACTIVE;
  user.password = await bcrypt.hash(user.password, 10);
  user = await userService.createUser(user);

  const token = sign({ id: user.id }, user.email);
  resFun(res, 'Success register', { token });
});
