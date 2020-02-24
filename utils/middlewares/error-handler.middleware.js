const MONGO_ERROR = 'MongoError';
const MONGO_VALIDATION_ERROR = 'ValidationError';
const ERROR_RESPONSE = 'ErrorResponse';

module.exports = async (err, req, res, next) => {
  // eslint-disable-next-line prefer-const
  let { name, message, statusCode, originalError } = err;

  switch (true) {
    case name === MONGO_ERROR && err.code === 11000:
      statusCode = 400;
      message = `${Object.getOwnPropertyNames(err.keyValue)[0]} has been used, please provide different value`;
      originalError = err;
      break;
    case name === MONGO_VALIDATION_ERROR:
      statusCode = 400
      message = err.message
      originalError = err
      break;
    case name === ERROR_RESPONSE:
      break;
    default:
      statusCode = 500
      message = err.message;
      originalError = err;
  }

  res.status(statusCode);
  res.json({
    status: 'failed',
    message: message,
    data: process.env.NODE_ENV === 'production' ? null : originalError
  });
  next();
};
