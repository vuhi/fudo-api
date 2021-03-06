const { User, userValidator } = require('../db/user.schema');
const { ErrorResponse } = require('../utils/error-response.class');

module.exports.getUsers = () => User.find()
  .populate({ path: 'role', select: '_id name' })
  .populate({ path: 'status', select: '_id name' });

module.exports.getUser = (id) => User.findById(id)
  .orFail(new ErrorResponse('no user found with the associated id', 404))
  .populate({ path: 'role', select: '_id name' })
  .populate({ path: 'status', select: '_id name' });

module.exports.createUser = (user) => {
  const result = userValidator.validate(user);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return new User(user).save();
};

module.exports.updateUser = (id, user) => {
  const result = userValidator.validate(user);
  if (result.error) {
    throw new ErrorResponse(result.error.details[0].message, 400, result.error);
  }
  return User.findByIdAndUpdate(id, user, { new: true, runValidators: true })
    .orFail(new ErrorResponse('failed to update, no result found with the associated id', 404));
};

module.exports.deleteUser = (id) => User.findByIdAndDelete(id)
  .orFail(new ErrorResponse('failed to delete, no result found with the associated id', 404));
