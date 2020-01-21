class ErrorResponse extends Error {
  constructor(message, statusCode, originalError = null) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

module.exports = { ErrorResponse };
