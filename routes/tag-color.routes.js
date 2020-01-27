const router = require('express').Router();
const tagColorService = require('../services/tag-color.service');
const { isObjectNullOrEmpty, isObjectId, resFun } = require('../utils/helpers.func');
const { ErrorResponse } = require('../utils/error-response.class');

// TODO: AUTH, ONLY ADMIN

/**
 *  @path: [GET] api/tag-colors/all
 *  @desc: Get all tag colors
 *  @auth: ADMIN, SUPER_ADMIN only
 */
router.get('/all', async (req, res, next) => {
  const tagColors = await tagColorService.getTagColors();
  resFun(res, 'Success get tag colors', tagColors);
});

/**
 *  @path: [POST] api/tag-colors
 *  @desc: Create a new tag color
 *  @auth: ADMIN, SUPER_ADMIN only
 */
router.post('', async (req, res, next) => {
  let tagColor = req.body;
  if (isObjectNullOrEmpty(tagColor)) {
    throw new ErrorResponse('payload empty', 400);
  }

  tagColor = await tagColorService.createTagColor(tagColor);
  resFun(res, 'Success create tag color', tagColor);
});

/**
 *  @path: [PUT] api/tag-colors/:id
 *  @desc: Update a tag color
 *  @auth: ADMIN, SUPER_ADMIN only
 */
router.put('/:id', async (req, res, next) => {
  let tagColor = req.body;
  if (isObjectNullOrEmpty(tagColor)) {
    throw new ErrorResponse('payload empty', 400);
  }

  const id = req.params.id;
  if (!isObjectId(id) || id !== tagColor._id) {
    throw new ErrorResponse('invalid params', 400);
  }

  tagColor = await tagColorService.updateTagColor(id, tagColor);
  resFun(res, 'Success update tag color', tagColor);
});

/**
 *  @path: [DEL] api/tag-colors/:id
 *  @desc: Delete a tag color
 *  @auth: ADMIN, SUPER_ADMIN only
 *  @note: Should be rarely used because of the dependencies with tag
 */
router.delete('/:id', async (req, res, next) => {
  // TODO: What happen to tag that uses this color? Fall back option?
  const id = req.params.id;
  if (!isObjectId(id)) {
    throw new ErrorResponse('invalid params', 400);
  }

  const tagColor = await tagColorService.deleteTagColor(id);
  resFun(res, 'Success delete tag color', tagColor);
});

module.exports = router;
