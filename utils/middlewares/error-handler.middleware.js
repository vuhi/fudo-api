module.exports = async (err, req, res, next) => {
  let { message, statusCode, originalError } = err;
  if (err.name === 'MongoError' && err.code === 11000) {
    message = `${Object.getOwnPropertyNames(err.keyValue)[0]} has been used, please provide different value`;
    statusCode = 400;
    originalError = err;
  }

  res.status(statusCode || 500);
  res.json({
    status: 'error thrown!',
    message: message,
    data: process.env.NODE_ENV === 'production' ? null : originalError
  });
  next();
};
