class ErrorResponse extends Error {
  constructor(message, statusCode = 500, originalError = null) {
    super(message);
    this.name = 'ErrorResponse';
    this.statusCode = statusCode;
    this.originalError = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ErrorResponse };
