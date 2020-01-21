const { TagColor, tagColorValidator } = require('../db/tag.schema');
const { ErrorResponse } = require('../utils/error-response.class');

module.exports.getTagColors = () => TagColor.find();

module.exports.createTagColor = (tagColor) => {
  const result = tagColorValidator.validate(tagColor);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0], 400);
  }
  return new TagColor(tagColor).save();
};
