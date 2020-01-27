const { Status, statusValidator } = require('../db/status.schema');
const { ErrorResponse } = require('../utils/error-response.class');

module.exports.getStatuses = () => Status.find();

module.exports.createStatus = (status) => {
  const result = statusValidator.validate(status);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return new Status(status).save();
};

module.exports.updateStatus = (id, status) => {
  const result = statusValidator.validate(status);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return Status.findByIdAndUpdate(id, status, { new: true, runValidators: true })
    .orFail(new ErrorResponse('failed to update, no result found with the associated id', 404));
};

module.exports.deleteStatus = (id) => Status.findByIdAndDelete(id)
  .orFail(new ErrorResponse('failed to delete, no result found with the associated id', 404));
