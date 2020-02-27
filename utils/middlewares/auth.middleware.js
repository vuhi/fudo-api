const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, PUBLIC_KEY, TOKEN_AGO, TOKEN_EXPIRE, AUDIENCE, ISSUER } = require('../config')
const { ErrorResponse } = require('../../utils/error-response.class');
const { isObjectNullOrEmpty } = require('../helpers.func');

const auth = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) { next(new ErrorResponse('missing header', 401)); }

  const content = header.split(' ');
  if (content.length !== 2 || !content[0].toLowerCase().startsWith('bearer')) {
    next(new ErrorResponse('malformed token', 401));
  }

  // TODO: Verify Token, Set User to req object
  next();
}

const sign = (payload, opts) => {
  if (!payload || !opts || isObjectNullOrEmpty(payload) || isObjectNullOrEmpty(opts)) {
    return new ErrorResponse('cannot sign token: invalid arguments', 401);
  }
  const signOptions = {
    issuer: ISSUER,
    subject: opts.email,
    audience: opts.identifier,
    expiresIn: TOKEN_EXPIRE,
    algorithm: TOKEN_AGO
  };
  return jwt.sign(payload, PRIVATE_KEY, signOptions);
};

const verify = (token, opts) => {
  const verifyOptions = {
    issuer: ISSUER,
    subject: opts.email,
    audience: opts.identifier,
    expiresIn: TOKEN_EXPIRE,
    algorithm: TOKEN_AGO
  };
  try {
    // Query User ?
    return jwt.verify(token, PUBLIC_KEY, verifyOptions);
  } catch (err) {
    return new ErrorResponse('fail to verify token', 401, err);
  }
}

module.exports = { auth, sign, verify }
