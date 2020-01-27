const { TagColor, tagColorValidator } = require('../db/tag.schema');
const { ErrorResponse } = require('../utils/error-response.class');

module.exports.getTagColors = () => TagColor.find();

module.exports.createTagColor = (tagColor) => {
  const result = tagColorValidator.validate(tagColor);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return new TagColor(tagColor).save();
};

module.exports.updateTagColor = (id, tagColor) => {
  const result = tagColorValidator.validate(tagColor);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return TagColor.findByIdAndUpdate(id, tagColor, { new: true, runValidators: true })
    .orFail(new ErrorResponse('failed to update, no result found with the associated id', 404));
};

module.exports.deleteTagColor = (id) => TagColor.findByIdAndDelete(id)
  .orFail(new ErrorResponse('failed to delete, no result found with the associated id', 404));
