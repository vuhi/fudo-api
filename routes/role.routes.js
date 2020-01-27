const router = require('express').Router();
const roleService = require('../services/role.service');
const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');

// TODO: AUTH, ONLY ADMIN

/**
 *  @path: [GET] api/roles/all
 *  @desc: Get all roles
 *  @auth: ADMIN, SUPER_ADMIN only
 */
router.get('/all', async (req, res, next) => {
  const roles = await roleService.getRoles();
  resFun(res, 'Success get roles', roles);
});

/**
 *  @path: [POST] api/roles
 *  @desc: Create a new role
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the fix declaration of role
 */
router.post('', async (req, res, next) => {
  let role = req.body;
  if (isObjectNullOrEmpty(role)) {
    throw new ErrorResponse('payload empty', 400);
  }
  role = await roleService.createRole(role);
  resFun(res, 'Success create role', role);
});

/**
 *  @path: [PUT] api/roles/:id
 *  @desc: Update a role
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the fix declaration of role
 */
router.put('/:id', async (req, res, next) => {
  let role = req.body;
  if (isObjectNullOrEmpty(role)) {
    throw new ErrorResponse('payload empty', 400);
  }

  const id = req.params.id;
  if (!isObjectId(id) || id !== role._id) {
    throw new ErrorResponse('invalid params', 400);
  }

  role = await roleService.updateRole(id, role);
  resFun(res, 'Success update role', role);
});

/**
 *  @path: [DEL] api/roles/:id
 *  @desc: Delete a role
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the fix declaration of role
 */
router.delete('/:id', async (req, res, next) => {
  // TODO: What happen to user that has this role?
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }

  const role = await roleService.deleteRole(id);
  resFun(res, 'Success delete role', role);
});

module.exports = router;
