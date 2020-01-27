const { Role, roleValidator } = require('../db/role.schema');
const { ErrorResponse } = require('../utils/error-response.class');

module.exports.getRoles = () => Role.find();

module.exports.createRole = (role) => {
  const result = roleValidator.validate(role);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return new Role(role).save();
};

module.exports.updateRole = (id, role) => {
  const result = roleValidator.validate(role);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return Role.findByIdAndUpdate(id, role, { new: true, runValidators: true })
    .orFail(new ErrorResponse('failed to update, no result found with the associated id', 404));
};

module.exports.deleteRole = (id) => Role.findByIdAndDelete(id)
  .orFail(new ErrorResponse('failed to delete, no result found with the associated id', 404));
