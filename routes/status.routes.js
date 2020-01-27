const router = require('express').Router();
const statusService = require('../services/status.service');
const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');

// TODO: AUTH, ONLY ADMIN

/**
 *  @path: [GET] api/statuses/all
 *  @desc: Get all statuses
 *  @auth: ADMIN, SUPER_ADMIN only
 */
router.get('/all', async (req, res, next) => {
  const statuses = await statusService.getStatuses();
  resFun(res, 'Success get statuses', statuses);
});

/**
 *  @path: [POST] api/statuses
 *  @desc: Create a new status
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the fix declaration of status
 */
router.post('', async (req, res, next) => {
  let status = req.body;
  if (isObjectNullOrEmpty(status)) {
    throw new ErrorResponse('payload empty', 400);
  }
  status = await statusService.createStatus(status);
  resFun(res, 'Success create status', status);
});

/**
 *  @path: [PUT] api/statuses/:id
 *  @desc: Update a status
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the fix declaration of status
 */
router.put('/:id', async (req, res, next) => {
  let status = req.body;
  if (isObjectNullOrEmpty(status)) {
    throw new ErrorResponse('payload empty', 400);
  }

  const id = req.params.id;
  if (!isObjectId(id) || id !== status._id) {
    throw new ErrorResponse('invalid params', 400);
  }

  status = await statusService.updateStatus(id, status);
  resFun(res, 'Success update status', status);
});

/**
 *  @path: [DEL] api/statuses/:id
 *  @desc: Delete a status
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the dependencies of status
 */
router.delete('/:id', async (req, res, next) => {
  // TODO: What happen to user that has this status? or should not delete if there is dependencies
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }

  const status = await statusService.deleteStatus(id);
  resFun(res, 'Success delete status', status);
});

module.exports = router;
